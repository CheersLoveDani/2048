//* 2048 Game!

//* DOM Elements

const elements = {
  //? Find the main grid element
  grid: document.querySelector('#grid'),
  highestValue: document.querySelector('#highest-value'),
  score: document.querySelector('#current-score'),
  highScore: document.querySelector('#high-score'),
}

//* Variables

const width = 4
const tileArray = []
let addtile = false
let highestValue = 0
let score = 0
let highScore = 0


//* SETUP GRID (Working I think?)

//? For loop through the grid div children and add to array

for (let i = 0; i < width ** 2; i++) {
  //? Create div
  const tile = document.createElement('div')
  //? Add div to to grid
  elements.grid.appendChild(tile)
  //? add div index to grid.innerHTML for debug
  //tile.innerHTML = i
  //? add div to div array
  tileArray.push(tile)

  //? Make the tiles fit nicely no matter the width
  tile.style.width = `${100 / width}%`
  tile.style.height = `${100 / width}%`
}

//* Start the game

function startGame() {
  addtile = true
  addActiveTile()
  addtile = true
  addActiveTile()
  updateColors()
  updateScores(2)
}
startGame()

//* Check input (Working I think?)

document.addEventListener('keyup', (event) => {

  //? make the const key = the key they was pressed
  const key = event.key

  //? Check which input was pressed (takes arrow or common letter)
  switch (true) {
    case key === 'w' || key === 'ArrowUp': shift('up'); break
    case key === 'a' || key === 'ArrowLeft': shift('left'); break
    case key === 's' || key === 'ArrowDown': shift('down'); break
    case key === 'd' || key === 'ArrowRight': shift('right'); break
    default: console.log('Invalid KeyStoke')
  }
  addActiveTile()
  updateColors()
  console.log('---------Console Break--------')
})

//* Gameplay Loop Functions 

function addActiveTile() {
  //? loop to get an array of inactive tiles
  const inactiveTileIndex = []
  const inactiveTiles = []
  tileArray.forEach((tile, i) => {
    if (!tile.classList.contains('active')) {
      inactiveTileIndex.push(i)
      inactiveTiles.push(tile)
    }
  })
  console.log(inactiveTileIndex)
  if (inactiveTileIndex.length > 0 && addtile) {
    const randTileIndex = Math.floor(Math.random() * inactiveTileIndex.length) // get random inactive tile index
    inactiveTiles[randTileIndex].classList.add('active') // set tile to active
    inactiveTiles[randTileIndex].innerHTML = 2 // give tile an innerhtml of 2
    console.log(`Adding an active tile at ${randTileIndex}`)
  } else if (inactiveTileIndex.length <= 0) {
    console.log('inactiveTiles == 0')
    endGameCheck()
  }
  addtile = false
}

//* End Game Check

function endGameCheck() {
  let endGame = true
  const activeTileIndex = []
  tileArray.forEach((tile, i) => {
    if (tile.classList.contains('active')) {
      activeTileIndex.push(i)
    }
  })
  console.log('Beginning end of game check')
  activeTileIndex.forEach((tileIndex) => {
    if (endGame) {
      // console.log(`${tileIndex} is checking for moves`)
      if (tileArray[tileIndex - width] != null && tileArray[tileIndex - width].innerHTML === tileArray[tileIndex].innerHTML) {
        endGame = false
        console.log(`${tileIndex} stopped the game ending from up`)
      } else if (tileIndex % width != 0 && tileArray[tileIndex - 1].innerHTML === tileArray[tileIndex].innerHTML) {
        endGame = false
        console.log(`${tileIndex} stopped the game ending from left`)
      } else if (tileArray[tileIndex + width] != null && tileArray[tileIndex + width].innerHTML === tileArray[tileIndex].innerHTML) {
        endGame = false
        console.log(`${tileIndex} stopped the game ending from down`)
      } else if (tileIndex % width != width - 1 && tileArray[tileIndex + 1].innerHTML === tileArray[tileIndex].innerHTML) {
        endGame = false
        console.log(`${tileIndex} stopped the game ending from right`)
      } else {
        if (endGame != false) {
          endGame = true
        }

        console.log(`${tileIndex} can't make any moves`)
      }
    }
  })
  console.log(`The game has ended: ${endGame}`)
}


//* This should work? check it tho dumby

function shift(direction) {
  //? loop to get an array of active tile indexs
  const activeTileIndex = []
  tileArray.forEach((tile, i) => {
    if (tile.classList.contains('active')) {
      activeTileIndex.push(i)
    }
  })
  shiftLoopDirection(direction, activeTileIndex)
}

function shiftLoopDirection(direction, activeTileIndex) {
  switch (direction) {
    case 'up':
      activeTileIndex.forEach((tileIndex, i) => {
        console.log(`current tile is ${tileIndex}`)
        if (tileIndex - width >= 0) {
          move(tileIndex - width, tileIndex, activeTileIndex, direction, i)
        }
      })
      break

    case 'left':
      activeTileIndex.forEach((tileIndex, i) => {
        console.log(`current tile is ${tileIndex}`)
        if (!(tileIndex % width === 0)) {
          move(tileIndex - 1, tileIndex, activeTileIndex, direction, i)
        }
      })
      break

    case 'down':
      activeTileIndex.reverse()
      activeTileIndex.forEach((tileIndex, i) => {
        console.log(`current tile is ${tileIndex}`)
        if (tileIndex + width < width ** 2) {
          move(tileIndex + width, tileIndex, activeTileIndex, direction, i)
        }
      })
      break

    case 'right':
      activeTileIndex.reverse()
      activeTileIndex.forEach((tileIndex, i) => {
        console.log(`current tile is ${tileIndex}`)
        if (!(tileIndex % width === width - 1)) {
          move(tileIndex + 1, tileIndex, activeTileIndex, direction, i)
        }
      })
      break

    default: console.error('Unexpected direction passed to func shift(direction)')
  }
}

function move(directionValue, tileIndex, activeTileIndex, direction, i) {
  if (tileArray[directionValue].classList.contains('active')) { // is it trying to move into active tile?
    console.log(`${tileIndex} found active tile ${directionValue}`)
    if (tileArray[directionValue].innerHTML === tileArray[tileIndex].innerHTML) { // are they the same number?
      console.log(`${tileIndex} is merging into ${directionValue}`)
      tileArray[tileIndex].classList.remove('active')
      tileArray[tileIndex].innerHTML = ''
      tileArray[directionValue].innerHTML = (Number(tileArray[directionValue].innerHTML) * 2)
      updateScores((Number(tileArray[directionValue].innerHTML)))
      //? merge them, update score and highest value thingy
      //! splice activeTileIndex at i to remove the active tile so we dont merge twice
      activeTileIndex.splice(i, 1)
      addtile = true
    } else {
      // they are not the same number
      console.log(`${tileIndex} isnt the same as ${directionValue} and isnt trying to merge`)
    }
  } else {
    //its trying to move into empty tile
    console.log(`${tileIndex} is moving into empty tile ${directionValue}`)
    tileArray[directionValue].classList.add('active')
    console.log(`tile at ${directionValue} is active? ${tileArray[directionValue].classList.contains('active')}`)
    tileArray[directionValue].innerHTML = tileArray[tileIndex].innerHTML
    tileArray[tileIndex].classList.remove('active')
    tileArray[tileIndex].innerHTML = ''
    activeTileIndex.splice(i, 1, directionValue)
    //? run moveUp(activeTileIndex) again
    shiftLoopDirection(direction, activeTileIndex)
    addtile = true
  }
}

//* Scoring

function updateScores(value) {
  score += value
  elements.score.innerHTML = score
  if (highestValue < value) {
    highestValue = value
    elements.highestValue.innerHTML = highestValue
  }
  if (highScore < score) {
    highScore = score
    elements.highScore.innerHTML = highScore
  }
}

function setHighScore() {
  //? set the high score after game ends
  //? display a new high score message on a high score (stretch)
}


//* Styling and Anims

function updateColors() {
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
//? Pretty much anything above 4096 is very much overkill but eh, don't want it looking bad if a world record player plays.

//* Additional stuffs to do:

//? game initialization
//? end game function
//? score and highest number updates
//? bunch-a css