import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python';
import { compile } from '@pybricks/mpy-cross-v6';

window.Blockly = Blockly;
window.pythonGenerator = pythonGenerator;
window.mpyCrossCompile = compile;

import './blocks.js';
import { connectToHub, sendCodeToHub } from './connect.js';
window.connectToHub = connectToHub;
window.sendCodeToHub = sendCodeToHub;