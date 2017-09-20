// app.js
// importing modules.
const app = require('./reversi.js');
const readlineSync = require('readline-sync');
const fs = require('fs');

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

board = app.setBoardCell(board, userLetter, initialCellIndices.player1[0][0], initialCellIndices.player1[0][1]);
board = app.setBoardCell(board, userLetter, initialCellIndices.player1[1][0], initialCellIndices.player1[1][1]);
board = app.setBoardCell(board, botLetter, initialCellIndices.player2[0][0], initialCellIndices.player2[0][1]);
board = app.setBoardCell(board, botLetter, initialCellIndices.player2[1][0], initialCellIndices.player2[1][1]);

//display the board
console.log(app.boardToString(board));

//simulation prep
let player = false, computer = false, userPass = 0, computerPass = 0;
let score = app.getLetterCounts(board);
if(userLetter === "X") {
	player = true;
} else {
	computer = true;
}

while((player || computer)) {
	if(player === true) {
		let userMove = readlineSync.question("What is your move? ");
		while(true) {
			if(!app.isValidMoveAlgebraicNotation(board, userLetter, userMove)) {
				console.log("INVALID MOVE. Your move should:\n" +
					"* be in a format \n* specify an existing empty cell" +
					"\n*flip at least one of your opponent's pieces.");
				userMove = readlineSync.question("What is your move? ");
			} else {
				userMoveRowCol = app.algebraicToRowCol(userMove);
				let cellsToFlip = app.getCellsToFlip(board, userMoveRowCol.row, userMoveRowCol.col); // returns arrays of row col pair grouped together.
				board = app.flipCells(board, cellsToFlip);
				score = app.getLetterCounts(board);
				console.log(app.boardToString(board));
				console.log("Score\n====");
				console.log("X :" + score.X);
				console.log("O :"+ score.O);
				player = false;
				computer = true;
				break;
			}
		}
	}
	break;
}





