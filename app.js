//* 2048 Game!

//* DOM Elements

const elements = {
  //? Find the main grid element
  grid: document.querySelector('#grid'),
  highestValue: document.querySelector('#highest-value'),
  score: document.querySelector('#current-score'),
  highScore: document.querySelector('#high-score'),
  endScreen: document.querySelector('#end-screen'),
  endGameHV: document.querySelector('#end-game-HV'),
  endGameFS: document.querySelector('#end-game-FS'),
  endGameHS: document.querySelector('#end-game-HS'),
  playAgainButton: document.querySelector('#end-screen button'),
}

//* Variables

const width = 4
const tileArray = []
let addtile = false
let highestValue = 0
let score = 0
let highScore = 0


//* Setup Game

setup()
//? For loop through the grid div children and add to array
function setup() {
  for (let i = 0; i < width ** 2; i++) {
    // Create tile div, add tile to page, add tile to array of tiles, make the tiles scale properly with flexbox
    const tile = document.createElement('div')
    elements.grid.appendChild(tile)
    tileArray.push(tile)
    tile.style.width = `${100 / width}%`
    tile.style.height = `${100 / width}%`
  }
  // Check for saves on localStorage, if there is no local storage do nothing, if there is then load the saves!
  if (localStorage) {
    highestValue = localStorage.getItem('highestValue') || 0
    elements.highestValue.innerHTML = highestValue
    highScore = localStorage.getItem('highScore') || 0
    elements.highScore.innerHTML = highScore
  }
  startGame()
}

//* Play again button on end screen

elements.playAgainButton.addEventListener('click', () => {
  // Stop displaying end screen, reset score, remove all the tiles from page and array, run the setup again
  elements.endScreen.style.display = 'none'
  score = 0
  tileArray.forEach((e) => {
    e.remove()
  })
  tileArray.splice(0, tileArray.length)
  setup()
  // console.log(tileArray, addtile)
})

//* Start the game

function startGame() {
  // Add 2 starting tiles, set the colours of the starting tiles, pass in the starting score of 2
  addtile = true
  addActiveTile()
  addtile = true
  addActiveTile()
  updateColors()
  updateScores(2)
}

//* Mobile Inputs:

//? Variables for comparing start and end positions

let touchX = 0
let touchY = 0
let newTouchX = 0
let newTouchY = 0

document.addEventListener('touchstart', (event) => {
  // Save the start position of the touch
  touchX = event.touches[0].pageX
  touchY = event.touches[0].pageY
  // console.log(touchX, touchY)
})

document.addEventListener('touchmove', (event) => {
  // Save the new position everytime its moved to get the last end pos
  newTouchX = event.touches[0].pageX
  newTouchY = event.touches[0].pageY
})

document.addEventListener('touchend', () => {
  // console.log(newTouchX, newTouchY)
  // console.log(Math.abs(touchY - newTouchY), Math.abs(touchX - newTouchX))

  //Find out which axis direction had the biggest change, compare direction and run a movement
  if (Math.abs(touchY - newTouchY) > Math.abs(touchX - newTouchX)) {
    if (touchY >= newTouchY) {
      shift('up')
    } else {
      shift('down')
    }
  } else {
    if (touchX >= newTouchX) {
      shift('left')
    } else {
      shift('right')
    }
  }

  addActiveTile()
  updateColors()
})

//* Deskptop Inputs:

document.addEventListener('keyup', (event) => {

  // make the const key = the key they was pressed
  const key = event.key

  // Check which input was pressed (takes arrow or wasd)
  switch (true) {
    case key === 'w' || key === 'ArrowUp': shift('up'); break
    case key === 'a' || key === 'ArrowLeft': shift('left'); break
    case key === 's' || key === 'ArrowDown': shift('down'); break
    case key === 'd' || key === 'ArrowRight': shift('right'); break
    // default: console.log('Invalid KeyStoke')
  }
  addActiveTile()
  updateColors()
  // console.log('---------Console Break--------')
})

//* Gameplay Loop Functions 

function addActiveTile() {
  // loop to get an array of inactive tiles
  const inactiveTileIndex = []
  const inactiveTiles = []
  tileArray.forEach((tile, i) => {
    if (!tile.classList.contains('active')) {
      inactiveTileIndex.push(i)
      inactiveTiles.push(tile)
    }
  })

  // Check if the board is full of numbers, if it is then run the end game check, otherwise add a new active tile
  // console.log(`inactive tiles: ${inactiveTileIndex}`)
  if (inactiveTileIndex.length > 0 && addtile) {
    const randTileIndex = Math.floor(Math.random() * inactiveTileIndex.length) // get random inactive tile index
    inactiveTiles[randTileIndex].classList.add('active') // set tile to active
    inactiveTiles[randTileIndex].innerHTML = 2 // give tile an innerhtml of 2
    // console.log(`Adding an active tile at ${randTileIndex}`)
  } else if (inactiveTileIndex.length <= 0) {
    // ('inactiveTiles == 0')
    endGameCheck()
  }
  addtile = false
}

//* End Game Check

function endGameCheck() {
  // Checks each tile to see if it can merge with an adjacent tile, if it can then don't end the game, if they all can't then game over.
  let endGameBool = true
  const activeTileIndex = []
  tileArray.forEach((tile, i) => {
    if (tile.classList.contains('active')) {
      activeTileIndex.push(i)
    }
  })
  // console.log('Beginning end of game check')
  activeTileIndex.forEach((tileIndex) => {
    if (endGameBool) {
      // console.log(`${tileIndex} is checking for moves`)
      if (tileArray[tileIndex - width] != null && tileArray[tileIndex - width].innerHTML === tileArray[tileIndex].innerHTML) {
        endGameBool = false
        // console.log(`${tileIndex} stopped the game ending from up`)
      } else if (tileIndex % width != 0 && tileArray[tileIndex - 1].innerHTML === tileArray[tileIndex].innerHTML) {
        endGameBool = false
        // console.log(`${tileIndex} stopped the game ending from left`)
      } else if (tileArray[tileIndex + width] != null && tileArray[tileIndex + width].innerHTML === tileArray[tileIndex].innerHTML) {
        endGameBool = false
        // console.log(`${tileIndex} stopped the game ending from down`)
      } else if (tileIndex % width != width - 1 && tileArray[tileIndex + 1].innerHTML === tileArray[tileIndex].innerHTML) {
        endGameBool = false
        // console.log(`${tileIndex} stopped the game ending from right`)
      } else {
        if (endGameBool != false) {
          endGameBool = true
        }
        // console.log(`${tileIndex} can't make any moves`)
      }
    }
  })
  // console.log(`The game has ended: ${endGame}`)
  if (endGameBool) {
    endGame()
  }
}

//* End the Game

function endGame() {
  // Show the end screen and display scores
  elements.endScreen.style.display = 'block'
  elements.endGameHV.innerHTML = highestValue
  elements.endGameFS.innerHTML = score
  elements.endGameHS.innerHTML = highScore //!Replace this when we learn about saving data
}

//* Tile shifting initial func

function shift(direction) {
  // loop to get an array of active tile index's, start the shifting loop
  const activeTileIndex = []
  tileArray.forEach((tile, i) => {
    if (tile.classList.contains('active')) {
      activeTileIndex.push(i)
      tile.classList.add('mergeable')
      // console.log(tile.classList.value)
    }
  })
  shiftLoopDirection(direction, activeTileIndex)
}

//* Tile shifting loop func

function shiftLoopDirection(direction, activeTileIndex) {
  // Check what direction is passed through
  switch (direction) {
    // Check if the tiles should be added based on whether or not they are at an edge, run the movement loop
    case 'up':
      activeTileIndex.forEach((tileIndex, i) => {
        // console.log(`>current tile is ${tileIndex}`)
        if (tileIndex - width >= 0) {
          move(tileIndex - width, tileIndex, activeTileIndex, direction, i)
        } else {
          // console.log(`${tileIndex} is trying to move out of grid<`)
        }
      })
      break
    case 'left':
      activeTileIndex.forEach((tileIndex, i) => {
        // console.log(`>current tile is ${tileIndex}`)
        if (!(tileIndex % width === 0)) {
          move(tileIndex - 1, tileIndex, activeTileIndex, direction, i)
        } else {
          // console.log(`${tileIndex} is trying to move out of grid<`)
        }
      })
      break
    case 'down':
      activeTileIndex.reverse()
      activeTileIndex.forEach((tileIndex, i) => {
        // console.log(`>current tile is ${tileIndex}`)
        if (tileIndex + width < width ** 2) {
          move(tileIndex + width, tileIndex, activeTileIndex, direction, i)
        } else {
          // console.log(`${tileIndex} is trying to move out of grid<`)
        }
      }) 
      break
    case 'right':
      activeTileIndex.reverse()
      activeTileIndex.forEach((tileIndex, i) => {
        // console.log(`>current tile is ${tileIndex}`)
        if (!(tileIndex % width === width - 1)) {
          move(tileIndex + 1, tileIndex, activeTileIndex, direction, i)
        } else {
          // console.log(`${tileIndex} is trying to move out of grid<`)
        }
      })
      break
  }
}

//* The main move func

function move(directionValue, tileIndex, activeTileIndex, direction, i) {
  if (tileArray[directionValue].classList.contains('active')) { // is it trying to move into active tile?
    // console.log(`${tileIndex} found active tile ${directionValue}`)

    if (tileArray[directionValue].innerHTML === tileArray[tileIndex].innerHTML && tileArray[tileIndex].classList.contains('mergeable') && tileArray[directionValue].classList.contains('mergeable')) { // are they the same number?
      // console.log(`${tileIndex} is merging into ${directionValue}`)
      
      // Merge the tiles, make the new tile not mergeable again and remove the old tile from the active tile array
      tileArray[tileIndex].classList.remove('active')
      tileArray[tileIndex].innerHTML = ''
      tileArray[directionValue].innerHTML = (Number(tileArray[directionValue].innerHTML) * 2)
      tileArray[directionValue].classList.add('active')

      updateScores((Number(tileArray[directionValue].innerHTML)))

      activeTileIndex.splice(i, 1)
      tileArray[directionValue].classList.remove('mergeable')
      addtile = true
      // console.log(`removed mergeable from ${tileIndex}<`)
    } else {
      // they are not the same number or it isnt mergeable
      // console.log(`${tileIndex} is same as ${directionValue}? ${tileArray[directionValue].innerHTML === tileArray[tileIndex].innerHTML}, is mergeable? ${tileArray[tileIndex].classList.contains('mergeable')}<`)
    }
  } else {

    //Move the current tile to the empty tile its moving into, move all properties.
    // console.log(`${tileIndex} is moving into empty tile ${directionValue}`)

    if (tileArray[tileIndex].classList.contains('mergeable')) {
      tileArray[tileIndex].classList.remove('mergeable')
      tileArray[directionValue].classList.add('mergeable')
    }

    tileArray[directionValue].classList.add('active')
    // console.log(`tile ${directionValue} is becoming active ${tileArray[directionValue].classList.contains('active')}`)

    tileArray[directionValue].innerHTML = tileArray[tileIndex].innerHTML
    tileArray[tileIndex].classList.remove('active')
    // console.log(`removed active from ${tileIndex}<`)

    tileArray[tileIndex].innerHTML = ''
    activeTileIndex.splice(i, 1, directionValue)
    //? run moveUp(activeTileIndex) again
    shiftLoopDirection(direction, activeTileIndex)
    // console.log('###looping###')
    addtile = true
  }
}

//* Scoring

function updateScores(value) {
  // update the scores and saves the high scores to localStorage if it finds localStorage
  score += value
  elements.score.innerHTML = score
  if (highestValue < value) {
    highestValue = value
    elements.highestValue.innerHTML = highestValue
    if (localStorage) {
      localStorage.setItem('highestValue', highestValue)
    }
  }
  if (highScore < score) {
    highScore = score
    elements.highScore.innerHTML = highScore
    if (localStorage) {
      localStorage.setItem('highScore', highScore)
    }
  }
}

//* Styling

function updateColors() {
  // finds the tile value each round and updates the colours of each tile accordingly
  tileArray.forEach((tile) => {
    switch (tile.innerHTML) {
      case '': tile.style.backgroundColor = 'white'; tile.style.color = 'black'; break
      case '2': tile.style.backgroundColor = '#ffff80'; tile.style.color = 'black'; break
      case '4': tile.style.backgroundColor = '#ffbf80'; tile.style.color = 'black'; break
      case '8': tile.style.backgroundColor = '#ff8080'; tile.style.color = 'black'; break
      case '16': tile.style.backgroundColor = '#ff809f'; tile.style.color = 'black'; break
      case '32': tile.style.backgroundColor = '	#d966ff'; tile.style.color = 'black'; break
      case '64': tile.style.backgroundColor = '	#ff00ff'; tile.style.color = 'black'; break
      case '128': tile.style.backgroundColor = '#00ccff'; tile.style.color = 'black'; break
      case '256': tile.style.backgroundColor = '#b300b3'; tile.style.color = 'white'; break
      case '512': tile.style.backgroundColor = '#660066'; tile.style.color = 'white'; break
      case '1024': tile.style.backgroundColor = '#006600'; tile.style.color = 'white'; break
      case '2048': tile.style.backgroundColor = '	#000000'; tile.style.color = 'white'; break
      case '4096': tile.style.backgroundColor = '	#000000'; tile.style.color = 'white'; break
      case '8192': tile.style.backgroundColor = '	#000000'; tile.style.color = 'white'; break
      case '16384': tile.style.backgroundColor = '	#000000'; tile.style.color = 'white'; break
      case '32768': tile.style.backgroundColor = '	#000000'; tile.style.color = 'white'; break
      case '65536': tile.style.backgroundColor = '	#000000'; tile.style.color = 'white'; break
      case '131072': tile.style.backgroundColor = '	#000000'; tile.style.color = 'white'; break
    }
  })
}

// Made by Daniel Fullerton: https://www.danielsdfullerton.co.uk
// Original 2048 creator: Gabriele Cirulli, play the original at https://play2048.co/