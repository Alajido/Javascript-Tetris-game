// variable that hold the entire grid that contain all the div elements
const grid = document.querySelector(`.grid`);
// variable that holds all the grid element and convert them into an array 
const squares = Array.from(document.querySelectorAll(`.grid div`));
// the width variable
const width = 10;

console.log(squares)

// all the tetrominoes shapes
const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
];

const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
];

const tTetromino = [
    [1, width, width+1, width+2],
    [1, width, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1,width,width+1, width*2+1]
];

const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
];

const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
];

// put all the shapes inside an array
const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
// this hold the current position of all the shapes from the top
let currentPosition = 4;
// variable that will hold all the tetrominoes shape index of 0 i.e the first shape of all the the tetrominoes
let currentRotation = 0
// console.log(current)

// random logic that will get a random number from 1 - 4 based on the length of the array
let random = Math.floor(Math.random() * theTetrominoes.length);
// if the random vallue is 4, so we get the iTetrominoes array value of index 0, since current rotation is set to 0
let current = theTetrominoes[random][currentRotation];
console.log(current)

// function that draw our shapes and add a classlist of tetromino to show a background color
function draw() {
    // loop throw all the index of random selection
    current.forEach(index => {
        // iterate all the array grid and start counting from index of number four and be adding four to each index
        squares[currentPosition + index].classList.add(`tetromino`)
    })
   
};
function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove(`tetromino`)
    })
}

// for testing purpose
// draw()
//const timing = setInterval(moveDown, 1000);

function moveDown() {
    undraw()
    let see = currentPosition += width;

    // add 10 to each position so that the current position will be incrementing each after undrawing the shape.
    draw() 
    stopWhenTouchAnother() 
}

function control(e) {
    if (e.keyCode === 37) {
        moveLeft()
    } else if (e.keyCode === 38) {
        // rotate()
    } else if (e.keyCode === 39) {
        moveRight()
    } else if (e.keyCode === 40) {
        moveDown()
    }
}

document.addEventListener(`keyup`, control)

// stoping at the bottom of the game board
function stopWhenTouchAnother() {
    // same as current random choice if some of its index inside the whole array that forms the tetriminoes
    // postion of 4 + its index + 10 will have a class of taken.
    if (current.some(index => squares[currentPosition + index + width].classList.contains(`taken`))) {
        // if the condition is true, so convert all the whole index to a class of taken.
        current.forEach(index => squares[currentPosition + index].classList.add(`taken`))

        // start a new tetrimino by making a random selection
        random = Math.floor(Math.random() * theTetrominoes.length);
        // same as current = const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
        // postion of random selection postion of 0
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
    }

}
draw()
// move left function
function moveLeft() {
    undraw();

    const leftEdge = current.some(index => [currentPosition + index] % width === 0);

    if (!leftEdge) currentPosition -=1;

    if (current.some(index => squares[currentPosition + index].classList.contains(`taken`))) {
        currentPosition +=1
    }
    
    draw()
}

function moveRight() {
    undraw();

    const rightRight = current.some(index => [currentPosition + index] % width === width -1);
    console.log(rightRight)

    if (!rightRight) currentPosition +=1;

    if (current.some(index => squares[currentPosition + index].classList.contains(`taken`))) {
        currentPosition -=1;
    }

    draw()
}
