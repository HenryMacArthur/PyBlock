// ============================================
// Hub Connection — Web Bluetooth to Pybricks
// ============================================

// Official Pybricks BLE UUIDs
const PYBRICKS_SERVICE_UUID       = 'c5f50001-8280-46da-89f4-6d8051e4aeef';
const PYBRICKS_COMMAND_EVENT_UUID = 'c5f50002-8280-46da-89f4-6d8051e4aeef';

// Official Pybricks command bytes (from pybricks protocol docs)
const CMD_STOP_USER_PROGRAM       = 0x00;
const CMD_START_USER_PROGRAM      = 0x01;
const CMD_WRITE_USER_PROGRAM_META = 0x03;
const CMD_WRITE_USER_RAM          = 0x04;

let hubDevice = null;
let hubChar   = null;
let maxCharSize = 20; // default, updated after connect

// --- CONNECT ---
async function connectToHub() {
  try {
    hubDevice = await navigator.bluetooth.requestDevice({
      filters: [{ services: [PYBRICKS_SERVICE_UUID] }],
      optionalServices: [PYBRICKS_SERVICE_UUID]
    });

    const server  = await hubDevice.gatt.connect();
    const service = await server.getPrimaryService(PYBRICKS_SERVICE_UUID);
    hubChar       = await service.getCharacteristic(PYBRICKS_COMMAND_EVENT_UUID);

    updateStatus('Connected to hub!', 'green');
    console.log('Connected!');
    return true;

  } catch (err) {
    updateStatus('Connection failed', 'red');
    console.error('Connection failed:', err);
    return false;
  }
}

// --- SEND AND RUN ---
async function sendCodeToHub(pythonCode) {
  // Connect first if not already connected
  if (!hubChar) {
    const connected = await connectToHub();
    if (!connected) return;
  }

  try {
    updateStatus('Sending...', 'orange');

    updateStatus('Compiling...', 'orange');
const wasmUrl = window.location.origin + '/mpy-cross-v6.wasm';
const data = await window.mpyCrossCompile(
  'program.py',
  pythonCode,
  undefined,
  'wasmURL'  // served from public folder by Vite
);
const size = data.length;

    // Step 1: Send metadata — tells hub how big the program is
    // Format: [0x03, size as 4 bytes little-endian]
    const meta = new Uint8Array(5);
    meta[0] = CMD_WRITE_USER_PROGRAM_META;
    meta[1] = (size)       & 0xFF;
    meta[2] = (size >> 8)  & 0xFF;
    meta[3] = (size >> 16) & 0xFF;
    meta[4] = (size >> 24) & 0xFF;
    await hubChar.writeValueWithoutResponse(meta);
    await sleep(100);

    // Step 2: Send program data in chunks
    // Format: [0x04, offset as 4 bytes little-endian, ...data bytes]
    const chunkSize = maxCharSize - 5; // 5 bytes used by header
    for (let offset = 0; offset < size; offset += chunkSize) {
      const chunk   = data.slice(offset, offset + chunkSize);
      const payload = new Uint8Array(5 + chunk.length);
      payload[0] = CMD_WRITE_USER_RAM;
      payload[1] = (offset)       & 0xFF;
      payload[2] = (offset >> 8)  & 0xFF;
      payload[3] = (offset >> 16) & 0xFF;
      payload[4] = (offset >> 24) & 0xFF;
      payload.set(chunk, 5);
      await hubChar.writeValueWithoutResponse(payload);
      await sleep(20);
    }

    // Step 3: Tell hub to run the program
    await hubChar.writeValueWithoutResponse(new Uint8Array([CMD_START_USER_PROGRAM]));

    updateStatus('Running!', 'green');
    console.log('Program sent and started!');

  } catch (err) {
    updateStatus('Failed to send', 'red');
    console.error('Send failed:', err);
    hubChar = null; // Reset so next attempt reconnects
  }
}

// --- HELPERS ---
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Updates a status indicator in the toolbar
// We'll add this element to index.html next
function updateStatus(message, color) {
  const el = document.getElementById('hubStatus');
  if (el) {
    el.textContent = message;
    el.style.color = color;
  }
}

export { connectToHub, sendCodeToHub, updateStatus };