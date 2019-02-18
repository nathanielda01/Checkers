/**
 *  @file model.js
 *  @brief Provides the variables and functions necessary to give the model of 
 *  a checker app
 */
// BOARD SETUP //
const MIN_ROWS_AND_COLS = 0;
const MAX_ROWS_AND_COLS = 8;

// Game state board setup 2D array //
// board[8][8]
// if (board[i][j] == 1) {checkerPiece.isWhite = true;}
// else if (board[i][j] == 2) {checkerPiece.isWhite = false;}
// else {<code to make square unselectable>}
var board = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
];

// Logic to only make pieces selectable based on playerTurn number (1 or 2)
var playerTurn = 1;

function turnChange(playerTurn) {
	'use strict'
	
	var redPieces = document.getElementsByClassName("r_piece");
	var whitePieces = document.getElementsByClassName("w_piece");
	
	if (playerTurn == 1) {
		
	} else if (playerTurn == 2) {
		
	}
}

// If board has no 1s or 2s isGameOver = true and opposing number wins game
var isGameOver = false;

// Board Methods //

/**
 *  @brief getSquare func grabs the contents of a cell in the board array
 *  
 *  @param [in] row the row coordinate of "board"
 *  @param [in] col the column cordinate of "board"
 *  @return Contents of "board" at indicated "row" and "col" positions
 *  
 *  @details None
 */
function getSquare(row, col) {
	'use strict'
	
	return board[row][col];
}

/**
 *  @brief newGame() func resets the board
 *  
 *  @return None
 *  
 *  @details Changes "board" var so pieceIDs are returned to start position,
 *  calls piecesOnBoard() func to turn pieceIDs into checkerPiece objects
 */
function newGame() {
	'use strict'
	
	deletePieces();
	
	board = [
		[2, 0, 2, 0, 2, 0, 2, 0],
		[0, 2, 0, 2, 0, 2, 0, 2],
		[2, 0, 2, 0, 2, 0, 2, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 0, 1, 0, 1, 0, 1],
		[1, 0, 1, 0, 1, 0, 1, 0],
		[0, 1, 0, 1, 0, 1, 0, 1]
	];
	
	genPieces();
}

/**
 *  @brief checkerPiece object constructor
 *  
 *  @param [in] pieceID pieceID read from "board" var
 *  @return N/A
 *  
 *  @details Determines piece color based on pieceID and whether piece is 
 *  a king
 */
function checkerPiece(pieceID) {
	'use strict'
	
	if (pieceID == 1) 
		this.isWhite = true;
	else if (pieceID == 2) 
		this.isWhite = false;
		
	this.pieceID = pieceID;
	this.isKing = false;
}

function kingPiece(checkerPiece) {
	'use strict'
	
	if (checkerPiece.isWhite && (board[0][0].pieceID == 1 || board[0][2].pieceID == 1 || board[0][4].pieceID == 1 || board[0][6].pieceID == 1)) {
		checkerPiece.isKing = true;
	} else if (!checkerPiece.isWhite && (board[7][1].pieceID == 2 || board[7][3].pieceID == 2 || board[7][5].pieceID == 2 || board[7][7].pieceID == 2)) {
		checkerPiece.isKing = true;
	}
}



/**
 *  @brief piecesOnBoard() func converts pieceIDs from "board" array into 
 *  checkerPiece objects
 *  
 *  @return None
 *  
 *  @details If the number in "board" array isn't 0 then a checkerPiece object
 *  will be put in place of the number
 */
function piecesOnBoard() {
	'use strict'
	
	var square;
	
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			square = getSquare(i, j);
			if (square != 0) {
				board[i][j] = new checkerPiece(square);
			}
		}
	}
}

/**
 *  @brief Creates an onclick event handler for any square on game board 
 *  clicked
 *  
 *  @return None 
 *  
 *  @details Iterates through an array of all "td" elements in the html
 *  if one of those elements is clicked. Coordinates of white and black 
 *  cells are displayed. White cells are not highlighted since game
 *  is played on black squares
 */
function clickSquare() {
	'use strict'
	
	// Variable to access squares on game board
	var boardSquares = document.getElementsByTagName("td");
	var max = boardSquares.length;
	var table = document.getElementById("checkerGrid");

	// Event Handler
	for (var i = 0; i < max; i++) {
		if (boardSquares[i].className != "w") {
			boardSquares[i].onclick = function() {
				var col = this.cellIndex;
				var row = this.parentNode.rowIndex;
				var cell = table.rows[row].cells[col];
				cellSelect(cell);
				cellCoordinates(row, col);
				checkMoves(row, col);
			};
		} else {
			boardSquares[i].onclick = function() {
				var col = this.cellIndex;
				var row = this.parentNode.rowIndex;
				cellCoordinates(row, col);
			};
		}
	}

}

/**
 *  @brief deletePieces clears the board to prepare for new game
 *  
 *  @return None
 *  
 *  @details None
 */
function deletePieces() {
	'use strict'
	
	var gameBoard = document.getElementsByTagName("td");
	var gBLength = gameBoard.length;
	
	for (var i = 0; i < gBLength; i++) {
		if (gameBoard[i].hasChildNodes()) {
			gameBoard[i].removeChild(gameBoard[i].firstChild);
		}
	}
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (board[i][j] != 0) {
				board[i][j] = board[i][j].pieceID;
			}
		}
	}
}

//				GAME LOGIC					//

function checkMoves(row, col) {
	'use strict'
	
	var checkerToMove = getSquare(row, col);
	var move1, move2, move3, move4;
	var table = document.getElementById("checkerGrid");

	if (checkerToMove.isWhite && playerTurn == 1 && !checkerToMove.isKing) {
		move1 = moveLU(row, col);
		move2 = moveRU(row, col);
		
		if (move1 != -1)
			whiteMoveLeft(checkerToMove, move1, row, col, table);
		if (move2 != -1)
			whiteMoveRight(checkerToMove, move2, row, col, table);
		playerTurn = 2;
		
	} else if (!checkerToMove.isWhite && playerTurn == 2 && !checkerToMove.isKing) {
		move1 = moveLD(row, col);
		move2 = moveRD(row, col);

		if (move1 != -1)
			blackMoveLeft(checkerToMove, move1, row, col, table);
		if (move2 != -1)
			blackMoveRight(checkerToMove, move2, row, col, table);
		playerTurn = 1;
	} else if (checkerToMove.isWhite && playerTurn == 1 & checkerToMove.isKing) {
		move1 = moveLD(row, col);
		move2 = moveRD(row, col);
		move3 = moveLU(row, col);
		move4 = moveRU(row, col);

		if (move1 != -1)
			kingMoveUpLeft(checkerToMove, move3, row, col, table);
		if (move2 != -1)
			kingMoveUpRight(checkerToMove, move4, row, col, table);
		if (move1 != -1)
			kingMoveDownLeft(checkerToMove, move1, row, col, table);
		if (move2 != -1)
			kingMoveDownRight(checkerToMove, move2, row, col, table);
		playerTurn = 2;
	}
}

function moveRU(row, col) {
	'use strict'
	
	row -= 1;
	col += 1;
	
	if (row < MAX_ROWS_AND_COLS && row >= MIN_ROWS_AND_COLS && col < MAX_ROWS_AND_COLS && col >= MIN_ROWS_AND_COLS) {
		return board[row][col];
	} else {
		return -1;
	}
}

function moveLU(row, col) {
	'use strict'
	
	row -= 1;
	col -= 1;
	
	if (row < MAX_ROWS_AND_COLS && row >= MIN_ROWS_AND_COLS && col < MAX_ROWS_AND_COLS && col >= MIN_ROWS_AND_COLS) {
		return board[row][col];
	} else {
		return -1;
	}
}

function moveRD(row, col) {
	'use strict'
	
	row += 1;
	col += 1;
	
	if (row < MAX_ROWS_AND_COLS && row >= MIN_ROWS_AND_COLS && col < MAX_ROWS_AND_COLS && col >= MIN_ROWS_AND_COLS) {
		return board[row][col];
	} else {
		return -1;
	}
}

function moveLD(row, col) {
	'use strict'
	
	row += 1;
	col -= 1;
	
	if (row < MAX_ROWS_AND_COLS && row >= MIN_ROWS_AND_COLS && col < MAX_ROWS_AND_COLS && col >= MIN_ROWS_AND_COLS) {
		return board[row][col];
	} else {
		return -1;
	}
}

function whiteMoveLeft(checkerToMove, move1, row, col, table) {
	'use strict'
	
	if (move1 == 0) {
		var m1r = row - 1;
		var m1c = col - 1;

		var cell1 = table.rows[m1r].cells[m1c];
		affirmMove(cell1); 
		cell1.onclick = function() {
			board[m1r][m1c] = checkerToMove;
			board[row][col] = 0;
			kingPiece(checkerToMove);
			deletePieces();
			genPieces();
			resetBoardColors();
		};
	}
	if (move1.pieceID == 2) {
		var m1r = row - 2;
		var m1c = col - 2;
		
		var opponentRow = row - 1;
		var opponentCol = col - 1;
		if ((row > MAX_ROWS_AND_COLS && row <= MIN_ROWS_AND_COLS && col > MAX_ROWS_AND_COLS && col <= MIN_ROWS_AND_COLS)) {
			var cell1 = table.rows[m1r].cells[m1c];
			
			console.log(cell1.firstChild);

			if (getSquare(m1r, m1c) == 0)
				affirmMove(cell1); 
			cell1.onclick = function() {
				board[m1r][m1c] = checkerToMove;
				board[row][col] = 0;
				board[opponentRow][opponentCol] = 0;
				kingPiece(checkerToMove);
				if (checkerToMove.isKing) {
					console.log(cell1.firstChild);
					kingVisual(cell1.firstChild);
				}
				deletePieces();
				genPieces();
				resetBoardColors();
				declareWin();
			};
		}
	}
}

function whiteMoveRight(checkerToMove, move2, row, col, table) {
	'use strict'
	
	if (move2 == 0) {
		var m2r = row - 1;
		var m2c = col + 1;

		var cell2 = table.rows[m2r].cells[m2c];
		affirmMove(cell2);
		cell2.onclick = function() {
			board[m2r][m2c] = checkerToMove;
			board[row][col] = 0;
			kingPiece(checkerToMove);
			if (checkerToMove.isKing) {
				kingVisual(cell1.firstChild);
			}
			deletePieces();
			genPieces();
			resetBoardColors();
		};
	}
	if (move2.pieceID == 2) {
		var m2r = row - 2;
		var m2c = col + 2;

		var opponentRow = row - 1;
		var opponentCol = col + 1;
		
		if ((row > MAX_ROWS_AND_COLS && row <= MIN_ROWS_AND_COLS && col > MAX_ROWS_AND_COLS && col <= MIN_ROWS_AND_COLS)) {
			var cell2 = table.rows[m2r].cells[m2c];
			
			
			if (getSquare(m2r, m2c) == 0)
				affirmMove(cell2);
			cell2.onclick = function() {
				board[m2r][m2c] = checkerToMove;
				board[row][col] = 0;
				board[opponentRow][opponentCol] = 0;
				kingPiece(checkerToMove);
				if (checkerToMove.isKing) {
					kingVisual(cell1.firstChild);
				}
				deletePieces();
				genPieces();
				resetBoardColors();
				declareWin();
			};
		}
	}
}

function blackMoveLeft(checkerToMove, move1, row, col, table) {
	'use strict'
	
	if (move1 == 0) {
		var m1r = row + 1;
		var m1c = col - 1;

		var cell1 = table.rows[m1r].cells[m1c];
		affirmMove(cell1); 
		cell1.onclick = function() {
			board[m1r][m1c] = checkerToMove;
			board[row][col] = 0;
			kingPiece(checkerToMove);
			if (checkerToMove.isKing) {
				kingVisual(cell1.firstChild);
			}
			deletePieces();
			genPieces();
			resetBoardColors();
		};
	}
	if (move1.pieceID == 1) {
		var m1r = row + 2;
		var m1c = col - 2;
		
		var opponentRow = row + 1;
		var opponentCol = col - 1;
		

		if ((row > MAX_ROWS_AND_COLS && row <= MIN_ROWS_AND_COLS && col > MAX_ROWS_AND_COLS && col <= MIN_ROWS_AND_COLS)) {
			var cell1 = table.rows[m1r].cells[m1c];
		
		
			if (getSquare(m1r, m1c) == 0)
				affirmMove(cell1); 
			cell1.onclick = function() {
				board[m1r][m1c] = checkerToMove;
				board[row][col] = 0;
				board[opponentRow][opponentCol] = 0;
				kingPiece(checkerToMove);
				if (checkerToMove.isKing) {
					kingVisual(cell1.firstChild);
				}
				deletePieces();
				genPieces();
				resetBoardColors();
				declareWin();
			};
		}
	}
}

function blackMoveRight(checkerToMove, move2, row, col, table) {
	'use strict'
	
	if (move2 == 0) {
		var m2r = row + 1;
		var m2c = col + 1;

		var cell2 = table.rows[m2r].cells[m2c];
		affirmMove(cell2);
		cell2.onclick = function() {
			board[m2r][m2c] = checkerToMove;
			board[row][col] = 0;
			kingPiece(checkerToMove);
			if (checkerToMove.isKing) {
				kingVisual(cell1.firstChild);
			}
			deletePieces();
			genPieces();
			resetBoardColors();
		};
	}
	if (move2.pieceID == 1) {
		var m2r = row + 2;
		var m2c = col + 2;
		
		if ((row > MAX_ROWS_AND_COLS && row <= MIN_ROWS_AND_COLS && col > MAX_ROWS_AND_COLS && col <= MIN_ROWS_AND_COLS)) {
			var cell2 = table.rows[m2r].cells[m2c];
		
		
			var opponentRow = row + 1;
			var opponentCol = col + 1;

			if (getSquare(m2r, m2c) == 0)
				affirmMove(cell2);
			cell2.onclick = function() {
				board[m2r][m2c] = checkerToMove;
				board[row][col] = 0;
				board[opponentRow][opponentCol] = 0;
				kingPiece(checkerToMove);
				if (checkerToMove.isKing) {
					kingVisual(cell1.firstChild);
				}
				deletePieces();
				genPieces();
				resetBoardColors();
				declareWin();
			};
		}
	}
}

function kingMoveUpLeft(checkerToMove, move1, row, col, table) {
	'use strict'
	
	if (move1 == 0) {
		var m1r = row - 1;
		var m1c = col - 1;

		var cell1 = table.rows[m1r].cells[m1c];
		affirmMove(cell1); 
		cell1.onclick = function() {
			board[m1r][m1c] = checkerToMove;
			board[row][col] = 0;
			kingPiece(checkerToMove);
			deletePieces();
			genPieces();
			resetBoardColors();
		};
	}
	if (move1.pieceID == 2) {
		var m1r = row - 2;
		var m1c = col - 2;
		
		var opponentRow = row - 1;
		var opponentCol = col - 1;

		var cell1 = table.rows[m1r].cells[m1c];

		if (getSquare(m1r, m1c) == 0)
			affirmMove(cell1); 
		cell1.onclick = function() {
			board[m1r][m1c] = checkerToMove;
			board[row][col] = 0;
			board[opponentRow][opponentCol] = 0;
			kingPiece(checkerToMove);
			if (checkerToMove.isKing) {
				kingVisual(cell1.firstChild);
			}
			deletePieces();
			genPieces();
			resetBoardColors();
			declareWin();
		};
	}
}

function kingMoveUpRight(checkerToMove, move2, row, col, table) {
	'use strict'
	
	if (move2 == 0) {
		var m2r = row - 1;
		var m2c = col + 1;

		var cell2 = table.rows[m2r].cells[m2c];
		affirmMove(cell2);
		cell2.onclick = function() {
			board[m2r][m2c] = checkerToMove;
			board[row][col] = 0;
			kingPiece(checkerToMove);
			if (checkerToMove.isKing) {
				kingVisual(cell1.firstChild);
			}
			deletePieces();
			genPieces();
			resetBoardColors();
		};
	}
	if (move2.pieceID == 2) {
		var m2r = row - 2;
		var m2c = col + 2;

		var opponentRow = row - 1;
		var opponentCol = col + 1;
		
		var cell2 = table.rows[m2r].cells[m2c];
		
		if (getSquare(m2r, m2c) == 0)
			affirmMove(cell2);
		cell2.onclick = function() {
			board[m2r][m2c] = checkerToMove;
			board[row][col] = 0;
			board[opponentRow][opponentCol] = 0;
			kingPiece(checkerToMove);
			if (checkerToMove.isKing) {
				kingVisual(cell1.firstChild);
			}
			deletePieces();
			genPieces();
			resetBoardColors();
			declareWin();
		};
	}
}

function kingMoveDownLeft(checkerToMove, move1, row, col, table) {
	'use strict'
	
	if (move1 == 0) {
		var m1r = row + 1;
		var m1c = col - 1;

		var cell1 = table.rows[m1r].cells[m1c];
		affirmMove(cell1); 
		cell1.onclick = function() {
			board[m1r][m1c] = checkerToMove;
			board[row][col] = 0;
			kingPiece(checkerToMove);
			if (checkerToMove.isKing) {
				kingVisual(cell1.firstChild);
			}
			deletePieces();
			genPieces();
			resetBoardColors();
		};
	}
	if (move1.pieceID == 1) {
		var m1r = row + 2;
		var m1c = col - 2;
		
		var opponentRow = row + 1;
		var opponentCol = col - 1;
		

		var cell1 = table.rows[m1r].cells[m1c];
		
		if (getSquare(m1r, m1c) == 0)
			affirmMove(cell1); 
		cell1.onclick = function() {
			board[m1r][m1c] = checkerToMove;
			board[row][col] = 0;
			board[opponentRow][opponentCol] = 0;
			kingPiece(checkerToMove);
			if (checkerToMove.isKing) {
				kingVisual(cell1.firstChild);
			}
			deletePieces();
			genPieces();
			resetBoardColors();
			declareWin();
		};
	}
}

function kingMoveDownRight(checkerToMove, move2, row, col, table) {
	'use strict'
	
	if (move2 == 0) {
		var m2r = row + 1;
		var m2c = col + 1;

		var cell2 = table.rows[m2r].cells[m2c];
		affirmMove(cell2);
		cell2.onclick = function() {
			board[m2r][m2c] = checkerToMove;
			board[row][col] = 0;
			kingPiece(checkerToMove);
			if (checkerToMove.isKing) {
				kingVisual(cell1.firstChild);
			}
			deletePieces();
			genPieces();
			resetBoardColors();
		};
	}
	if (move2.pieceID == 1) {
		var m2r = row + 2;
		var m2c = col + 2;
		
		var cell2 = table.rows[m2r].cells[m2c];
		
		var opponentRow = row + 1;
		var opponentCol = col + 1;

		if (getSquare(m2r, m2c) == 0)
			affirmMove(cell2);
		cell2.onclick = function() {
			board[m2r][m2c] = checkerToMove;
			board[row][col] = 0;
			board[opponentRow][opponentCol] = 0;
			kingPiece(checkerToMove);
			if (checkerToMove.isKing) {
				kingVisual(cell1.firstChild);
			}
			deletePieces();
			genPieces();
			resetBoardColors();
			declareWin();
		};
	}
}

function resetBoardColors() {
	'use strict'
	
	var boardColor = getBoardDarkColor();
	var allSquares = document.getElementsByTagName('td');
	var allSquaresLen = allSquares.length;
	
	for (var i = 0; i < allSquaresLen; i++) {
		if (allSquares[i].className != 'w') {
			if (allSquares[i].className == "blue") {
				allSquares[i].className = "b";
			}
			allSquares[i].style.background = boardColor;
		}
	}
}

function declareWin() {
	'use strict'
	
	var redCount = 0;
	var whiteCount = 0;

	
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (board[i][j].pieceID == 1)
				whiteCount++;
			if (board[i][j].pieceID == 2)
				redCount++;
		}
	}
	console.log(whiteCount, redCount);
	if (redCount == 0 && whiteCount != 0)
		alert("WHITE wINS!!");
	else if (whiteCount == 0 && redCount != 0)
		alert("RED WINS!!");
}

//			AJAX FUNCTIONS		//
function displayLoggedIn() {
	'use strict'
	
	var infoDisplay = document.getElementById("nameAndTime");
	var nameAndTimestamp = localStorage.getItem('cs2550timestamp');
	infoDisplay.value = nameAndTimestamp;
}

function clearLocalStorage() {
	'use strict'
	
	
	var clearLocalStorageBtn = document.getElementById("clearLocalStorage");
	clearLocalStorageBtn.onclick = function() {
		
		while (localStorage.getItem('cs2550timestamp') != null)
		{
			localStorage.removeItem('cs2550timestamp');
		}
		document.getElementById("nameAndTime").value = null;
		
	}
}

//			XML FUNCTIONS		//
function loadSyncPost(option) {
	'use strict'

    var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if(this.readyState == 4){
			xmlBoards(this, option);
		}
	};

    // PASSING false AS THE THIRD PARAMETER TO open SPECIFIES SYNCHRONOUS
    xmlhttp.open("POST", "checkersSetup.xml", false);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function setupBtnHandlers() {
	'use strict'
	
	var option;

	var threeRowClick = document.getElementById("threeRowBtn");
	var twoRowClick = document.getElementById("twoRowBtn");
	var oneRowClick = document.getElementById("oneRowBtn");
	threeRowClick.onclick = function() {
		option = 0;
		deletePieces();
		loadSyncPost(option);
	}
	twoRowClick.onclick = function() {
		option = 1;
		deletePieces();
		loadSyncPost(option);
	}
	oneRowClick.onclick = function() {
		option = 2;
		deletePieces();
		loadSyncPost(option);
	}
}

function xmlBoards(xml, option) {

	var xmlDoc = xml.responseXML;
	var boards = xmlDoc.getElementsByTagName("board");
	var row;
	var parsedDataDiv = document.getElementById("parsedData");
	var parsedData = "";
	
	if(option == 0)
	{
		var rows = boards[option];
		
		for (var i = 0; i < 8; i++) {
			var row = rows.childNodes[(2 * i) + 1].innerHTML;
			parsedData += row;
			parsedData += "\n";
			for (var j = 0; j < 8; j++) {
				board[i][j] = row[j];
			}
		}
		genPieces();
		parsedDataDiv.innerHTML = parsedData;
	}
	if(option == 1)
	{
		var rows = boards[option];

		for (var i = 0; i < 8; i++) {
			var row = rows.childNodes[(2 * i) + 1].innerHTML; 
			parsedData += row;
			parsedData += "\n";
			for (var j = 0; j < 8; j++) {
				board[i][j] = row[j];
			}
		}
		genPieces();
		parsedDataDiv.innerHTML = parsedData;
	}
	if(option == 2)
	{
		var rows = boards[option];
		
		for (var i = 0; i < 8; i++) {
			var row = rows.childNodes[(2 * i) + 1].innerHTML; 
			parsedData += row;
			parsedData += "\n";
			for (var j = 0; j < 8; j++) {
				board[i][j] = row[j];
			}
		}
		genPieces();
		parsedDataDiv.innerHTML = parsedData;
	}
}
