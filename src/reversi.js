// reversi.js


/*
	returns an array having each element as value repeated
	n times.
*/
function repeat(value, n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
    	arr.push(value);
    }
    return arr;
}


function generateBoard(rows, columns, initialCellValue = " ") {
	const boardArray = [];
	const eachRow = repeat(initialCellValue, columns);
	for(let i = 0; i < rows; i++) {
		boardArray.push(...eachRow);
	}
	return boardArray;
}

function rowColToIndex(board, rowNumber, columnNumber) {
	const boardEntries = board.length;
	const boardWidth = Math.sqrt(boardEntries);
	return (boardWidth*rowNumber)+columnNumber;
}


function indexToRowCol(board, i) {
	const boardEntries = board.length;
	const boardWidth = Math.sqrt(boardEntries);
	const row = Math.floor(i/boardWidth);
	const col = i - (boardWidth*row);
	return {
		row: row,
		col: col
	};
}


function setBoardCell(board, letter, row, col) {
	const setBoard = board.slice();
	const indexToSet = rowColToIndex(board, row, col);
	setBoard[indexToSet] = letter;
	return setBoard;
}

function algebraicToRowCol(algebraicNotation) {
	const letterToCol = {"A": 0, "B":1, "C":2,"D":3,"E":4,"F":5,"G":6,"H":7,"I":8,"J":9,"K":10,"L":11,"M":12,
						"N":13,"O":14,"P":15,"Q":16,"R":17,"S":18,"T":19,"U":20,"V":21,"W":22,"X":23,"Y":24,"Z":25,};
	if(algebraicNotation.length === 2 && isNaN(algebraicNotation.charAt(0)) && !isNaN(algebraicNotation.charAt(1))) {
		return {
			row: algebraicNotation.charAt(1) - 1,
			col: letterToCol[algebraicNotation.charAt(0)]
		};
	}
	return undefined;
}

function placeLetters(board, letter, ...algebraicNotation) {
	let newBoard = board.slice();
	const notations = algebraicNotation;
	for( let i = 0; i < notations.length; i++) {
		rowCol = algebraicToRowCol(notations[i]);
		if(rowCol === undefined) {
			console.log("Invalid Notation " + notation);
		} else {
			newBoard = setBoardCell(newBoard, letter, rowCol.row, rowCol.col);
		}
	}
	return newBoard;
}


function boardToString(board) {
	line = '-----'
	verticalFormat = "|    ";
	let boardString = "    ";
	const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
					'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	let startRow = 1;
	const boardWidth = Math.sqrt(board.length);
	console.log(boardWidth);
	for(let i = 0; i < boardWidth; i++) {
		boardString += "  " +columns[i] + "  ";
	}
	boardString += "\n    ";
	boardString += line.repeat(boardWidth) + '\n';
	for(let i = 1; i <= boardWidth; i++) {
		/* when the number becomes 2 digit it pushed the vertical bar one unit right
			therefore to keep the vertical bars from row 10 and on aligned with row 1 to 9,
			a space is deleted from the else clause.
		*/
		if(i < 10) {
			boardString += i + "   " + verticalFormat.repeat(boardWidth) + '|' +'\n    ' + line.repeat(boardWidth) + '\n';
		} else {
			boardString += i + "  " + verticalFormat.repeat(boardWidth) + '|' +'\n    ' + line.repeat(boardWidth) + '\n';
		}

	}	
	console.log(boardString);

}

function isBoardFull(board) {
	for(let value of board) {
		if(value === ' ')
			return false;
		else 
			continue;
	}
	return true;
}

function flip(board, row, col) {
	indexToFlip = rowColToIndex(board, row, col);
	if(board[indexToFlip] === "X")
		board[indexToFlip] = "O";
	else if(board[indexToFlip] === "Y")
		board[indexToFlip] = "X";
	return board;
} 

function flipCells(board, cellsToFlip) {
	for(group of cellsToFlip){
		for(cell of group)
			flip(board, cell[0], cell[1]);
	}
	return board;
}

function getCellsToFlip(board, lastRow, lastCol) {
	
}


function isValidMove() {

}


module.exports = {
    repeat: repeat,
    generateBoard: generateBoard,
    rowColToIndex: rowColToIndex,
    indexToRowCol: indexToRowCol,
    setBoardCell: setBoardCell,
    algebraicToRowCol: algebraicToRowCol,
    placeLetters: placeLetters,
    //boardToString: boardToString, // NOT COMPLETED.
    isBoardFull: isBoardFull,
    flip: flip,
    flipCells: flipCells,
    getCellsToFlip: getCellsToFlip,
    isValidMove: isValidMove,
}