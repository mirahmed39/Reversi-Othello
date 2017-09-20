// app.js
// importing modules.
const app = require('./reversi.js');
const readlineSync = require('readline-sync');
const fs = require('fs');


let board = app.generateBoard(4,4);
board = app.placeLetters(board, 'X', 'A1', 'C3');
board = app.placeLetters(board, 'O', 'A4', 'C4', 'D4', 'B2', 'A2');
console.log(app.boardToString(board));

/*
//varible declarations
let boardWidth, userLetter, botLetter;
// interactive game begins.
console.log("Hello!! Welcome to the world of REVERSI");

boardWidth = readlineSync.question("How wide the board should be? (must be an even number between 4 and 26): ");
while(true) {
	if(boardWidth % 2 === 0 && (boardWidth >=4 && boardWidth <= 26))
		break;
	else
		boardWidth = readlineSync.question("How wide the board should be? (must be an even number between 4 and 26): ");
}

userLetter = readlineSync.question("Which letter you want to choose? X for black and O for white: ");
while(true) {
	if(userLetter === 'X' || userLetter === 'O') {
		console.log("You picked " + userLetter);
		if(userLetter != 'X')
			botLetter = "X";
		else
			botLetter = "O";
		break;
	} else
		userLetter = readlineSync.question("Which letter you want to choose? X for black and O for white: ");
}

//construct board and place initial cells.
let board = app.generateBoard(boardWidth, boardWidth);
const initialCellIndices = app.getCenterIndices(boardWidth);
board = app.setBoardCell(board, userLetter, initialCellIndices[0][0], initialCellIndices[0][1]);
board = app.setBoardCell(board, userLetter, initialCellIndices[2][0], initialCellIndices[2][1]);
board = app.setBoardCell(board, botLetter, initialCellIndices[1][0], initialCellIndices[1][1]);
board = app.setBoardCell(board, botLetter, initialCellIndices[3][0], initialCellIndices[3][1]);
console.log(board);
console.log("What is your move? "); */





