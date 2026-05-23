// blocks/loops.js
// ─────────────────────────────────────────────────────────────────────────────
// ONE place for everything about Loops blocks:
//   • blockDefs         – Blockly JSON shapes  (consumed by blocks/index.js)
//   • registerGenerators – registers PyBricks code gen (called by generator.js)
//   • toolboxCategory   – sidebar entries      (consumed by toolbox.js)
// ─────────────────────────────────────────────────────────────────────────────

// Block definitions

export const blockDefs = [
    {
        type: 'controls_repeat_ext',
        message0: 'repeat %1 times',
        args0: [{ type: 'input_value', name: 'TIMES', check: 'Number' }],
        message1: 'do %1',
        args1: [{ type: 'input_statement', name: 'DO' }],
        previousStatement: null,
        nextStatement: null,
        colour: 120,
        tooltip: 'Repeat the enclosed blocks a number of times.',
    },
    {
        type: 'controls_whileUntil',
        message0: 'repeat %1',
        args0: [{
            type: 'field_dropdown',
            name: 'MODE',
            options: [['while', 'WHILE'], ['until', 'UNTIL']],
        }],
        message1: '%1',
        args1: [{ type: 'input_value', name: 'BOOL', check: 'Boolean' }],
        message2: 'do %1',
        args2: [{ type: 'input_statement', name: 'DO' }],
        previousStatement: null,
        nextStatement: null,
        colour: 120,
        tooltip: 'Repeat while (or until) a condition is true.',
    },
];

// Generates Python

export function registerGenerators(gen, Order) {
    gen.forBlock['controls_repeat_ext'] = function (block) {
        const times = gen.valueToCode(block, 'TIMES', Order.NONE) || '0';
        const body = gen.statementToCode(block, 'DO') || gen.PASS;
        return `for _ in range(${times}):\n${body}`;
    };

    gen.forBlock['controls_whileUntil'] = function (block) {
        const isUntil = block.getFieldValue('MODE') === 'UNTIL';
        let condition = gen.valueToCode(block, 'BOOL', Order.NONE) || 'False';
        if (isUntil) condition = `not (${condition})`;
        const body = gen.statementToCode(block, 'DO') || gen.PASS;
        return `while ${condition}:\n${body}`;
    };
}

// Toolbox stuff
export const toolboxCategory = {
    kind: 'category',
    name: 'Loops',
    colour: 120,
    contents: [
        { kind: 'block', type: 'controls_repeat_ext' },
        { kind: 'block', type: 'controls_whileUntil' },
    ],
};