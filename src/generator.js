// Creates the PyBricks generator and registers all block generators.
// Be very, VERY careful of circular importing! 
// Do NOT import this in the block category files!
// It will cause errors!

// Usage in main.js:
//   import { pybricksGenerator } from './generator.js';
//   const code = pybricksGenerator.workspaceToCode(workspace);

import { PythonGenerator, Order } from 'blockly/python';

import { registerGenerators as registerLogic  } from './blocks/logic.js';
import { registerGenerators as registerLoops  } from './blocks/loops.js';
import { registerGenerators as registerMath   } from './blocks/math.js';
import { registerGenerators as registerSpike  } from './blocks/spike.js';

export const pybricksGenerator = new PythonGenerator();

// Basic PyBricks imports.
// They go at the top of every file.
pybricksGenerator.definitions_['pybricks_common'] = `\
from pybricks.hubs import PrimeHub
from pybricks.tools import wait, StopWatch
from pybricks.parameters import Button, Color, Direction, Port, Side, Stop
`;

// Register all block generators (Order is passed in so block files stay import-free).
registerLogic(pybricksGenerator, Order);
registerLoops(pybricksGenerator, Order);
registerMath(pybricksGenerator, Order);
registerSpike(pybricksGenerator, Order);

// How to make more PyBricks blockss.
// 1. Create blocks/yourcategory.js with blockDefs, registerGenerators,
//    and toolboxCategory, following the same pattern as the files above.
// 2. Add one import + one call here (registerYours).
// 3. Add one import + one spread in blocks/index.js (blockDefs).
// 4. Add one import + one entry in toolbox.js (toolboxCategory).