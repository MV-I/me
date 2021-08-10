var rows = 50;
var cols = 50;

var started = false; // Set to true when use clicks start

// 1d arrays, these need to be made 2d
var currGen = new Array(rows);
var nextGen = new Array(rows);
var timer;  //timer to control evolutions
var evolutionSpeed = 100; // One second between generations

function initializeGrids() {
    for (var i = 0; i < rows; i++) {
        currGen[i] = new Array(cols);
        nextGen[i] = new Array(cols);
    }
}

function resetGrids() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            currGen[i][j] = 0;
            nextGen[i][j] = 0;
        }
    }
}

function copyAndResetGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            currGen[i][j] = nextGen[i][j];
            nextGen[i][j] = 0;
        }
    }
}

// this function starts the program
function initialize() {
    createTable();
    initializeGrids();
    resetGrids();
    setupControlButtons();
}

// this function lays out the board
function createTable() {
    var gridContainer = document.getElementById('gridContainer');
    var table = document.createElement("table");
    
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < cols; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    
    gridContainer.appendChild(table);
}

//Making Cells Come Alive
function cellClickHandler() {
    var rowcol = this.id.split("_");
    var row = rowcol[0];
    var col = rowcol[1];
    
    var classes = this.getAttribute("class");
    if(classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead"); // sets class to dead on click
        currGen[row][col] = 0;
    } else {
        this.setAttribute("class", "live"); // sets class to alive on click
        currGen[row][col] = 1;
    }
    
}

function setupControlButtons() {
    // start button
    var startButton = document.getElementById('start');
    startButton.onclick = startButtonHandler;
    
    // next step button
    var nextButton = document.getElementById('next');
    nextButton.onclick = nextButtonHandler;
    
    // clear button
    var clearButton = document.getElementById('clear');
    clearButton.onclick = clearButtonHandler;
    
    // random button (sets random initial status (dead/alive))
    var randomButton = document.getElementById("random");
    randomButton.onclick = randomButtonHandler;

}

function nextButtonHandler() {
    if (started) {
        started = false;
        document.getElementById('start').innerHTML = "Continue";
        clearTimeout(timer);
    }
    computeNextGen();
    updateView();
}

function randomButtonHandler() {
    if (started) return;
    clearButtonHandler();
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var isLive = Math.round(Math.random());
            if (isLive == 1) {
                var cell = document.getElementById(i + "_" + j); //each cell has an id: row_column e.g. 5_5
                cell.setAttribute("class", "live"); //each cell has a class of dead initially, which can be changed later on
                currGen[i][j] = 1;
            }
        }
    }
}

// clear the grid
function clearButtonHandler() {
    started = false;
    var startButton = document.getElementById('start');
    startButton.innerHTML = "Start";
    clearTimeout(timer);
    
    var cellsList = document.getElementsByClassName("live");
    // convert to array first
    var cells = [];
    for (var i = 0; i < cellsList.length; i++) {
        cells.push(cellsList[i]);
    }
    
    for (var i = 0; i < cells.length; i++) {
        cells[i].setAttribute("class", "dead");
    }
    resetGrids();
}

//updates the visual display of this world
function updateView() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var cell = document.getElementById(i + "_" + j);
            if (currGen[i][j] == 0) {
                cell.setAttribute("class", "dead"); // sets class to dead on update
            } else {
                cell.setAttribute("class", "live"); // sets class to alive on update
            }
        }
    }
}


// start/pause/continue the game
function startButtonHandler() {
    var cellList = document.getElementsByClassName('live');
    if(cellList.length != 0) {
        if (started) {
            started = false;
            this.innerHTML = "Continue";
            clearTimeout(timer);
        } else {
            started = true;
            this.innerHTML = "Pause";
            play();
        }
    }
}

//this gets called from the start button
function play() {
    computeNextGen();
    
    if (started) {
        timer = setTimeout(play, evolutionSpeed);
    }
}

//loops through each cell, gets the neighbor with getNeighborCount() and uses the rules to determine if the cell should stay alive, stay dead,, die, or come alive
function computeNextGen() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            applyRules(i, j);
        }
    }
    
    // copy nextGen to currGen, reset nextGen
    copyAndResetGrid();
    // copy all 1 values in the table
    updateView();
}

//Apply the rules
function applyRules(row, col) {
    var numNeighbors = getNeighborCount(row, col);
    if (currGen[row][col] == 1) {
        if (numNeighbors < 2) {
            nextGen[row][col] = 0;
        } else if (numNeighbors == 2 || numNeighbors == 3) {
            nextGen[row][col] = 1;
        } else if (numNeighbors > 3) {
            nextGen[row][col] = 0;
        }
    } else if (currGen[row][col] == 0) {
            if (numNeighbors == 3) {
                nextGen[row][col] = 1;
            }
        }
    }
    
function getNeighborCount(row, col) {
    var count = 0;
    if (row-1 >= 0) { 
        if (currGen[row-1][col] == 1) count++;
    }
    if (row-1 >= 0 && col-1 >= 0) { 
        if (currGen[row-1][col-1] == 1) count++;
    }
    if (row-1 >= 0 && col+1 < cols) {
        if (currGen[row-1][col+1] == 1) count++;
    }
    if (col-1 >= 0) {
        if (currGen[row][col-1] == 1) count++;
    }
    if (col+1 < cols) {
        if (currGen[row][col+1] == 1) count++;
    }
    if (row+1 < rows) {
        if (currGen[row+1][col] == 1) count++;
    }
    if (row+1 < rows && col-1 >= 0) {
        if (currGen[row+1][col-1] == 1) count++;
    }
    if (row+1 < rows && col+1 < cols) {
        if (currGen[row+1][col+1] == 1) count++;
    }
    return count; //returns sum of neighbors
}

// Start everything
window.onload = initialize;