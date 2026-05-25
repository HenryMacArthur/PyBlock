// toolbox.js
// Assembles the sidebar toolbox from each block category's own definition.
// To add a new category: create blocks/yourcategory.js, then add one
// import + one entry here.

import { toolboxCategory as logicCategory  } from './blocks/logic.js';
import { toolboxCategory as loopsCategory  } from './blocks/loops.js';
import { toolboxCategory as mathCategory   } from './blocks/math.js';
import { toolboxCategory as spikeCategory  } from './blocks/spike.js';

export const toolbox = {
    kind: 'categoryToolbox',
    contents: [
        logicCategory,
        loopsCategory,
        mathCategory,
        spikeCategory,
    ],
};