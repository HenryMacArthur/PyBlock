// This file was created by AI. I have no idea how to do this.

// pybricks_generator.js
//
// Registers PyBricks Python code generators for every block type
// currently in the project (Logic, Loops, Math).

// So basically it takes block code and turns it into robot code

//
// Usage — import this file once in main.js, AFTER the Blockly workspace
// is set up, then call:
//
//   import { pybricksGenerator } from './pybricks_generator.js';
//   const code = pybricksGenerator.workspaceToCode(workspace);
//
// The generated string is valid MicroPython ready to run on a
// LEGO hub with the PyBricks firmware.

import * as Blockly from 'blockly/core';
import { PythonGenerator, Order } from 'blockly/python';

// ---------------------------------------------------------------------------
// Create a fresh generator instance so we don't pollute the built-in one.
// We still inherit all of Blockly's built-in Python generators, which means
// standard blocks like math_number work out of the box.
// ---------------------------------------------------------------------------
export const pybricksGenerator = new PythonGenerator();

// ---------------------------------------------------------------------------
// PyBricks imports
// Anything stored in `definitions_` is hoisted to the very top of the file
// by workspaceToCode().  We add the core imports here; individual block
// generators can add more with the same mechanism.
// ---------------------------------------------------------------------------
pybricksGenerator.definitions_['pybricks_common'] = `\
from pybricks.hubs import PrimeHub
from pybricks.tools import wait, StopWatch
from pybricks.parameters import Button, Color, Direction, Port, Side, Stop
`;


// ===========================================================================
// LOGIC
// ===========================================================================

// if … do …
pybricksGenerator.forBlock['controls_if'] = function (block) {
    let code = '';
    let conditionCode =
        pybricksGenerator.valueToCode(block, 'IF0', Order.NONE) || 'False';
    let branchCode =
        pybricksGenerator.statementToCode(block, 'DO0') || pybricksGenerator.PASS;

    code += `if ${conditionCode}:\n${branchCode}`;

    // Support optional ELSE / ELSEIF mutator extensions added by Blockly
    for (let i = 1; block.getInput('IF' + i); i++) {
        const extraCond =
            pybricksGenerator.valueToCode(block, 'IF' + i, Order.NONE) || 'False';
        const extraBranch =
            pybricksGenerator.statementToCode(block, 'DO' + i) || pybricksGenerator.PASS;
        code += `elif ${extraCond}:\n${extraBranch}`;
    }

    if (block.getInput('ELSE')) {
        const elseBranch =
            pybricksGenerator.statementToCode(block, 'ELSE') || pybricksGenerator.PASS;
        code += `else:\n${elseBranch}`;
    }

    return code;
};

// A = B, A < B, etc.
pybricksGenerator.forBlock['logic_compare'] = function (block) {
    const OPERATORS = {
        EQ:  '==',
        NEQ: '!=',
        LT:  '<',
        LTE: '<=',
        GT:  '>',
        GTE: '>=',
    };
    const op = OPERATORS[block.getFieldValue('OP')];
    const a = pybricksGenerator.valueToCode(block, 'A', Order.RELATIONAL) || '0';
    const b = pybricksGenerator.valueToCode(block, 'B', Order.RELATIONAL) || '0';
    return [`${a} ${op} ${b}`, Order.RELATIONAL];
};

// A and/or B
pybricksGenerator.forBlock['logic_operation'] = function (block) {
    const op = block.getFieldValue('OP') === 'AND' ? 'and' : 'or';
    const order = op === 'and' ? Order.LOGICAL_AND : Order.LOGICAL_OR;
    const a = pybricksGenerator.valueToCode(block, 'A', order) || 'False';
    const b = pybricksGenerator.valueToCode(block, 'B', order) || 'False';
    return [`${a} ${op} ${b}`, order];
};

// not X
pybricksGenerator.forBlock['logic_negate'] = function (block) {
    const value =
        pybricksGenerator.valueToCode(block, 'BOOL', Order.LOGICAL_NOT) || 'False';
    return [`not ${value}`, Order.LOGICAL_NOT];
};

// true / false literal
pybricksGenerator.forBlock['logic_boolean'] = function (block) {
    return [block.getFieldValue('BOOL') === 'TRUE' ? 'True' : 'False', Order.ATOMIC];
};


// ===========================================================================
// LOOPS
// ===========================================================================

// repeat N times  (controls_repeat_ext uses a value input for the count)
pybricksGenerator.forBlock['controls_repeat_ext'] = function (block) {
    const times =
        pybricksGenerator.valueToCode(block, 'TIMES', Order.NONE) || '0';
    const body =
        pybricksGenerator.statementToCode(block, 'DO') || pybricksGenerator.PASS;
    return `for _ in range(${times}):\n${body}`;
};

// repeat while/until
pybricksGenerator.forBlock['controls_whileUntil'] = function (block) {
    const isUntil = block.getFieldValue('MODE') === 'UNTIL';
    let condition =
        pybricksGenerator.valueToCode(block, 'BOOL', Order.NONE) || 'False';
    if (isUntil) condition = `not (${condition})`;
    const body =
        pybricksGenerator.statementToCode(block, 'DO') || pybricksGenerator.PASS;
    return `while ${condition}:\n${body}`;
};


// ===========================================================================
// MATH
// ===========================================================================

// numeric literal
pybricksGenerator.forBlock['math_number'] = function (block) {
    const num = parseFloat(block.getFieldValue('NUM'));
    return [String(num), Order.ATOMIC];
};

// arithmetic: + - * / **
pybricksGenerator.forBlock['math_arithmetic'] = function (block) {
    const OPERATORS = {
        ADD:      ['+',  Order.ADDITIVE],
        MINUS:    ['-',  Order.ADDITIVE],
        MULTIPLY: ['*',  Order.MULTIPLICATIVE],
        DIVIDE:   ['/',  Order.MULTIPLICATIVE],
        POWER:    ['**', Order.EXPONENTIATION],
    };
    const [op, order] = OPERATORS[block.getFieldValue('OP')];
    const a = pybricksGenerator.valueToCode(block, 'A', order) || '0';
    const b = pybricksGenerator.valueToCode(block, 'B', order) || '0';
    return [`${a} ${op} ${b}`, order];
};


// ===========================================================================
// HOW TO ADD MORE PYBRICKS BLOCKS
// ===========================================================================
//
// Please don't delete this section, it's very important
//
// 1.  Define the block shape in the relevant file under blocks/.
//     So if you have a math block, define the shape in blocks/math.js

// 2.  Add a generator here following the same pattern:
//
//     pybricksGenerator.forBlock['your_block_type'] = function (block) {
//         // For statement blocks (no output): return a string ending in \n
//         // For value blocks (have output):   return [codeString, Order.XXX]
//     };
//
// 3.  If the block needs an import, add it to definitions_:
//
//     pybricksGenerator.definitions_['import_motor'] =
//         'from pybricks.pupdevices import Motor';
//
// Example — drive a motor:
//
//     pybricksGenerator.forBlock['pybricks_motor_run'] = function (block) {
//         pybricksGenerator.definitions_['import_motor'] =
//             'from pybricks.pupdevices import Motor';
//         const port  = block.getFieldValue('PORT');   // e.g. 'Port.A'
//         const speed = block.getFieldValue('SPEED');  // e.g. 500
//         return `motor.run(${speed})\n`;
//     };