var gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

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
            //update cell
            (row + '-' + col);
    
            //register current player's move into cell
            clickedCell.classList.add(currentPlayer);
            clickedCell.innerHTML = currentPlayer;
            
            //update board
            var img = document.createElement('img');
            if(currentPlayer === "X") {
                img.src = 'img/x.png';
            } else {
                img.src = 'img/o.png';
            }
            img.classList.add('xo');
            clickedCell.appendChild(img);
            
            //check if any player won
            var parent = Array.from(document.getElementsByClassName("X"));
            const ids = parent.map(element => {
                return element.id
            });
                //console.log(ids);
            for(var i = 0; i < winningValues.length; i++){
                var winner = 0;
                ids.forEach(element => {
                    for (var j = 0; j < 3; j++) {
                        if(element === winningValues[i][j]) {
                            //console.log('same' + element + 'winVal' + winningValues[i][j]);
                            winner++;
                        }
                        console.log(winner);
                    }
                    
                })
                if(winner === 3) {
                    gameOver = true;
                    break;
                }
            };
            if(gameOver) {
                console.log("Game over");
            }
    
            //change current player into the other player
            checkPlayerTurn(currentPlayer); //check which player is next
            currentPlayer = nextPlayer; //change player
    
            //make cell unclickable
            clickedCell.classList.remove('clickable');
            //console.log(row, col);
        
        
        
        
        } else { //if cell is not clickable
            //do nothing
            console.log('cell has already been clicked');
        }
    } else {
        const paragraph = document.createElement("p");
        paragraph.innerHTML= "Someone won!";
        document.getElementById('main-container').appendChild(paragraph);

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