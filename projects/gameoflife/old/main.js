const rows = 50;
const cols = 50;

let started = false; // Set to true when use clicks start
let timer; //timer to control evolutions
let evolutionSpeed = 500; // One second between generations

// 1d arrays, these need to be made 2d
let currGen = [rows];
let nextGen = [rows];

// this creates 2d arrays
function createGenArrays() {
    for (let i = 0; i < rows; i++) {
        currGen[i] = new Array(cols);
        nextGen[i] = new Array(cols);
    }
}
// Set all initial array locations to 0=dead
function initGenArrays() {
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            currGen[i][j] = 0;
            nextGen[i][j] = 0;
        }
    }
}

function createWorld() {

    let world = document.querySelector('#world');
    let tbl = document.createElement('table');

    tbl.setAttribute('id','worldgrid');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('id', i + '_' + j); //each cell has an id: row_column e.g. 5_5
            cell.setAttribute('class', 'dead'); //each cell has a class of dead initially, which can be changed later on
            cell.addEventListener('click', cellClick);

            tr.appendChild(cell);
        }
        tbl.appendChild(tr);
    }
    world.appendChild(tbl);
}

function cellClick() {
    let loc = this.id.split("_");
    let row = Number(loc[0]); // get i - gets id and separates with loc
    let col = Number(loc[1]);// get j - gets id and separates with loc

    //Toggle alive or dead state
    if (this.className === 'alive') {
        this.setAttribute('class', 'dead');
        currGen[row][col] = 0;
    } else {
        this.setAttribute('class', 'alive');
        currGen[row][col] = 1;
    }
}

//counts the number of neighbors for a given cell
function getNeighborCount(row, col) {
    let count = 0;
    let nrow = Number(row);
    let ncol = Number(col);

    //not the first row
    if (nrow - 1 >= 0) {
        //Check top neighbor
        if(currGen[nrow - 1][ncol] == 1) {
            count++;
        }
    }

    //not the first cell
    //upper left corner
    if (nrow - 1 >= 0 && ncol - 1 >= 0) {
        //Check upper left neighbor
        if (currGen[nrow - 1][ncol - 1] == 1) 
            count++;
    }

    //not the first row last column
    // Upper right corner
    if (nrow - 1 >= 0 && ncol + 1 < cols) {
        //Check upper right neighbor
            if (currGen[nrow - 1][ncol + 1] == 1) 
                count++;
    }

    // not the first column
    if (ncol - 1 >= 0) {
        //Check left neighbor
        if (currGen[nrow][ncol - 1] == 1) 
            count++;
    }

    // not the last column
    if (ncol + 1 < cols) {
        //Check right neighbor
        if (currGen[nrow][ncol + 1] == 1) 
            count++;
    }

    // not the bottom left corner
    if (nrow + 1 < rows && ncol - 1 >= 0) {
        //Check bottom left neighbor
        if (currGen[nrow + 1][ncol - 1] == 1) 
            count++;
    }

    // not the bottom right
    if (nrow + 1 < rows && ncol + 1 < cols) {
        //Check bottom right neighbor
        if (currGen[nrow + 1][ncol + 1] == 1) 
            count++;
    }

    //  not the last row
    if (nrow + 1 < rows) {
        //Check bottom neighbor
        if (currGen[nrow + 1][ncol] == 1) 
            count++;
    }

    return count; //returns sum of neighbors

}

//loops through each cell, gets the neighbor with getNeighborCount() and uses the rules to determine if the cell should stay alive, stay dead,, die, or come alive
function createNextGen() {
    for(row in currGen) {
        for(col in currGen[row]) {
            let neighbors = getNeighborCount(row, col);

            //Check the rules
            //if alive
            if (currGen[row][col] == 1) {
                if(neighbors < 2) {
                    nextGen[row][col] = 0;
                } else if (neighbors == 2 || neighbors == 3) {
                    nextGen[row][col] = 0;
                } else if (neighbors > 3) {
                    nextGen[row][col] = 0;
                }
            } else if (currGen[row][col] == 0) { //if dead or empty
                if(neighbors == 3) {
                    //propogate species
                    nextGen[row][col] = 1; // make cell alive
                }
            }
        }
    }
}

//takes nextGen array values and puts them in currGen array
function updateCurrGen() {
    for (row in currGen) {
        for (col in currGen[row]) {
            // Update the current generation with the results of createNextGen function
            currGen[row][col] = nextGen[row][col];
            // Set nextGen back to empty
            nextGen[row][col] = 0;
        }
    }
}

//updates the visual display of this world
function updateWorld() {
    let cell='';
        for (row in currGen) {
            for (col in currGen[row]) {
                cell = document.getElementById(row + '_' + col);
                if (currGen[row][col] == 0) {
                    cell.setAttribute('class', 'dead');
                } else {
                    cell.setAttribute('class', 'alive');
                }
            }
        }
}

//this gets called from the start button
function evolve() {
    createNextGen();//Apply the rules
    updateCurrGen();//Set Current values from new generation
    updateWorld();//Update the world view

    if(started) {
        timer = setTimeout(evolve, evolutionSpeed); //continue evolving until the user clicks stop
    }
}

//start or stop the evolutionary process
function startStopGol() {
    let startstop = document.querySelector('#btn-start-stop');

    if(!started) {
        started = true;
        startstop.value = 'stop reproducing';
        evolve();
    } else {
        started = false;
        startstop.value = 'start reproducing';
        clearTimeout(timer);
    }
}

//reset by reloading the page
function resetWorld() {
    location.reload();
}

window.onload=()=>{
    createWorld(); // visual table
    createGenArrays();// current and next generations
    initGenArrays();//Set all initial array locations to 0=dead
}