// app.js

let app = require('./reversi.js');
let board = app.generateBoard(4, 4, " ");

/*
let str = "     A   B   C  \n   +---+---+---+\n 1 |   |   | O |\n   +---+---+---+\n 2 |   | X |   |\n   +---+---+---+\n 3 |   |   |   |\n   +---+---+---+\n";
console.log(str);
*/
//app.getCellsToFlip(board, 1, 4);
board = app.placeLetters(board, 'O','A1', 'C1', 'A2', 'C2');
board = app.placeLetters(board, 'X', 'B2', 'C2', 'B3', 'C3', 'C4');
console.log(app.getValidMoves(board, 'X'));


//console.log(app.getUpperLeftIndices(board, 2, 1, 3));

