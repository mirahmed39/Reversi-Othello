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
	let index = (boardWidth*rowNumber)+columnNumber;
	return index;
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
	let setBoard = board.slice();
	let indexToSet = rowColToIndex(setBoard, row, col);
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

function rowColToAlgebraic(row, col) {
	let algebraicNotation = '';
	const letterToCol = {0:"A", 1:"B", 2:"C",3:"D",4:"E",5:"F",6:"G",7:"H",8:"I",9:"J",10:"K",11:"L",12:"M",
						13:"N",14:"O",15:"P",16:"Q",17:"R",18:"S",19:"T",20:"U",21:"V",22:"W",23:"X",24:"Y",25:"Z",};
	algebraicNotation += letterToCol[col] + (row+1);
	return algebraicNotation;
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
	let line = '-----';
	let verticalFormat = '|    ';
	let boardString = "    ";
	const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
					'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	const boardWidth = Math.sqrt(board.length);
	for(let i = 0; i < boardWidth; i++) {
		boardString += "  " +columns[i] + "  ";
	}
	boardString += "\n    ";
	boardString += line.repeat(boardWidth) + '\n';
	for(let startRow = 1, i = 0; i < board.length; i++) {
		if(hasLetter(board, i)) {
			curLetter = board[i];
			let verticalFormatWithLetter = '| ' + curLetter + '  ';
			if (startRow < 10) {
					if(isIndexOnLeftEdge(i, boardWidth)) { // new row
						boardString += startRow + "   " + verticalFormatWithLetter;
					} 
					else if(isIndexOnRightEdge(i, boardWidth)) { // end row
						boardString += verticalFormatWithLetter + '|\n    ';
						boardString += line.repeat(boardWidth) + '\n';
						startRow++;
					}
					else
						boardString += verticalFormatWithLetter;
				} else {
					if(isIndexOnLeftEdge(i, boardWidth)) { // new row
						boardString += startRow + "  " + verticalFormatWithLetter;
					} 
					else if(isIndexOnRightEdge(i, boardWidth)) { // end row
						boardString += verticalFormatWithLetter + '|\n    ';
						boardString += line.repeat(boardWidth) + '\n';
						startRow++;
					}
					else
						boardString += verticalFormatWithLetter;
				}
		} else {
			if (startRow < 10) {
					if(isIndexOnLeftEdge(i, boardWidth)) { // new row
						boardString += startRow + "   " + verticalFormat;
					} 
					else if(isIndexOnRightEdge(i, boardWidth)) { // end row
						boardString += verticalFormat + '|\n    ';
						boardString += line.repeat(boardWidth) + '\n';
						startRow++;
					}
					else
						boardString += verticalFormat;
			} else {
				if(isIndexOnLeftEdge(i, boardWidth)) { // new row
					boardString += startRow + "  " + verticalFormat;
				} 
				else if(isIndexOnRightEdge(i, boardWidth)) { // end row
					boardString += verticalFormat + '|\n    ';
					boardString += line.repeat(boardWidth) + '\n';
					startRow++;
				}
				else
					boardString += verticalFormat;
			}

		}
	}
	return boardString;
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
	else if(board[indexToFlip] === "O")
		board[indexToFlip] = "X";
	return board;
} 

function flipCells(board, cellsToFlip) {
	let flippedBoard;
	for(let group of cellsToFlip){
		for(let cell of group)
			flippedBoard = flip(board, cell[0], cell[1]);
	}
	return flippedBoard;
}

function isIndexOnLeftEdge(index, boardWidth) {
	return index % boardWidth === 0;
}

function isIndexOnRightEdge(index, boardWidth) {
	return (index+1) % boardWidth === 0;
}

function isIndexOnTopEdge(index, boardWidth){
	return (index < boardWidth && index >= 0);
}

function isIndexOnBottomEdge(index, boardLength, boardWidth) {
	return (index >= boardLength - boardWidth && index < boardLength);
}

function getLeftIndices(board, lastRow, lastCol, boardWidth) {
	let lastMoveIndex = rowColToIndex(board, lastRow, lastCol);
	let leftIndices = [];
	if(isIndexOnLeftEdge(lastMoveIndex, boardWidth))
		return leftIndices;
	for(let i = lastMoveIndex-1; i >= lastRow*boardWidth; i = lastMoveIndex-1) {// populate for left direction
			leftIndices.push(i);
			lastMoveIndex = i;
	}
	return leftIndices;
}

function getRightIndices(board, lastRow, lastCol, boardWidth) {
	let lastMoveIndex = rowColToIndex(board, lastRow, lastCol);
	let rightIndeces = [];
	if(isIndexOnRightEdge(lastMoveIndex, boardWidth))
		return rightIndeces;
	for(let i = lastMoveIndex + 1; i <= (lastRow*boardWidth)+boardWidth-1; i = lastMoveIndex + 1) { // for right direction
		rightIndeces.push(i);
		lastMoveIndex = i;
	}
	return rightIndeces;
}

function getUpIndices(board, lastRow, lastCol, boardWidth) {
	let lastMoveIndex = rowColToIndex(board, lastRow, lastCol);
	let upIndeces = [];
	if(isIndexOnTopEdge(lastMoveIndex, boardWidth))
		return upIndeces;
	for(let i = lastMoveIndex - boardWidth; i >= 0; i = lastMoveIndex - boardWidth) { //populate for upward direction
		upIndeces.push(i);
		lastMoveIndex = i;
	}
	return upIndeces;
}

function getDownIndices(board, lastRow, lastCol, boardWidth) {
	let lastMoveIndex = rowColToIndex(board, lastRow, lastCol);
	let downIndices = [];
	if(isIndexOnBottomEdge(lastMoveIndex, boardWidth))
		return downIndeces;
	for(let i = lastMoveIndex + boardWidth; i < board.length; i = lastMoveIndex + boardWidth) { //populate for downward direction 
		downIndices.push(i);
		lastMoveIndex = i;
	}
	return downIndices;
}

function getUpperRightIndices(board, lastRow, lastCol, boardWidth) {
	let lastMoveIndex = rowColToIndex(board, lastRow, lastCol);
	let upperRightIndices = [];
	if(isIndexOnTopEdge(lastMoveIndex, boardWidth) || isIndexOnRightEdge(lastMoveIndex, boardWidth))
		return upperRightIndices;
	for(let i = lastMoveIndex - boardWidth + 1; i > 0; i = lastMoveIndex - boardWidth + 1) { //populate for upperRight direction 
		upperRightIndices.push(i);
		lastMoveIndex = i;
		if(isIndexOnTopEdge(lastMoveIndex, boardWidth) || isIndexOnRightEdge(lastMoveIndex, boardWidth))
			break;
	}
	return upperRightIndices;
}

function getUpperLeftIndices(board, lastRow, lastCol, boardWidth) {
	let lastMoveIndex = rowColToIndex(board, lastRow, lastCol);
	let upperLeftIndices = [];
	if (isIndexOnTopEdge(lastMoveIndex, boardWidth) || isIndexOnLeftEdge(lastMoveIndex, boardWidth))
		return upperLeftIndices;
	for(let i = lastMoveIndex - boardWidth - 1; i >= 0; i = lastMoveIndex - boardWidth - 1) { //populate for upperLeft direction 
		upperLeftIndices.push(i);
		lastMoveIndex = i;
		if(isIndexOnTopEdge(lastMoveIndex, boardWidth) || isIndexOnLeftEdge(lastMoveIndex, boardWidth))
			break;
	}
	return upperLeftIndices;
}

function getLowerRightIndices(board, lastRow, lastCol, boardWidth) {
	let lastMoveIndex = rowColToIndex(board, lastRow, lastCol);
	let lowerRightIndices = [];
	if(isIndexOnBottomEdge(lastMoveIndex, board.length, boardWidth) || isIndexOnRightEdge(lastMoveIndex, boardWidth))
		return lowerRightIndices;
	for(let i = lastMoveIndex + boardWidth + 1; i < board.length; i = lastMoveIndex + boardWidth + 1) { //populate for lowerRight direction 
		lowerRightIndices.push(i);
		lastMoveIndex = i;
		if(isIndexOnBottomEdge(lastMoveIndex, board.length, boardWidth) || isIndexOnRightEdge(lastMoveIndex, boardWidth))
			break;
	}
	return lowerRightIndices;
}

function getLowerLeftIndices(board, lastRow, lastCol, boardWidth) {
	let lastMoveIndex = rowColToIndex(board, lastRow, lastCol);
	let lowerLeftIndices = [];
	if(isIndexOnBottomEdge(lastMoveIndex, board.length, boardWidth) || isIndexOnLeftEdge(lastMoveIndex, boardWidth))
		return lowerLeftIndices;
	for(let i = lastMoveIndex + boardWidth - 1; i < board.length; i = lastMoveIndex + boardWidth - 1) { //populate for lowerLeft direction 
		lowerLeftIndices.push(i);
		lastMoveIndex = i;
		if(isIndexOnBottomEdge(lastMoveIndex, board.length, boardWidth) || isIndexOnLeftEdge(lastMoveIndex, boardWidth))
			break;
	}
	return lowerLeftIndices;
}

function hasLetter(board, index) {
	return board[index] != " ";
}

function potentialCells(board, indicesList, lastMoveLetter, functionName) {
	let potentialCells = [];
	boardLength = board.length;
	boardWidth = Math.sqrt(boardLength);
	for(let index of indicesList) {
		if(!hasLetter(board, index)) {
			potentialCells = [];
			break;
		} 
		else if(hasLetter(board, index) && lastMoveLetter != board[index]) {
				if(functionName === "left") {
					if(isIndexOnLeftEdge(index, boardWidth)) {
						potentialCells = [];
						break;
					} else
						potentialCells.push(index);
				} 
				else if (functionName === "right" && isIndexOnRightEdge(index, boardWidth)){
					if(isIndexOnRightEdge(index, boardWidth)) {
						potentialCells = [];
						break;
					} else
						potentialCells.push(index);
				}
				else if(functionName === "up") {
					if(isIndexOnTopEdge(index, boardWidth)) {
						potentialCells = [];
						break;
					} else
						potentialCells.push(index);
				}
				else if(functionName === "down" && isIndexOnBottomEdge(index, boardLength,boardWidth)){
					if (isIndexOnBottomEdge(index, boardLength,boardWidth)) {
						potentialCells = [];
						break;
					} else
						potentialCells.push(index);
				}
				else if(functionName === "upRight") {
					if(isIndexOnTopEdge(index, boardWidth) || isIndexOnRightEdge(index, boardWidth)) {
						potentialCells = [];
						break;
					} else
						potentialCells.push(index);
				}
				else if(functionName === "upLeft") {
					if (isIndexOnTopEdge(index, boardWidth) || isIndexOnLeftEdge(index, boardWidth)) {
						potentialCells = [];
						break;
					} else 
						potentialCells.push(index);
				}
				else if(functionName === "lowRight") {
					if(isIndexOnBottomEdge(index, boardLength, boardWidth) || isIndexOnRightEdge(index, boardWidth)) {
						potentialCells = [];
						break;
					} else
						potentialCells.push(index);
				}
				else if(functionName === "lowLeft") {
					if (isIndexOnBottomEdge(index, boardLength, boardWidth) || isIndexOnLeftEdge(index, boardWidth)) {
						potentialCells = [];
						break;
					} else
						potentialCells.push(index);
				}
				else
					potentialCells.push(index);
		}
		else if (hasLetter(board, index) && lastMoveLetter === board[index])
			break;
	}
	return potentialCells;
}

function indexToRowColPair(board ,indexArray) {
	let groups = [];
	if (indexArray.length === 0)
		return undefined;
	for(let index of indexArray) {
		let group = [];
		let obj = indexToRowCol(board, index);
		group.push(obj.row);
		group.push(obj.col);
		groups.push(group);
	}
	return groups;
}

function getCellsToFlip(board, lastRow, lastCol) {
	const lastMoveIndex = rowColToIndex(board, lastRow, lastCol);
	const lastMoveLetter = board[lastMoveIndex];
	const boardWidth = Math.sqrt(board.length);
	let flipCells = [];
	let leftFlip = [], rightFlip = [], upFlip = [], downFlip = [], upRightFlip = [], upLeftFlip = [], lowRightFlip = [], lowLeftFlip =[];

	const leftIndices = getLeftIndices(board, lastRow, lastCol, boardWidth);
	const rightIndices  = getRightIndices(board, lastRow, lastCol, boardWidth);
	const upIndices = getUpIndices(board, lastRow, lastCol, boardWidth);
	const downIndices = getDownIndices(board, lastRow, lastCol, boardWidth);
	const upperRightIndices = getUpperRightIndices(board, lastRow, lastCol, boardWidth);
	const upperLeftIndices = getUpperLeftIndices(board, lastRow, lastCol, boardWidth);
	const lowerRightIndices = getLowerRightIndices(board, lastRow, lastCol, boardWidth);
	const lowerLeftIndices = getLowerLeftIndices(board, lastRow, lastCol, boardWidth);

	leftFlip = potentialCells(board, leftIndices, lastMoveLetter, "left");
	rightFlip = potentialCells(board, rightIndices, lastMoveLetter, "right");
	upFlip = potentialCells(board, upIndices, lastMoveLetter, "up");
	downFlip = potentialCells(board, downIndices, lastMoveLetter, "down");
	upRightFlip = potentialCells(board, upperRightIndices, lastMoveLetter, "upRight");
	upLeftFlip = potentialCells(board, upperLeftIndices, lastMoveLetter, "upLeft");
	lowRightFlip = potentialCells(board, lowerRightIndices, lastMoveLetter, "lowRight");
	lowLeftFlip = potentialCells(board, lowerLeftIndices, lastMoveLetter, "lowLeft");

	leftFlip = indexToRowColPair(board, leftFlip);
	rightFlip = indexToRowColPair(board, rightFlip);
	upFlip = indexToRowColPair(board, upFlip);
	downFlip = indexToRowColPair(board, downFlip);
	upRightFlip = indexToRowColPair(board, upRightFlip);
	upLeftFlip = indexToRowColPair(board, upLeftFlip);
	lowRightFlip = indexToRowColPair(board, lowRightFlip);
	lowLeftFlip = indexToRowColPair(board, lowLeftFlip);

	let finalArray = [leftFlip, rightFlip, upFlip, downFlip, upRightFlip, upLeftFlip, lowRightFlip, lowLeftFlip];
	for(let value of finalArray) {
		if(value === undefined) {
			continue;
		}
		else
			flipCells.push(value);
	}
	return flipCells;
}


function isValidMove(board, letter, row, col) {
	const moveIndex = rowColToIndex(board, row, col);
	if(moveIndex < 0 && moveIndex >= board.length)
		return false;
	else if(hasLetter(board, moveIndex))
		return false;
	else {
		board[moveIndex] = letter;
		const flipCells = getCellsToFlip(board, row, col);
		if(flipCells.length === 0) {
			board[moveIndex] = " ";
			return false;
		} else {
			board[moveIndex] = " ";
			return true;
		}

	}
}

function isValidMoveAlgebraicNotation(board, letter, algebraicNotation) {
	const obj = algebraicToRowCol(algebraicNotation);
	return isValidMove(board, letter, obj.row, obj.col);
}

function getLetterCounts(board) {
	let countX = 0, countO = 0;
	let obj = {X:countX, O:countO};
	for(let i = 0; i < board.length; i++) {
		if(board[i] === ' ')
			continue
		else if(board[i] === 'X')
			countX++;
		else if(board[i] === 'O')
			countO++;
	}
	obj.X = countX;
	obj.O = countO;
	return obj;
}

function getValidMoves(board, letter) {
	let validMoves = [];
	for(let i = 0; i < board.length; i++) {
		let obj = indexToRowCol(board, i);
		if(isValidMove(board, letter, obj.row, obj.col)) {
			let validPair = [obj.row, obj.col];
			validMoves.push(validPair);
		}
	}
	return validMoves;
}

function getCenterIndices(boardWidth) {
	const firstRowIndex = (boardWidth/2) - 1;
	const secondRowIndex = firstRowIndex + 1;
	return {
		player1: [[firstRowIndex, firstRowIndex],[secondRowIndex, secondRowIndex]],
		player2: [[firstRowIndex, firstRowIndex+1],[secondRowIndex, secondRowIndex-1]]
	}
}

function userRun(bard) {

}

function computerRun(board) {

}

module.exports = {
    repeat: repeat,
    generateBoard: generateBoard,
    rowColToIndex: rowColToIndex,
    indexToRowCol: indexToRowCol,
    setBoardCell: setBoardCell,
    algebraicToRowCol: algebraicToRowCol,
    placeLetters: placeLetters,
   	boardToString: boardToString,
    isBoardFull: isBoardFull,
    flip: flip,
    flipCells: flipCells,
    getCellsToFlip: getCellsToFlip,
    isValidMove: isValidMove,
    isValidMoveAlgebraicNotation: isValidMoveAlgebraicNotation,
    getLetterCounts: getLetterCounts,
    getValidMoves: getValidMoves,
    getCenterIndices: getCenterIndices,
    rowColToAlgebraic: rowColToAlgebraic,
}