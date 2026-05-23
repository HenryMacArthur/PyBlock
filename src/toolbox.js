// toolbox.js
export const toolbox = {
    kind: 'categoryToolbox',
    contents: [
        { kind: 'category', name: 'Logic',  colour: 210, contents: [
            { kind: 'block', type: 'controls_if' },
            { kind: 'block', type: 'logic_compare' },
            { kind: 'block', type: 'logic_operation' },
            { kind: 'block', type: 'logic_negate' },
            { kind: 'block', type: 'logic_boolean' },
        ]},
        { kind: 'category', name: 'Loops', colour: 120, contents: [
            { kind: 'block', type: 'controls_repeat_ext' },
            { kind: 'block', type: 'controls_whileUntil' },
        ]},
        { kind: 'category', name: 'Math',  colour: 230, contents: [
            { kind: 'block', type: 'math_number' },
            { kind: 'block', type: 'math_arithmetic' },
        ]},
    ]
};