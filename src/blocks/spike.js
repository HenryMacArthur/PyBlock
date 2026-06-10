// SPIKE blocks
// -----------------------------
// 1. blockDefs         — Blockly JSON block definitions
// 2. registerGenerators — Python generator registrations
// 3. toolboxCategory   — category entries for the toolbox
// -----------------------------

// blockDefs contains the block shapes and fields that users can drag into the workspace.
// Each block definition is standard Blockly JSON with labels, inputs, and connectivity.
export const blockDefs = [
    {
        type: 'spike_motor_run',
        message0: 'run motor on port %1 at speed %2',
        args0: [
            {
                type: 'field_dropdown',
                name: 'PORT',
                options: [
                    ['A', 'Port.A'],
                    ['B', 'Port.B'],
                    ['C', 'Port.C'],
                    ['D', 'Port.D'],
                ],
            },
            { type: 'input_value', name: 'SPEED', check: 'Number' },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 330,
        tooltip: 'Run a motor at a given speed.',
    },
    {
        type: 'spike_motor_stop',
        message0: 'stop motor on port %1',
        args0: [
            {
                type: 'field_dropdown',
                name: 'PORT',
                options: [
                    ['A', 'Port.A'],
                    ['B', 'Port.B'],
                    ['C', 'Port.C'],
                    ['D', 'Port.D'],
                ],
            },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 330,
        tooltip: 'Stop the motor on the selected port.',
    },
    {
        type: 'spike_motor_run_for_degrees',
        message0: 'run motor on port %1 for %2 degrees at speed %3',
        args0: [
            {
                type: 'field_dropdown',
                name: 'PORT',
                options: [
                    ['A', 'Port.A'],
                    ['B', 'Port.B'],
                    ['C', 'Port.C'],
                    ['D', 'Port.D'],
                ],
            },
            { type: 'input_value', name: 'DEGREES', check: 'Number' },
            { type: 'input_value', name: 'SPEED', check: 'Number' },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 330,
        tooltip: 'Run the motor for a specific number of degrees.',
    },
    {
        type: 'spike_sensor_touch_pressed',
        message0: 'touch sensor on port %1 pressed?',
        args0: [
            {
                type: 'field_dropdown',
                name: 'PORT',
                options: [
                    ['A', 'Port.A'],
                    ['B', 'Port.B'],
                    ['C', 'Port.C'],
                    ['D', 'Port.D'],
                ],
            },
        ],
        output: 'Boolean',
        colour: 330,
        tooltip: 'Returns true when the touch sensor is pressed.',
    },
];

// registerGenerators connects each block type to Python code generation logic.
// The `gen` object is the Blockly Python generator, and `Order` defines operator precedence.
export function registerGenerators(gen, Order) {
    // Statement block generator: run the motor at a speed.
    gen.forBlock['spike_motor_run'] = function (block) {
        // Add the Motor import if this block is used.
        gen.definitions_['import_motor'] = 'from pybricks.pupdevices import Motor';

        // Read the selected port and connected speed value.
        const port = block.getFieldValue('PORT');
        const speed = gen.valueToCode(block, 'SPEED', Order.NONE) || '0';

        // Return the Python statement with a newline.
        return `Motor(${port}).run(${speed})\n`;
    };

    // Statement block generator: stop the motor.
    gen.forBlock['spike_motor_stop'] = function (block) {
        gen.definitions_['import_motor'] = 'from pybricks.pupdevices import Motor';
        const port = block.getFieldValue('PORT');
        return `Motor(${port}).stop()\n`;
    };

    // Statement block generator: rotate motor to a target position.
    gen.forBlock['spike_motor_run_for_degrees'] = function (block) {
        gen.definitions_['import_motor'] = 'from pybricks.pupdevices import Motor';
        const port = block.getFieldValue('PORT');
        const degrees = gen.valueToCode(block, 'DEGREES', Order.NONE) || '0';
        const speed = gen.valueToCode(block, 'SPEED', Order.NONE) || '0';
        return `Motor(${port}).run_target(${speed}, ${degrees})\n`;
    };

    // Value block generator: check whether the touch sensor is pressed.
    gen.forBlock['spike_sensor_touch_pressed'] = function (block) {
        gen.definitions_['import_touch'] = 'from pybricks.pupdevices import TouchSensor';
        const port = block.getFieldValue('PORT');

        // Output blocks return [code, precedence]. ATOMIC means it is a single value.
        return [`TouchSensor(${port}).pressed()`, Order.ATOMIC];
    };
}

// toolboxCategory defines how the SPIKE category appears in the Blockly toolbox.
export const toolboxCategory = {
    kind: 'category',
    name: 'SPIKE',
    colour: 300,
    contents: [
        {
            kind: 'block',
            type: 'spike_motor_run',
            inputs: {
                SPEED: {
                    shadow: {
                        type: 'math_number',
                        fields: { NUM: 50 },
                    },
                },
            },
        },
        {
            kind: 'block',
            type: 'spike_motor_stop',
        },
        {
            kind: 'block',
            type: 'spike_motor_run_for_degrees',
            inputs: {
                DEGREES: {
                    shadow: {
                        type: 'math_number',
                        fields: { NUM: 360 },
                    },
                },
                SPEED: {
                    shadow: {
                        type: 'math_number',
                        fields: { NUM: 100 },
                    },
                },
            },
        },
        {
            kind: 'block',
            type: 'spike_sensor_touch_pressed',
        },
    ],
};
