// app.js

let app = require('./reversi.js');
const board = app.generateBoard(5, 5, " ");

/*
let str = "     A   B   C  \n   +---+---+---+\n 1 |   |   | O |\n   +---+---+---+\n 2 |   | X |   |\n   +---+---+---+\n 3 |   |   |   |\n   +---+---+---+\n";
console.log(str);
*/
//app.getCellsToFlip(board, 1, 4);
console.log(app.getLowerLeftIndices(board, 4, 4, 5));