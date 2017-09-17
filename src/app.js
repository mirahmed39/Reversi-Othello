// app.js

let app = require('./reversi.js');
board = app.generateBoard(4, 4, " ");

/*
let str = "     A   B   C  \n   +---+---+---+\n 1 |   |   | O |\n   +---+---+---+\n 2 |   | X |   |\n   +---+---+---+\n 3 |   |   |   |\n   +---+---+---+\n";
console.log(str);
*/
app.flipCells(board, [[[0,0],[0,1]],[[1,1]]]);