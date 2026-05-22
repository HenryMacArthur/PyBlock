// Connect to the hub.

// This file was AI generated. I do not have the skill to make this myself.

// ============================================
// Hub Connection — Web Bluetooth to Pybricks
// ============================================

// These are Pybricks' official Bluetooth identifiers
// Don't change these — they're how we find the hub
const PYBRICKS_SERVICE_UUID        = 'c5f50001-8280-46da-89f4-6d8051e4aeef';
const PYBRICKS_CONTROL_CHAR_UUID   = 'c5f50002-8280-46da-89f4-6d8051e4aeef';

let hubDevice = null;
let hubChar   = null;

// --- CONNECT TO HUB ---
async function connectToHub() {
  try {
    // This pops up the browser's Bluetooth device picker
    hubDevice = await navigator.bluetooth.requestDevice({
      filters: [{ services: [PYBRICKS_SERVICE_UUID] }],
      optionalServices: [PYBRICKS_SERVICE_UUID]
    });

    const server  = await hubDevice.gatt.connect();
    const service = await server.getPrimaryService(PYBRICKS_SERVICE_UUID);
    hubChar       = await service.getCharacteristic(PYBRICKS_CONTROL_CHAR_UUID);

    console.log('Connected to hub!');
    return true;

  } catch (err) {
    console.error('Connection failed:', err);
    alert('Could not connect to hub. Make sure it is on and running Pybricks.');
    return false;
  }
}

// --- SEND CODE TO HUB ---
async function sendCodeToHub(pythonCode) {
  // Connect first if we aren't already
  if (!hubChar) {
    const connected = await connectToHub();
    if (!connected) return;
  }

  try {
    // Pybricks expects the code as raw bytes
    const encoder = new TextEncoder();
    const data    = encoder.encode(pythonCode);

    // Pybricks has a max chunk size of 20 bytes
    // so we send the code in small pieces
    const chunkSize = 20;
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      await hubChar.writeValueWithoutResponse(chunk);
    }

    console.log('Code sent!');
    alert('Code sent to hub!');

  } catch (err) {
    console.error('Failed to send code:', err);
    alert('Failed to send code. Try reconnecting.');
    hubChar = null; // Reset so next click tries to reconnect
  }
}