const FIELDVALUE_EMPTY = 0;
const FIELDVALUE_X = 1;
const FIELDVALUE_O = 2;

const fieldsToWin = [
    [0, 1, 2],              
    [3, 4, 5],              //Horizontal
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],              //Vertical
    [2, 5, 8],

    [0, 4, 8],              
    [6, 4, 2]               //Diagonal
];






let player = FIELDVALUE_X;


let fieldValues = []; //Array für Status der Felder
for (i = 0; i <= 8; i++) {
    fieldValues[i] = FIELDVALUE_EMPTY 
};
console.log(fieldValues);
function init() {
    // start punkt
    updateDivPositions();
    addClickEventListener();
}


function updateDivPositions() {    

    var block1 = document.getElementById('block1');
    block1.style.left = '5px';
    block1.style.top = '5px';
    
    var block2 = document.getElementById('block2');
    block2.style.left = '205px';
    block2.style.top = '5px';
    
    var block3 = document.getElementById('block3');
    block3.style.left = '405px';
    block3.style.top = '5px';
    
    var block4 = document.getElementById('block4');
    block4.style.left = '5px';
    block4.style.top = '205px';
    
    var block5 = document.getElementById('block5');
    block5.style.left = '205px';
    block5.style.top = '205px';
    
    var block6 = document.getElementById('block6');
    block6.style.left = '405px';
    block6.style.top = '205px';
    
    var block7 = document.getElementById('block7');
    block7.style.left = '5px';
    block7.style.top = '405px';
    
    var block8 = document.getElementById('block8');
    block8.style.left = '205px';
    block8.style.top = '405px';
    
    var block9 = document.getElementById('block9');
    block9.style.left = '405px';
    block9.style.top = '405px';
};


function addClickEventListener() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById('block'+i).onclick = function(e) {
            
            onBlockClick(e.currentTarget.id);
            
        };
    };
};


function helperBlockIDtoIndex(blockId) {
    
    return parseInt(blockId[5]) - 1;
};






function onBlockClick(blockId) {
    let index = helperBlockIDtoIndex(blockId);
    console.log(index); ///////
    if (fieldValues[index] === FIELDVALUE_EMPTY) {
        let b = document.getElementById(blockId);
        if (player === FIELDVALUE_X) { 
            b.style.backgroundImage = "url('x.png')";
            fieldValues[index] = FIELDVALUE_X;
        } else {
            b.style.backgroundImage = "url('o.png')";
            fieldValues[index] = FIELDVALUE_O;
        }
        nextPlayer();
    } else {
        alert('Not valid!');
    }
    updateStatusDisplay();
};


function nextPlayer () { 
if(player === FIELDVALUE_X) {
    player = FIELDVALUE_O;
} else { 
    player = FIELDVALUE_X;
    }
};


function fieldValueNotEmpty (currentValue) {  // für unten
    if (currentValue !== 0) {
        return true;
    } else {
        return false;
    }
};


function fieldComplete () {
    if (fieldValues.every(fieldValueNotEmpty) === true) {  //funktioniert irgendwie nicht
        return true;
    }  else {
        return false;
    }  
}


function getWinner() {
    
    if (checkWin(FIELDVALUE_X) === true) {
        return FIELDVALUE_X;
    } else if (checkWin(FIELDVALUE_O) === true) {
        return FIELDVALUE_O;
    } else {
        return undefined; 
    }
}

function updateStatusDisplay() {
    let output = '';
    let winner = ''; 
    if (getWinner() === FIELDVALUE_X) {
        winner = 'Player X wins!';
    } else if (getWinner() === FIELDVALUE_O) {
        winner = 'Player O wins!';
    } else {
        winner = '';
    }
    document.getElementById('winner').innerText = winner;


    if (fieldComplete() === true) { //man muss nicht true hinschreiben
        output = 'Game Over!';
    } else if (player === FIELDVALUE_O) {
        output = 'Current Player: Player O';
    } else if (player === FIELDVALUE_X) {
        output = 'Current Player: Player X';
    };
    document.getElementById('playerDisplay').innerText = output;
    
};




function checkWin(actPlayer) {
    for (i = 0; i < fieldsToWin.length; i++) {
        console.log(fieldsToWin[i]);
        if (fieldsToWin[i].every(x => fieldValues[x] == actPlayer)) { 
            return true;
        } 
    }
    return false;
};

checkWin(FIELDVALUE_X);