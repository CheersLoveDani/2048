// * sudo reee

//* DOM Elements

const elements = {
  //? Find the main grid element
  grid: document.querySelector('#grid'),
  //? all the header score stuffs
}

//* Variables

const width = 4
const tileArray = []

//* SETUP GRID

//? For loop through the grid div children and add to array

for (let i = 0; i < width ** 2; i++) {
  //? Create div
  const tile = document.createElement('div')
  //? Add div to to grid
  elements.grid.appendChild(tile)
  //? add div index to grid.innerHTML for debug
  tile.innerHTML = i
  //? add div to div array
  tileArray.push(tile)

  //? Style the Div
  tile.style.width = `${100 / width}%`
  tile.style.height = `${100 / width}%`
}

//* Start the game

function startGame() {
  addActiveTile()
}
startGame()

//* Check input

document.addEventListener('keydown', (event) => {

  //? make the const key = the key they was pressed
  const key = event.key

  //? Check which input was pressed (takes arrow or common letter)
  switch (true) {
    case key === 'w' || key === 'ArrowUp': upPressed(); break
    case key === 'a' || key === 'ArrowLeft': leftPressed(); break
    case key === 's' || key === 'ArrowDown': downPressed(); break
    case key === 'd' || key === 'ArrowRight': rightPressed()
  }
})

//* Input Functions

function upPressed() {
  console.log('up')
  shift('up')
  addActiveTile()
}

function leftPressed() {
  console.log('left')
  shift('left')
  addActiveTile()
}

function downPressed() {
  console.log('down')
  shift('down')
  addActiveTile()
}

function rightPressed() {
  console.log('right')
  shift('right')
  addActiveTile()
}

//* Gameplay Loop Functions

function addActiveTile() {
  //? loop to get an array of inactive tiles
  const inactiveTileIndex = []
  tileArray.forEach((element, i) => {
    if (!element.classList.contains('active')) {
      inactiveTileIndex.push(i)
    }
  })
  if (inactiveTileIndex.length > 0) {
    //? get random inactive tile index
    //? set tile to active
    //? give tile an innerhtml of 2
  } else {
    //? check if something can merge, if it cant then end the game
  }
}


function shift(direction) {
  //? loop to get an array of active tile indexs
  const activeTileIndex = []
  tileArray.forEach((tile, i) => {
    if (tile.classList.contains('active')) {
      activeTileIndex.push(i)
    }
  })

  switch (direction) {
    case 'up': moveUp(activeTileIndex); break
    case 'left': moveLeft(activeTileIndex); break
    case 'down': moveDown(activeTileIndex); break
    case 'right': moveRight(activeTileIndex); break
    default: console.error('Unexpected direction passed to func shift(direction)')
  }
}

//! moveLeft, moveDown, and moveRight will all be very similar to this
function moveUp(activeTileIndex){
  //? up logic
  activeTileIndex.forEach((tileIndex, i) => {
    if (tileIndex - width > 0) { // is it trying to move into a valid tile?
      if (tileArray[tileIndex - width].contains('active')) { //is it trying to move into active tile?
        if (tileArray[tileIndex - width].innerHTML === tileArray[tileIndex]) { // are they the same number?
          //? merge them, update score and highest value thingy
          //! splice activeTileIndex at i to remove the active tile so we dont merge twice
          activeTileIndex.splice(i, 1)
        }
      } else { //its trying to move into empty tile
        //? Move it into the tile,
        //? run moveUp(activeTileIndex) again
        moveUp(activeTileIndex)
      }
    } // do nothing
  })
}

function moveLeft(activeTileIndex) {
  //! left and right use +1 or -1 and checks are with %
}
function moveDown(activeTileIndex) {
  //! remember to reverse the activeTileIndex so the tiles sort in the right order
}
function moveRight(activeTileIndex) {
  //! remember to reverse the activeTileIndex so the tiles sort in the right order
}

//* Additional stuffs to do:

//? game initialization
//? end game function
//? score and highest number updates
//? bunch-a css