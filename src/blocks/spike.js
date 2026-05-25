

// Block definitions

export const blockDefs = [
     {
         type: 'spike_motor_run',
         message0: 'run motor on port %1 at speed %2',
         args0: [
             { type: 'field_dropdown', name: 'PORT',
               options: [['A','Port.A'],['B','Port.B'],['C','Port.C'],['D','Port.D']] },
             { type: 'input_value', name: 'SPEED', check: 'Number' },
         ],
         previousStatement: null,
         nextStatement: null,
         colour: 0,
         tooltip: 'Run a motor at a given speed.',
     },
];

// Generates Python

export function registerGenerators(gen, Order) {
    // Add generators here.
     gen.forBlock['spike_motor_run'] = function (block) {
         gen.definitions_['import_motor'] = 'from pybricks.pupdevices import Motor '
         // What needs to be imported to make the block work
         const port  = block.getFieldValue('PORT');
         const speed = gen.valueToCode(block, 'SPEED', Order.NONE) || '0';
         return `Motor(${port}).run(${speed})\n`;
     };
}

// Toolbox stuff
export const toolboxCategory = blockDefs.length > 0 ? {
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
        fields: { NUM: 50 }
      }
    }
  }
}
]
} : null;