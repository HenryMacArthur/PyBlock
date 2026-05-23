// Logic stuff

// Block definitions
export const blockDefs = [
    {
        type: "controls_if",
        message0: "if %1",
        args0: [{ type: "input_value", name: "IF0", check: "Boolean" }],
        message1: "do %1",
        args1: [{ type: "input_statement", name: "DO0" }],
        previousStatement: null,
        nextStatement: null,
        colour: 210,
        tooltip: "If a condition is true, run some blocks.",
    },
    {
        type: "logic_compare",
        message0: "%1 %2 %3",
        args0: [
            { type: "input_value", name: "A" },
            {
                type: "field_dropdown",
                name: "OP",
                options: [
                    ["=", "EQ"], ["≠", "NEQ"],
                    ["<", "LT"], ["≤", "LTE"],
                    [">", "GT"], ["≥", "GTE"],
                ],
            },
            { type: "input_value", name: "B" },
        ],
        output: "Boolean",
        colour: 210,
        tooltip: "Compare two values.",
    },
    {
        type: "logic_operation",
        message0: "%1 %2 %3",
        args0: [
            { type: "input_value", name: "A", check: "Boolean" },
            {
                type: "field_dropdown",
                name: "OP",
                options: [["and", "AND"], ["or", "OR"]],
            },
            { type: "input_value", name: "B", check: "Boolean" },
        ],
        output: "Boolean",
        colour: 210,
        tooltip: "Combine two boolean values.",
    },
    {
        type: "logic_negate",
        message0: "not %1",
        args0: [{ type: "input_value", name: "BOOL", check: "Boolean" }],
        output: "Boolean",
        colour: 210,
        tooltip: "Returns the opposite of a boolean.",
    },
    {
        type: "logic_boolean",
        message0: "%1",
        args0: [{
            type: "field_dropdown",
            name: "BOOL",
            options: [["true", "TRUE"], ["false", "FALSE"]],
        }],
        output: "Boolean",
        colour: 210,
        tooltip: "A true or false value.",
    },
];

// Generates Python
export function registerGenerators(gen, Order) {
    gen.forBlock['controls_if'] = function (block) {
        let code = '';
        let conditionCode = gen.valueToCode(block, 'IF0', Order.NONE) || 'False';
        let branchCode = gen.statementToCode(block, 'DO0') || gen.PASS;
        code += `if ${conditionCode}:\n${branchCode}`;

        for (let i = 1; block.getInput('IF' + i); i++) {
            const extraCond = gen.valueToCode(block, 'IF' + i, Order.NONE) || 'False';
            const extraBranch = gen.statementToCode(block, 'DO' + i) || gen.PASS;
            code += `elif ${extraCond}:\n${extraBranch}`;
        }

        if (block.getInput('ELSE')) {
            const elseBranch = gen.statementToCode(block, 'ELSE') || gen.PASS;
            code += `else:\n${elseBranch}`;
        }
        return code;
    };

    gen.forBlock['logic_compare'] = function (block) {
        const OPERATORS = { EQ: '==', NEQ: '!=', LT: '<', LTE: '<=', GT: '>', GTE: '>=' };
        const op = OPERATORS[block.getFieldValue('OP')];
        const a = gen.valueToCode(block, 'A', Order.RELATIONAL) || '0';
        const b = gen.valueToCode(block, 'B', Order.RELATIONAL) || '0';
        return [`${a} ${op} ${b}`, Order.RELATIONAL];
    };

    gen.forBlock['logic_operation'] = function (block) {
        const op = block.getFieldValue('OP') === 'AND' ? 'and' : 'or';
        const order = op === 'and' ? Order.LOGICAL_AND : Order.LOGICAL_OR;
        const a = gen.valueToCode(block, 'A', order) || 'False';
        const b = gen.valueToCode(block, 'B', order) || 'False';
        return [`${a} ${op} ${b}`, order];
    };

    gen.forBlock['logic_negate'] = function (block) {
        const value = gen.valueToCode(block, 'BOOL', Order.LOGICAL_NOT) || 'False';
        return [`not ${value}`, Order.LOGICAL_NOT];
    };

    gen.forBlock['logic_boolean'] = function (block) {
        return [block.getFieldValue('BOOL') === 'TRUE' ? 'True' : 'False', Order.ATOMIC];
    };
}

// Toolbox stuff
export const toolboxCategory = {
    kind: 'category',
    name: 'Logic',
    colour: 210,
    contents: [
        { kind: 'block', type: 'controls_if' },
        { kind: 'block', type: 'logic_compare' },
        { kind: 'block', type: 'logic_operation' },
        { kind: 'block', type: 'logic_negate' },
        { kind: 'block', type: 'logic_boolean' },
    ],
};