// Gathers up all the categories in blocks/
// If you add a new category, make sure you add it here


import * as Blockly from 'blockly/core';

import { blockDefs as logicDefs  } from './logic.js';
import { blockDefs as loopsDefs  } from './loops.js';
import { blockDefs as mathDefs   } from './math.js';
import { blockDefs as spikeDefs  } from './spike.js';

Blockly.defineBlocksWithJsonArray([
    ...logicDefs,
    ...loopsDefs,
    ...mathDefs,
    ...spikeDefs,
]);