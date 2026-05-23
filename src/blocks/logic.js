// blocks/logic.js
import * as Blockly from 'blockly/core';
Blockly.defineBlocksWithJsonArray([
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
                    ["=", "EQ"],
                    ["≠", "NEQ"],
                    ["<", "LT"],
                    ["≤", "LTE"],
                    [">", "GT"],
                    ["≥", "GTE"],
                ]
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
                options: [
                    ["and", "AND"],
                    ["or", "OR"],
                ]
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
            options: [
                ["true", "TRUE"],
                ["false", "FALSE"],
            ]
        }],
        output: "Boolean",
        colour: 210,
        tooltip: "A true or false value.",
    },
]);