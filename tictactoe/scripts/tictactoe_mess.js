/**
 * Created by DAY7RT on 05.04.2018.
 */

document.getElementById('app').textContent = 'test';

//  0a   1b   2c
//  3d   4e   5f
//  6g   7h   8i

let gameBoard = ['','','','','','','','',''];

function updateBoard(posn){

}


let isTurnX = true; //x always goes first

let isOpponentComputer = false;

//winX, winO, draw, incomplete
const getResult = (gameState) => {

};

const checkWinConditions = (gameBoard) => {
    console.log(gameBoard);
    // check if 3 in a row are the same
    // if so, end game and display play again button/modal
    // also return if draw
    // also return if incomplete

    const a = gameboard[0];
    const b = gameboard[1];
    const c = gameboard[2];
    const d = gameboard[3];
    const e = gameboard[4];
    const f = gameboard[5];
    const g = gameboard[6];
    const h = gameboard[7];
    const i = gameboard[8];

    if (a === b && b === c){
        console.log(`win${c}`);
        return (`win ${document.getElementById(c)}`);

    } else if (d === e && e === f) {
        console.log(`win${f}`);
        return (`win ${document.getElementById(f)}`);

    } else if (g === h && h === i) {
        console.log(`win${i}`);
        return (`win ${document.getElementById(i)}`);

    } else if (a === d && d === g) {
        console.log(`win${g}`);
        return (`win ${document.getElementById(g)}`);

    } else if (b === e && e === h) {
        console.log(`win${h}`);
        return (`win ${document.getElementById(h)}`);

    } else if (c === f && f === i) {
        console.log(`win${i}`);
        return (`win ${document.getElementById(i)}`);

    } else if (a === e && e === i) {
        console.log(`win${i}`);
        return (`win ${document.getElementById(i)}`);

    } else if (c === e && e === g) {
        console.log(`win${g}`);
        return (`win ${document.getElementById(g)}`);

    } else if (gameBoard.indexOf('') === -1){ //todo there are no empty spaces left
        console.log(`draw`);
        return 'draw';

    } else {
        return 'incomplete';
    }
};

const toggleTurn = () => isTurnX = !isTurnX;

const toggleOpponent = () => {
    // toggle up top. play against: human/computer
};

const chooseTeam = () => {
    // toggle button up top for player to choose who goes first
    // depending on choice, toggle isTurnX
    // after clicked, button is disabled
    // after clicked, display message: player 1 is X/O. Computer/player 2 is X/O
};

const resetNewGame = () => {
    // re-enable choose team button
    // empty all spaces
};

const computerMakeMove = () => {

};


// PLAYER 1 Select Move

document.getElementById('pos0').addEventListener('click', function(){
    // check if space is empty. if not do nothing
    // check whose turn it is
    // update space with appropriate mark
    // check win conditions
    // switch the turn

    if (gameBoard[0] !== ''){
        console.log('space occupied');
        return; //do nothing
    }
    gameBoard[0] = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos0').textContent = (isTurnX) ? 'X' : 'O';
    checkWinConditions();
    toggleTurn();
});



document.getElementById('pos1').addEventListener('click', function(){
    if (gameBoard[1] !== ''){
        console.log('space occupied');
        return; //do nothing
    }
    gameBoard[1] = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos1').textContent = (isTurnX) ? 'X' : 'O';
    checkWinConditions();
    toggleTurn();
});



document.getElementById('pos2').addEventListener('click', function(){
    if (gameBoard[2] !== ''){
        console.log('space occupied');
        return; //do nothing
    }
    gameBoard[2] = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos2').textContent = (isTurnX) ? 'X' : 'O';
    checkWinConditions();
    toggleTurn();
});


document.getElementById('pos3').addEventListener('click', function(){
    if (gameBoard[3] !== ''){
        console.log('space occupied');
        return; //do nothing
    }
    gameBoard[3] = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos3').textContent = (isTurnX) ? 'X' : 'O';
    checkWinConditions();
    toggleTurn();
});

document.getElementById('pos4').addEventListener('click', function(){
    if (gameBoard[4] !== ''){
        console.log('space occupied');
        return; //do nothing
    }
    gameBoard[4] = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos4').textContent = (isTurnX) ? 'X' : 'O';
    checkWinConditions();
    toggleTurn();
});

document.getElementById('pos5').addEventListener('click', function(){
    if (gameBoard[5] !== ''){
        console.log('space occupied');
        return; //do nothing
    }
    gameBoard[5] = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos5').textContent = (isTurnX) ? 'X' : 'O';
    checkWinConditions();
    toggleTurn();
});


document.getElementById('pos6').addEventListener('click', function(){
    if (gameBoard[6] !== ''){
        console.log('space occupied');
        return; //do nothing
    }
    gameBoard[6] = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos6').textContent = (isTurnX) ? 'X' : 'O';
    checkWinConditions();
    toggleTurn();
});

document.getElementById('pos7').addEventListener('click', function(){
    if (gameBoard[7] !== ''){
        console.log('space occupied');
        return; //do nothing
    }
    gameBoard[7] = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos7').textContent = (isTurnX) ? 'X' : 'O';
    checkWinConditions();
    toggleTurn();
});

document.getElementById('pos8').addEventListener('click', function(){
    if (gameBoard[8] !== ''){
        console.log('space occupied');
        return; //do nothing
    }
    gameBoard[8] = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos8').textContent = (isTurnX) ? 'X' : 'O';
    checkWinConditions();
    toggleTurn();
});
