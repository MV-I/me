var rows = 50;
var cols = 50;

window.mobileCheck = function() {
    let mobile = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) mobile = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return mobile;
};

// if user is using mobile, make field smaller
if(mobileCheck()) {
    rows = 25;
    cols = 25;
}


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