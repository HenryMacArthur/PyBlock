// blocks/math.js
// ─────────────────────────────────────────────────────────────────────────────
// ONE place for everything about Math blocks:
//   • blockDefs         – Blockly JSON shapes  (consumed by blocks/index.js)
//   • registerGenerators – registers PyBricks code gen (called by generator.js)
//   • toolboxCategory   – sidebar entries      (consumed by toolbox.js)
// ─────────────────────────────────────────────────────────────────────────────

// Block definitions

export const blockDefs = [
    {
        type: 'math_number',
        message0: '%1',
        args0: [{ type: 'field_number', name: 'NUM', value: 0 }],
        output: 'Number',
        colour: 230,
        tooltip: 'A number.',
    },
    {
        type: 'math_arithmetic',
        message0: '%1 %2 %3',
        args0: [
            { type: 'input_value', name: 'A', check: 'Number' },
            {
                type: 'field_dropdown',
                name: 'OP',
                options: [
                    ['+', 'ADD'], ['−', 'MINUS'],
                    ['×', 'MULTIPLY'], ['÷', 'DIVIDE'],
                    ['^', 'POWER'],
                ],
            },
            { type: 'input_value', name: 'B', check: 'Number' },
        ],
        output: 'Number',
        colour: 230,
        tooltip: 'Basic arithmetic: add, subtract, multiply, divide, or power.',
    },
];

// Generates Python

export function registerGenerators(gen, Order) {
    gen.forBlock['math_number'] = function (block) {
        const num = parseFloat(block.getFieldValue('NUM'));
        return [String(num), Order.ATOMIC];
    };

    gen.forBlock['math_arithmetic'] = function (block) {
        const OPERATORS = {
            ADD:      ['+',  Order.ADDITIVE],
            MINUS:    ['-',  Order.ADDITIVE],
            MULTIPLY: ['*',  Order.MULTIPLICATIVE],
            DIVIDE:   ['/',  Order.MULTIPLICATIVE],
            POWER:    ['**', Order.EXPONENTIATION],
        };
        const [op, order] = OPERATORS[block.getFieldValue('OP')];
        const a = gen.valueToCode(block, 'A', order) || '0';
        const b = gen.valueToCode(block, 'B', order) || '0';
        return [`${a} ${op} ${b}`, order];
    };
}

// Toolbox stuff
export const toolboxCategory = {
    kind: 'category',
    name: 'Math',
    colour: 230,
    contents: [
        { kind: 'block', type: 'math_number' },
        { kind: 'block', type: 'math_arithmetic' },
    ],
};