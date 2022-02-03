var winningValues = [
    ['0-0', '1-1', '2-2'],
    ['0-2', '1-1', '2-0'],

    ['0-0', '1-0', '2-0'],
    ['0-1', '1-1', '2-1'],
    ['0-2', '1-2', '2-2'],

    ['0-0', '0-1', '0-2'],
    ['1-0', '1-1', '1-2'],
    ['2-0', '2-1', '2-2']
];

var currentPlayer = "X"; //current player (X or O) - X starts
var nextPlayer = "O";
var gameOver = false;
var xWon = false;
var oWon = false;
var draw = false;
var totalClickedCells = 0;

//create cells
for (var row = 0; row < 3; row++) {
    for (var column = 0; column < 3; column++) {
        var div = document.createElement('div');
        var divId = row + '-' + column;
        div.id = divId; //gives it id row-col eg 0-0 for first one top left
        div.classList.add('cell'); //all cells must have this
        div.classList.add('clickable'); //only unclicked cells must have this
        div.onclick = clickHandler;

        document.getElementById("game-board").appendChild(div);
    }
}

function clickHandler() {
    var rowcol = this.id.split("-");
    var row = rowcol[0];
    var col = rowcol[1];
    var clickedCell = document.getElementById(this.id);

    //no one won yet, right? 
    if(!gameOver) {
        //is cell clickable (has not been clicked before) ?
        if (clickedCell.classList.contains('clickable')) {
            //update cell click tracker
            totalClickedCells++;

            //register current player's move into cell
            clickedCell.classList.add(currentPlayer);
            
            //update board
            updateBoard(clickedCell);
            
            //check if any player won
            var xCollection = Array.from(document.getElementsByClassName("X"));
            var oCollection = Array.from(document.getElementsByClassName("O"));
            if(xCollection.length > 2) {
                checkWinner(xCollection, oCollection);
            }

            //change current player into the other player
            checkPlayerTurn(currentPlayer); //check which player is next
            const paragraph = document.getElementById("win-announcement");
            paragraph.innerHTML = nextPlayer + '\'s turn';
            currentPlayer = nextPlayer; //change player for next round

            //do this if game over
            if(gameOver) {
                console.log("Game over");
                const paragraph = document.getElementById("win-announcement");
                if(xWon) {
                    paragraph.innerHTML = "Winner: X";
                } else if (oWon) {
                    paragraph.innerHTML = "Winner: O";
                } else if (draw) {
                    paragraph.innerHTML = "It's a draw!";
                }
            }
    
            
    
            //make cell unclickable
            clickedCell.classList.remove('clickable');
            //console.log(row, col);
        
        
        
        
        } else { //if cell is not clickable
            //do nothing
            console.log('cell has already been clicked');
        }
    } else {
        //game over, what to do here?

    }
}

function updateBoard(clickedCell) {
    var img = document.createElement('img');
            if(currentPlayer === "X") {
                img.src = 'img/x.png';
                img.classList.add('x');
            } else {
                img.src = 'img/o.png';
                img.classList.add('o');
            }
            img.classList.add('xo');
            clickedCell.appendChild(img);
}

function makeCellsUnclickable() {
    var cellCollection = Array.from(document.getElementsByClassName("clickable"));
        cellCollection.forEach(element => { 
            document.getElementById(element.id).classList.remove("clickable");
        });
}

function checkWinner(xCollection, oCollection) {
    //Did X win?
    const xIds = xCollection.map(element => {
        return element.id
    });

    for(var i = 0; i < winningValues.length; i++){
        var xWinner = 0;
        xIds.forEach(element => {
            for (var j = 0; j < 3; j++) {
                if(element === winningValues[i][j]) { // checks each x id against the winning values (by row)
                    xWinner++; //counts how many winning values the x has from that row inside winningvalues
                }
            }
            
        })
        if(xWinner === 3) {
            xWon = true;
            gameOver = true;
            makeCellsUnclickable();
            break;
        }
    };

    //Did O win?
    const oIds = oCollection.map(element => {
        return element.id
    });

    for(var i = 0; i < winningValues.length; i++){
        var oWinner = 0;
        oIds.forEach(element => {
            for (var j = 0; j < 3; j++) {
                if(element === winningValues[i][j]) { // checks each o id against the winning values (by row)
                    oWinner++; //counts how many winning values the o has from that row inside winningvalues
                }
            }
            
        })
        if(oWinner === 3) {
            oWon = true;
            gameOver = true;
            makeCellsUnclickable();
            break;
        }
    };

    //Draw?
    if (totalClickedCells === 9 && !xWon && !oWon) {
        draw = true;
        gameOver = true;
        makeCellsUnclickable();
    }
    

}

function checkPlayerTurn(currentPlayer) {
    if(currentPlayer === "X") {
        nextPlayer = "O";
    } else if (currentPlayer === "O") {
        nextPlayer = "X";
    } else {
        console.log("Player can only be X or O. Something went wrong.");
    }
}