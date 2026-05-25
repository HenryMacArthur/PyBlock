// Dear person editing this, this is 658 lines
// For your sanity, if nothing's broken, don't try to change anything

/// Shadow blocks can be used as the default input, so you don't have to drag number blocks into each slot
// Use this as an input shadow so a number appears by default but any Number
// block can be snapped in its place.
function numShadow(value = 0) {
    return {
        shadow: {
            type: 'math_number',
            fields: { NUM: value },
        },
    };
}

export const blockDefs = [

    // Just a pure number
    {
        type: 'math_number',
        message0: '%1',
        args0: [{ type: 'field_number', name: 'NUM', value: 0 }],
        output: 'Number',
        colour: 230,
        tooltip: 'A number.',
    },

    // Add/Subtract/multiply/divide
    {
        type: 'math_arithmetic',
        message0: '%1 %2 %3',
        args0: [
            { type: 'input_value', name: 'A', check: 'Number' },
            {
                type: 'field_dropdown',
                name: 'OP',
                options: [
                    ['+', 'ADD'],
                    ['−', 'MINUS'],
                    ['×', 'MULTIPLY'],
                    ['÷', 'DIVIDE'],
                    ['^', 'POWER'],
                ],
            },
            { type: 'input_value', name: 'B', check: 'Number' },
        ],
        inputsInline: true,
        output: 'Number',
        colour: 230,
        tooltip: 'Basic arithmetic: +, −, ×, ÷, or power.',
    },

    // Modulo
    {
        type: 'math_modulo',
        message0: '%1 mod %2',
        args0: [
            { type: 'input_value', name: 'DIVIDEND', check: 'Number' },
            { type: 'input_value', name: 'DIVISOR',  check: 'Number' },
        ],
        inputsInline: true,
        output: 'Number',
        colour: 230,
        tooltip: 'Remainder after dividing the first number by the second.',
    },

    // Int division
    {
        type: 'math_floor_divide',
        message0: '%1 // %2',
        args0: [
            { type: 'input_value', name: 'A', check: 'Number' },
            { type: 'input_value', name: 'B', check: 'Number' },
        ],
        inputsInline: true,
        output: 'Number',
        colour: 230,
        tooltip: 'Floor (integer) division.',
    },

    // Negate
    {
        type: 'math_negate',
        message0: '− %1',
        args0: [{ type: 'input_value', name: 'NUM', check: 'Number' }],
        inputsInline: true,
        output: 'Number',
        colour: 230,
        tooltip: 'Negate a number (multiply by −1).',
    },

    // Absolute value
    {
        type: 'math_abs',
        message0: 'abs %1',
        args0: [{ type: 'input_value', name: 'NUM', check: 'Number' }],
        output: 'Number',
        colour: 230,
        tooltip: 'Absolute value.',
    },

    //  Single-arg math functions (sqrt, floor, ceil, round, log, log2, log10) 
    {
        type: 'math_single',
        message0: '%1 %2',
        args0: [
            {
                type: 'field_dropdown',
                name: 'OP',
                options: [
                    ['√',       'ROOT'],
                    ['floor',   'FLOOR'],
                    ['ceil',    'CEIL'],
                    ['round',   'ROUND'],
                    ['ln',      'LN'],
                    ['log₂',    'LOG2'],
                    ['log₁₀',   'LOG10'],
                    ['e^',      'EXP'],
                    ['10^',     'POW10'],
                ],
            },
            { type: 'input_value', name: 'NUM', check: 'Number' },
        ],
        inputsInline: true,
        output: 'Number',
        colour: 230,
        tooltip: 'Apply a single-argument math function.',
    },

    //  Trig functions 
    {
        type: 'math_trig',
        message0: '%1 %2',
        args0: [
            {
                type: 'field_dropdown',
                name: 'OP',
                options: [
                    ['sin',  'SIN'],
                    ['cos',  'COS'],
                    ['tan',  'TAN'],
                    ['asin', 'ASIN'],
                    ['acos', 'ACOS'],
                    ['atan', 'ATAN'],
                ],
            },
            { type: 'input_value', name: 'NUM', check: 'Number' },
        ],
        inputsInline: true,
        output: 'Number',
        colour: 230,
        tooltip: 'Trigonometric functions. Input/output in degrees.',
    },

    //  atan2 
    {
        type: 'math_atan2',
        message0: 'atan2 y: %1 x: %2',
        args0: [
            { type: 'input_value', name: 'Y', check: 'Number' },
            { type: 'input_value', name: 'X', check: 'Number' },
        ],
        inputsInline: true,
        output: 'Number',
        colour: 230,
        tooltip: 'Two-argument arctangent (atan2). Result in degrees.',
    },

    //  Clamp 
    {
        type: 'math_clamp',
        message0: 'clamp %1 low %2 high %3',
        args0: [
            { type: 'input_value', name: 'NUM',  check: 'Number' },
            { type: 'input_value', name: 'LOW',  check: 'Number' },
            { type: 'input_value', name: 'HIGH', check: 'Number' },
        ],
        inputsInline: true,
        output: 'Number',
        colour: 230,
        tooltip: 'Constrain a value between a low and high bound.',
    },

    //  Map / scale 
    {
        type: 'math_map',
        message0: 'map %1 from %2–%3 to %4–%5',
        args0: [
            { type: 'input_value', name: 'NUM',   check: 'Number' },
            { type: 'input_value', name: 'IN_MIN',  check: 'Number' },
            { type: 'input_value', name: 'IN_MAX',  check: 'Number' },
            { type: 'input_value', name: 'OUT_MIN', check: 'Number' },
            { type: 'input_value', name: 'OUT_MAX', check: 'Number' },
        ],
        inputsInline: true,
        output: 'Number',
        colour: 230,
        tooltip: 'Re-map a value from one range to another (linear interpolation).',
    },

    //  Min / Max 
    {
        type: 'math_min_max',
        message0: '%1 of %2 and %3',
        args0: [
            {
                type: 'field_dropdown',
                name: 'OP',
                options: [
                    ['min', 'MIN'],
                    ['max', 'MAX'],
                ],
            },
            { type: 'input_value', name: 'A', check: 'Number' },
            { type: 'input_value', name: 'B', check: 'Number' },
        ],
        inputsInline: true,
        output: 'Number',
        colour: 230,
        tooltip: 'Return the smaller or larger of two numbers.',
    },

    //  Random integer 
    {
        type: 'math_random_int',
        message0: 'random integer from %1 to %2',
        args0: [
            { type: 'input_value', name: 'FROM', check: 'Number' },
            { type: 'input_value', name: 'TO',   check: 'Number' },
        ],
        inputsInline: true,
        output: 'Number',
        colour: 230,
        tooltip: 'Random integer between two bounds (inclusive).',
    },

    //  Random float (0–1) 
    {
        type: 'math_random_float',
        message0: 'random float 0–1',
        output: 'Number',
        colour: 230,
        tooltip: 'A random floating-point number from 0 (inclusive) to 1 (exclusive).',
    },

    //  Mathematical constants 
    {
        type: 'math_constant',
        message0: '%1',
        args0: [
            {
                type: 'field_dropdown',
                name: 'CONSTANT',
                options: [
                    ['π',   'PI'],
                    ['e',   'E'],
                    ['τ',   'TAU'],    // 2π
                    ['√2',  'SQRT2'],
                    ['√½',  'SQRT1_2'],
                    ['∞',   'INF'],
                ],
            },
        ],
        output: 'Number',
        colour: 230,
        tooltip: 'A mathematical constant.',
    },

    //  Number property check (Boolean output) 
    {
        type: 'math_number_property',
        message0: '%1 is %2',
        args0: [
            { type: 'input_value', name: 'NUMBER_TO_CHECK', check: 'Number' },
            {
                type: 'field_dropdown',
                name: 'PROPERTY',
                options: [
                    ['even',     'EVEN'],
                    ['odd',      'ODD'],
                    ['positive', 'POSITIVE'],
                    ['negative', 'NEGATIVE'],
                    ['zero',     'ZERO'],
                    ['integer',  'INTEGER'],
                    ['finite',   'FINITE'],
                ],
            },
        ],
        inputsInline: true,
        output: 'Boolean',
        colour: 230,
        tooltip: 'Check a numeric property; returns True or False.',
    },

    //  Degrees ↔ Radians 
    {
        type: 'math_deg_rad',
        message0: '%1 %2',
        args0: [
            {
                type: 'field_dropdown',
                name: 'OP',
                options: [
                    ['degrees → radians', 'DEG_TO_RAD'],
                    ['radians → degrees', 'RAD_TO_DEG'],
                ],
            },
            { type: 'input_value', name: 'NUM', check: 'Number' },
        ],
        inputsInline: true,
        output: 'Number',
        colour: 230,
        tooltip: 'Convert between degrees and radians.',
    },

];

// Code generators

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

    gen.forBlock['math_modulo'] = function (block) {
        const a = gen.valueToCode(block, 'DIVIDEND', Order.MULTIPLICATIVE) || '0';
        const b = gen.valueToCode(block, 'DIVISOR',  Order.MULTIPLICATIVE) || '1';
        return [`${a} % ${b}`, Order.MULTIPLICATIVE];
    };

    gen.forBlock['math_floor_divide'] = function (block) {
        const a = gen.valueToCode(block, 'A', Order.MULTIPLICATIVE) || '0';
        const b = gen.valueToCode(block, 'B', Order.MULTIPLICATIVE) || '1';
        return [`${a} // ${b}`, Order.MULTIPLICATIVE];
    };

    gen.forBlock['math_negate'] = function (block) {
        const n = gen.valueToCode(block, 'NUM', Order.UNARY) || '0';
        return [`-${n}`, Order.UNARY];
    };

    gen.forBlock['math_abs'] = function (block) {
        const n = gen.valueToCode(block, 'NUM', Order.NONE) || '0';
        return [`abs(${n})`, Order.FUNCTION_CALL];
    };

    gen.forBlock['math_single'] = function (block) {
        const n = gen.valueToCode(block, 'NUM', Order.NONE) || '0';
        const FUNCS = {
            ROOT:  `math.sqrt(${n})`,
            FLOOR: `math.floor(${n})`,
            CEIL:  `math.ceil(${n})`,
            ROUND: `round(${n})`,
            LN:    `math.log(${n})`,
            LOG2:  `math.log2(${n})`,
            LOG10: `math.log10(${n})`,
            EXP:   `math.exp(${n})`,
            POW10: `(10 ** (${n}))`,
        };
        return [FUNCS[block.getFieldValue('OP')], Order.FUNCTION_CALL];
    };

    // Blockly convention: trig works in degrees; convert to/from radians.
    gen.forBlock['math_trig'] = function (block) {
        const n = gen.valueToCode(block, 'NUM', Order.NONE) || '0';
        const FUNCS = {
            SIN:  `math.sin(math.radians(${n}))`,
            COS:  `math.cos(math.radians(${n}))`,
            TAN:  `math.tan(math.radians(${n}))`,
            ASIN: `math.degrees(math.asin(${n}))`,
            ACOS: `math.degrees(math.acos(${n}))`,
            ATAN: `math.degrees(math.atan(${n}))`,
        };
        return [FUNCS[block.getFieldValue('OP')], Order.FUNCTION_CALL];
    };

    gen.forBlock['math_atan2'] = function (block) {
        const y = gen.valueToCode(block, 'Y', Order.NONE) || '0';
        const x = gen.valueToCode(block, 'X', Order.NONE) || '1';
        return [`math.degrees(math.atan2(${y}, ${x}))`, Order.FUNCTION_CALL];
    };

    gen.forBlock['math_clamp'] = function (block) {
        const n   = gen.valueToCode(block, 'NUM',  Order.NONE) || '0';
        const lo  = gen.valueToCode(block, 'LOW',  Order.NONE) || '0';
        const hi  = gen.valueToCode(block, 'HIGH', Order.NONE) || '100';
        return [`max(${lo}, min(${hi}, ${n}))`, Order.FUNCTION_CALL];
    };

    gen.forBlock['math_map'] = function (block) {
        const n    = gen.valueToCode(block, 'NUM',     Order.NONE) || '0';
        const inA  = gen.valueToCode(block, 'IN_MIN',  Order.NONE) || '0';
        const inB  = gen.valueToCode(block, 'IN_MAX',  Order.NONE) || '100';
        const outA = gen.valueToCode(block, 'OUT_MIN', Order.NONE) || '0';
        const outB = gen.valueToCode(block, 'OUT_MAX', Order.NONE) || '100';
        return [
            `((${n}) - (${inA})) / ((${inB}) - (${inA})) * ((${outB}) - (${outA})) + (${outA})`,
            Order.ADDITIVE,
        ];
    };

    gen.forBlock['math_min_max'] = function (block) {
        const fn = block.getFieldValue('OP').toLowerCase(); // 'min' or 'max'
        const a  = gen.valueToCode(block, 'A', Order.NONE) || '0';
        const b  = gen.valueToCode(block, 'B', Order.NONE) || '0';
        return [`${fn}(${a}, ${b})`, Order.FUNCTION_CALL];
    };

    gen.forBlock['math_random_int'] = function (block) {
        const from = gen.valueToCode(block, 'FROM', Order.NONE) || '1';
        const to   = gen.valueToCode(block, 'TO',   Order.NONE) || '10';
        return [`random.randint(${from}, ${to})`, Order.FUNCTION_CALL];
    };

    gen.forBlock['math_random_float'] = function (_block) {
        return [`random.random()`, Order.FUNCTION_CALL];
    };

    gen.forBlock['math_constant'] = function (block) {
        const CONSTANTS = {
            PI:     'math.pi',
            E:      'math.e',
            TAU:    'math.tau',
            SQRT2:  'math.sqrt(2)',
            SQRT1_2:'math.sqrt(0.5)',
            INF:    'math.inf',
        };
        return [CONSTANTS[block.getFieldValue('CONSTANT')], Order.ATOMIC];
    };

    gen.forBlock['math_number_property'] = function (block) {
        const n = gen.valueToCode(block, 'NUMBER_TO_CHECK', Order.NONE) || '0';
        const CHECKS = {
            EVEN:     `(${n}) % 2 == 0`,
            ODD:      `(${n}) % 2 != 0`,
            POSITIVE: `(${n}) > 0`,
            NEGATIVE: `(${n}) < 0`,
            ZERO:     `(${n}) == 0`,
            INTEGER:  `(${n}) == int(${n})`,
            FINITE:   `math.isfinite(${n})`,
        };
        return [CHECKS[block.getFieldValue('PROPERTY')], Order.RELATIONAL];
    };

    gen.forBlock['math_deg_rad'] = function (block) {
        const n  = gen.valueToCode(block, 'NUM', Order.NONE) || '0';
        const fn = block.getFieldValue('OP') === 'DEG_TO_RAD'
            ? `math.radians(${n})`
            : `math.degrees(${n})`;
        return [fn, Order.FUNCTION_CALL];
    };
}

// Toolbox stuff
export const toolboxCategory = {
    kind: 'category',
    name: 'Math',
    colour: 230,
    contents: [

        {
            kind: 'block',
            type: 'math_number',
            fields: { NUM: 0 },
        },

        {
            kind: 'block',
            type: 'math_arithmetic',
            fields: { OP: 'ADD' },
            inputs: {
                A: numShadow(1),
                B: numShadow(1),
            },
        },

        {
            kind: 'block',
            type: 'math_modulo',
            inputs: {
                DIVIDEND: numShadow(10),
                DIVISOR:  numShadow(3),
            },
        },

        {
            kind: 'block',
            type: 'math_floor_divide',
            inputs: {
                A: numShadow(10),
                B: numShadow(3),
            },
        },

        {
            kind: 'block',
            type: 'math_negate',
            inputs: { NUM: numShadow(1) },
        },

        {
            kind: 'block',
            type: 'math_abs',
            inputs: { NUM: numShadow(-5) },
        },

        {
            kind: 'block',
            type: 'math_single',
            fields: { OP: 'ROOT' },
            inputs: { NUM: numShadow(9) },
        },

        {
            kind: 'block',
            type: 'math_trig',
            fields: { OP: 'SIN' },
            inputs: { NUM: numShadow(45) },
        },

        {
            kind: 'block',
            type: 'math_atan2',
            inputs: {
                Y: numShadow(1),
                X: numShadow(1),
            },
        },

        {
            kind: 'block',
            type: 'math_clamp',
            inputs: {
                NUM:  numShadow(50),
                LOW:  numShadow(0),
                HIGH: numShadow(100),
            },
        },

        {
            kind: 'block',
            type: 'math_map',
            inputs: {
                NUM:     numShadow(50),
                IN_MIN:  numShadow(0),
                IN_MAX:  numShadow(100),
                OUT_MIN: numShadow(0),
                OUT_MAX: numShadow(1),
            },
        },

        // ── Min /  ────────────────────────────────────────────────────────
        {
            kind: 'block',
            type: 'math_min_max',
            fields: { OP: 'MIN' },
            inputs: {
                A: numShadow(0),
                B: numShadow(100),
            },
        },

        {
            kind: 'block',
            type: 'math_random_int',
            inputs: {
                FROM: numShadow(1),
                TO:   numShadow(10),
            },
        },

        {
            kind: 'block',
            type: 'math_random_float',
        },

        {
            kind: 'block',
            type: 'math_constant',
            fields: { CONSTANT: 'PI' },
        },

        {
            kind: 'block',
            type: 'math_number_property',
            fields: { PROPERTY: 'EVEN' },
            inputs: { NUMBER_TO_CHECK: numShadow(0) },
        },

        {
            kind: 'block',
            type: 'math_deg_rad',
            fields: { OP: 'DEG_TO_RAD' },
            inputs: { NUM: numShadow(180) },
        },

    ],
};