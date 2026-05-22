// This file defines how the blocks work/what Python code they translate to.
//To add new blocks, define their logic here and make them show up in the right place in the HTML file.
Blockly.defineBlocksWithJsonArray([
  {
    "type": "spike_motor_run",
    "message0": "Run motor on %1 at speed %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PORT",
        "options": [
          ["Port A", "Port.A"],
          ["Port B", "Port.B"],
          ["Port C", "Port.C"],
          ["Port D", "Port.D"],
          ["Port E", "Port.E"],
          ["Port F", "Port.F"]
        ]
      },
      {
        "type": "field_number",
        "name": "SPEED",
        "value": 500,
        "min": -1000,
        "max": 1000
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 30,
    "tooltip": "Runs a motor at a given speed"
  },

  {
    "type": "spike_wait",
    "message0": "Wait %1 seconds",
    "args0": [
      {
        "type": "field_number",
        "name": "SECONDS",
        "value": 1,
        "min": 0
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": "Pauses the program for a number of seconds"
  },

  {
    "type": "spike_print",
    "message0": "Print %1",
    "args0": [
      {
        "type": "field_input",
        "name": "MESSAGE",
        "text": "Hello!"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "Prints a message (useful for debugging, useless without a terminal.)"
    // Maybe we'll add a terminal later?
  }

]);


// All of this stuff below translates the block code to Python. Maybe we should make this a separate file later.
Blockly.Python['spike_motor_run'] = function(block) {
  const port = block.getFieldValue('PORT');
  const speed = block.getFieldValue('SPEED');
  return `motor_${port.slice(-1).toLowerCase()} = Motor(${port})\nmotor_${port.slice(-1).toLowerCase()}.run(${speed})\n`;
};

Blockly.Python['spike_wait'] = function(block) {
  const seconds = block.getFieldValue('SECONDS');
  return `wait(${seconds * 1000})\n`;
};

Blockly.Python['spike_print'] = function(block) {
  const message = block.getFieldValue('MESSAGE');
  return `print("${message}")\n`;
};