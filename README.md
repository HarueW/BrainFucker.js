# BrainFucker.js

A BrainFuck Language Interpreter can run on node.js by devepcoder

## Usage

```js
'use strict';

var brainfuck   = require('./BrainFucker.js'),
    source      = '>+++++++++[<++++++++>-]<.>+++++++[<++++>-]<+.+++++++..+++.[-]'
                + '>++++++++[<++++>-]<.>+++++++++++[<++++++++>-]<-.--------.+++'
                + '.------.--------.[-]>++++++++[<++++>-]<+.';

brainfuck.exec(source, function(err, output) {
    if (err) { throw err };

    console.log(output);
});
```

### Learning BrainFuck Language

Brainfuck is a Turing-complete programming language made of eight instructions, each a single character in length, and no operands:
```
    > : increments the data pointer
    < : decrements the data pointer
    + : increases byte-value at the data pointer by one
    - : decreases byte-value at the data pointer by one
    . : converts the byte-value at the data pointer into an ASCII character
    , : accepts input an stores it's byte-value at the data pointer
    [ : if the byte-value at the data pointer is zero, jump forward to the instruction after the matching ']'
    ] : if the byte-value at the data pointer is non-zero, jump back to the instruction after the matching '['
```
