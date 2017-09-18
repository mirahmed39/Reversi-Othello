// app.js

let app = require('./reversi.js');
let x = 'something'; board = app.generateBoard(3, 3, " ");

/*
let str = "     A   B   C  \n   +---+---+---+\n 1 |   |   | O |\n   +---+---+---+\n 2 |   | X |   |\n   +---+---+---+\n 3 |   |   |   |\n   +---+---+---+\n";
console.log(str);
*/
//app.getCellsToFlip(board, 1, 4);
board = app.placeLetters(board, 'O','A2');
board = app.placeLetters(board, 'X', 'A1');
console.log(app.getValidMoves(board, 'X'));

