import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python';
// These tell Blockly how the Blocks work
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
    "tooltip": "Prints a message (useless without a terminal — maybe we'll add one later!)"
  }
]);



// These generate Python
//const pythonGenerator = pythonGenerator;
// The line above was causing errors. Try uncommenting it stuff's not working and you don't know why
pythonGenerator.forBlock['spike_motor_run'] = function(block) {
  const port = block.getFieldValue('PORT');
  const speed = block.getFieldValue('SPEED');
  const varName = `motor_${port.slice(-1).toLowerCase()}`;
  return `${varName} = Motor(${port})\n${varName}.run(${speed})\n`;
};

pythonGenerator.forBlock['spike_wait'] = function(block) {
  const seconds = block.getFieldValue('SECONDS');
  return `wait(${seconds * 1000})\n`;
};

pythonGenerator.forBlock['spike_print'] = function(block) {
  const message = block.getFieldValue('MESSAGE');
  return `print("${message}")\n`;
};


// These import initialization stuff that lets the PyBrick stuff do it's job
const originalInit = pythonGenerator.init.bind(pythonGenerator);
pythonGenerator.init = function(workspace) {
  originalInit(workspace);
  pythonGenerator.definitions_['import_motor']   = 'from pybricks.pupdevices import Motor';
  pythonGenerator.definitions_['import_port']    = 'from pybricks.parameters import Port, Direction';
  pythonGenerator.definitions_['import_tools']   = 'from pybricks.tools import wait';
  pythonGenerator.definitions_['import_program'] = 'from pybricks import version';
};