// main.js
import * as Blockly from 'blockly/core';
//import 'blockly/blocks';
// That last line may have been causing some annoying useless warnings. Uncomment it if the blocks break or something.
import 'blockly/msg/en';
import { registerContinuousToolbox } from '@blockly/continuous-toolbox';
//Continuous toolbox makes the toolbox work like the one in Scratch/SPIKE


// that provides the words for the blocks. This one is for English. Without it, we would get blank blocks.
import './blocks/index.js';
// Index.js is what gathers all the block categories and sends them to this
import { toolbox } from './toolbox.js';
// Toolbox is what the sidebar with the blocks will look like.
import { pybricksGenerator } from './generator.js';


// You have to register Blockly plugins before you inject them
registerContinuousToolbox();

const workspace = Blockly.inject(document.querySelector('.blocklyDiv'), {
    toolbox,

    plugins: {
        toolbox: 'ContinuousToolbox',
        flyoutsVerticalToolbox: 'ContinuousFlyout',
        metricsManager: 'ContinuousMetrics',
    },
    grid: {
        spacing: 20,
        length: 0.5,
        colour: '#ccc',
        snap: true,
    },
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
    },
    trashcan: false,
    /* The trashcan looks kinda ugly*/
    theme: Blockly.Themes.Classic,
    renderer: 'zelos',
    recyclingEnabled: false



        
});


document.querySelector('.blocklyToolboxDiv')?.addEventListener('wheel', (e) => {
    e.stopPropagation();
}, { passive: false });


window.addEventListener('resize', () => {
    Blockly.svgResize(workspace);
});



document.getElementById('generateBtn').addEventListener('click', () => {
    const code = pybricksGenerator.workspaceToCode(workspace);
    const tab = window.open('', '_blank');
    tab.document.open();
    tab.document.write(`<pre>${code}</pre>`);
    tab.document.close();
});
// Currently that just gives you a blank tab if there's no code in the workspace,
// So we should probably make it do something, like give you Python that looks like # No code yet
// Or give you an alert


workspace.addChangeListener((event) => {
    if (event.type === Blockly.Events.VIEWPORT_CHANGE) {
        const flyout = workspace.getFlyout();
        if (flyout) {
            const flyoutWorkspace = flyout.getWorkspace();
            flyoutWorkspace.setScale(1); // lock flyout zoom to 1x always
        }
    }
});