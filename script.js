const xClass = 'x'

const circleClass = 'circle'

const cellElements = document.querySelectorAll('[data-cell]')

let xTurn

const winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

const winningMessageElement = document.getElementById('winningMessage')

const restartButton = document.getElementById('restartButton')

restartButton.addEventListener('click', startGame)

startGame()

function startGame(){
    cellElements.forEach( cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(circleClass)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once:true})
    })
    winningMessageElement.classList.remove('show')
}



function handleClick(e) {
    const cell = e.target
    const currentClass = xTurn ? xClass : circleClass
    placeMark(cell, currentClass)
    console.log('clicked')
    if (checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
        swapTurns()
    }
}

function placeMark(cell,currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    xTurn = !xTurn
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
 if (draw) {
    winningMessageTextElement.innerText = 'Draw'
 }
 else {
    winningMessageTextElement.innerText = `${xTurn ? "X" : "O"} Win!`
 }
 winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every (cell => {
        return cell.classList.contains (xClass) || cell.classList.contains(circleClass)
    } )
}