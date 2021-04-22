### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive
# 2048

## Overview
~~ fill in


## The Brief 

- **Render a game in the browser**
- **Design logic for the game ending and displaying the scores**
- **Include separate HTML / CSS / JavaScript files**
- Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
- Use **Javascript** for **DOM manipulation**
- **Deploy your game online**, where the rest of the world can access it
- Use **semantic markup** for HTML and CSS (adhere to best practices)


## The Technologies used 

- HTML5
- CSS3
- JavaScript (ES6)
- Git and GitHub
- Google Fonts


## The Approach

### The Grid

This game was made using a 4 by 4 grid as this is the best way to play 2048. The code was built to account for possible other grid sizes but I felt it was best to stick to the classic 4 by 4

 ```js
 const width = 4
const tileArray = []
let addtile = false
let highestValue = 0
let score = 0
let highScore = 0

//* Setup Game

setup()
// For loop through the grid div children and add to array
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
 ```

## Challenges
~~ Challenges



## Victories 
~~ Victories


## Potential future features
~~ Additional Stuff


## Lessons learned
~~ Key things I learnt during the process

### [Play the game Now!](https://sirdantheawesome.github.io/project-1/)