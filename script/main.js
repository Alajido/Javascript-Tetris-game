// variable that hold the entire grid that contain all the div elements
let grid = document.querySelector(`.grid`);
// variable that holds all the grid element and convert them into an array 
const squares = Array.from(document.querySelectorAll(`.grid div`));
// the width of the whole shape i.e from 0 - 9 making it 10
const width = 10;
squares.forEach(value => {
    if (value.classList.contains(`taken`)) {
        value.style.background = 'orange'
    }
})
let btn = document.querySelector(`#btn`);
let displayScore = document.querySelector(`#score`)
let score = 0
let timing;
let randomShape = 0;

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
    [1, width+1, width*2+1, width+2],
    // [1, width, width+2, width*2+1],
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
// this hold the current position in which we want the shape to be displaying from the top
// i.e 0,1,2,3, and 4
let currentPosition = 4;
// variable that will hold all the tetrominoes shape index of 0 i.e the first shape of all the the tetrominoes
let currentRotation = 0
// console.log(current)

// random logic that will get a random number from 1 - 4 based on the length of the array
let random = Math.floor(Math.random() * theTetrominoes.length);
// if the random vallue is 4, so we get the iTetrominoes array value of index 0, since current rotation is set to 0
let current = theTetrominoes[random][currentRotation];
// console.log(current.length)

// function that draw our shapes and add a classlist of tetromino to show a background color
function draw() {
    // loop throw all the index of random selection
    current.forEach(index => {
        // iterate all the array grid and start counting from index of number four and be adding four to each index
        squares[currentPosition + index].classList.add(`tetromino`);
        
    })
   
};

// function for undrawing the tetriminoes shapes
function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove(`tetromino`)
    })
}

// keyboard control function
function control(e) {
    // left key code
    if (e.keyCode === 37) {
        moveLeft()
        // down key code
    } else if (e.keyCode === 38) {
        rotate()
        // right key code
    } else if (e.keyCode === 39) {
        moveRight()
        // left key code
    } else if (e.keyCode === 40) {
        moveDown()
    }
}
// listen to the keyboard press
document.addEventListener(`keyup`, control)

function moveDown() {
    // undraw the shape from the position it was
    undraw()
    // add 10 to the current position so that it moves down 
    let see = currentPosition += width;
    // add 10 to each position so that the current position will be incrementing each after undrawing the shape.
    draw() 
    // if it reached the last array, then stop
    stopWhenTouchAnother() 
}
// move down every 1 sec
// timing = setInterval(moveDown, 1000);


// move left function
function moveLeft() {
    undraw();
    // if any of the shape of the current tetrimino has riched to an index when divided by 10 will give 0 as a remainder
    const leftEdge = current.some(index => [currentPosition + index] % width === 0);
    console.log(leftEdge)
    if (!leftEdge) currentPosition -=1;

    if (current.some(index => squares[currentPosition + index].classList.contains(`taken`))) {
        // index.style.background = 'yellow'
        let check = currentPosition +=1
        // console.log(check)
    }
    
    draw()
}

// move right function
function moveRight() {
    undraw();

    // if any of the shape of the current tetrimino has riched to an index when divided by 10 will give 9 as a remainder
    const rightEdge = current.some(index => [currentPosition + index] % width === width -1);
    console.log(rightEdge)
    
    if (!rightEdge) currentPosition +=1;

    if (current.some(index => squares[currentPosition + index].classList.contains(`taken`))) {
        let comfarm = currentPosition -=1;
        console.log(comfarm)
        // index.style.background = 'pink'
    }

    draw()
}

// rotate function
function rotate() {
    // undraw the current shape
    undraw();

    // change the current rotation from 0 to be incrementing by one inside the current random array
    currentRotation ++;
    // chech if the current rotation has reached to the final shape of the current random choice and return to the first index of the array
    if (currentRotation === current.length) {
        currentRotation = 0;
    };
    // draw the current shape
    current = theTetrominoes[random][currentRotation]
    draw()
}

// stoping at the bottom of the game board
function stopWhenTouchAnother() {
    // same as current random choice if some of its index inside the whole array that forms the tetriminoes
    // postion of 4 + its index + 10 will have a class of taken.
    if (current.some(index => squares[currentPosition + index + width].classList.contains(`taken`))) {
        // if the condition is true, so convert all the whole index to a class of taken.
        current.forEach(index => squares[currentPosition + index].classList.add(`taken`))
        // current.forEach(index => squares[currentPosition + index].style.background = `orange`)
       
        random = randomShape
        
        // start a new tetrimino by making a random selection
        randomShape = Math.floor(Math.random() * theTetrominoes.length);
        console.log(randomShape)
        console.log(random)
        // same as current = const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
        // postion of random selection postion of 0
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()

        displayShapes()

        addScore()

    }

}


// the display shape module
const displayMiniShapes = document.querySelectorAll(`.display-shape-grade div`);
const displayWidth = 4;
let displayIndex = 0;

const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], // lTetrimino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], // zTetrimino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetrimino
    [0, 1, displayWidth, displayWidth+1], // oTetrimoni
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] // itetrimino
]


function displayShapes() {
    displayMiniShapes.forEach(index => {
        index.classList.remove(`tetromino`);
        // console.log(displayMiniShapes)
    });
    // displayMiniShapes.forEach(index => {
    //    if (index.classList.contains(`tetromino`)) {
    //     index.style.background = `black`
    //    }
    // })

    upNextTetrominoes[randomShape].forEach(index => {
        displayMiniShapes[displayIndex  + index].classList.add(`tetromino`)
        // console.log(displayMiniShapes)
    })

}

btn.addEventListener(`click`, () => {
    if (timing) {
        clearInterval(timing);
        timing = null;
        // console.log(timing)
    } else {
        draw();
        timing = setInterval(moveDown, 1000);
        // console.log(timing)
        random = Math.floor(Math.random() * theTetrominoes.length);
        displayShapes()
    }
})


function addScore() {
    for (let i = 0; i < 199; i += width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if (row.every(index => squares[index].classList.contains(`taken`))) {
            score += 10
            displayScore.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove(`taken`)
                squares[index].classList.remove(`tetromino`)
            })
            const removeSquare = squares.splice(i, width)
            removeSquare.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
        }
    }
}