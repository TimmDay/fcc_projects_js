/**
 * Created by DAY7RT on 05.04.2018.
 */

document.getElementById('app').textContent = 'test';

//  0a   1b   2c
//  3d   4e   5f
//  6g   7h   8i

let isTurnX = true; //x always goes first
let isOpponentComputer = false;

//winX, winO, draw, incomplete
const getResult = (gameState) => {

};

const checkWinConditions = () => {
    // check if 3 in a row are the same
    // if so, end game and display play again button/modal

    const a = document.getElementById('pos0').textContent;
    const b = document.getElementById('pos1').textContent;
    const c = document.getElementById('pos2').textContent;
    const d = document.getElementById('pos3').textContent;
    const e = document.getElementById('pos4').textContent;
    const f = document.getElementById('pos5').textContent;
    const g = document.getElementById('pos6').textContent;
    const h = document.getElementById('pos7').textContent;
    const i = document.getElementById('pos8').textContent;

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

    } else if ('' === a ){ //todo
        console.log(`incomplete`);
        return 'incomplete';
    } else {
        return 'draw';
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

    const spaceOccupant = document.getElementById('pos0').textContent;
    if (spaceOccupant !== 'position 0'){ //todo update content to empty string after styles
        console.log('space occupied');
        return; //do nothing
    }
    document.getElementById('pos0').textContent = (isTurnX) ? 'X' : 'O';
    checkWinConditions();
    toggleTurn();
});



document.getElementById('pos1').addEventListener('click', function(){
    const spaceOccupant = document.getElementById('pos1').textContent;
    if (spaceOccupant !== 'position 1'){ //todo update content to empty string after styles
        console.log('space occupied');
        return; //do nothing
    }
    document.getElementById('pos1').textContent = (isTurnX) ? 'X' : 'O';
    checkWinConditions();
    toggleTurn();
});



document.getElementById('pos2').addEventListener('click', function(){
    const spaceOccupant = document.getElementById('pos2').textContent;
    if (spaceOccupant !== 'position 2'){ //todo update content to empty string after styles
        console.log('space occupied');
        return; //do nothing
    }
    const mark = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos2').textContent=mark; //todo test
    checkWinConditions();
    toggleTurn();
});



document.getElementById('pos3').addEventListener('click', function(){
    const spaceOccupant = document.getElementById('pos3').textContent;
    if (spaceOccupant !== 'position 3'){ //todo update content to empty string after styles
        console.log('space occupied');
        return; //do nothing
    }
    const mark = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos3').textContent=mark; //todo test
    checkWinConditions();
    toggleTurn();
});

document.getElementById('pos4').addEventListener('click', function(){
    const spaceOccupant = document.getElementById('pos4').textContent;
    if (spaceOccupant !== 'position 4'){ //todo update content to empty string after styles
        console.log('space occupied');
        return; //do nothing
    }
    const mark = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos4').textContent=mark; //todo test
    checkWinConditions();
    toggleTurn();
});

document.getElementById('pos5').addEventListener('click', function(){
    const spaceOccupant = document.getElementById('pos5').textContent;
    if (spaceOccupant !== 'position 5'){ //todo update content to empty string after styles
        console.log('space occupied');
        return; //do nothing
    }
    const mark = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos5').textContent=mark; //todo test
    checkWinConditions();
    toggleTurn();
});


document.getElementById('pos6').addEventListener('click', function(){
    const spaceOccupant = document.getElementById('pos6').textContent;
    if (spaceOccupant !== 'position 6'){ //todo update content to empty string after styles
        console.log('space occupied');
        return; //do nothing
    }
    const mark = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos6').textContent=mark; //todo test
    checkWinConditions();
    toggleTurn();
});

document.getElementById('pos7').addEventListener('click', function(){
    const spaceOccupant = document.getElementById('pos7').textContent;
    if (spaceOccupant !== 'position 7'){ //todo update content to empty string after styles
        console.log('space occupied');
        return; //do nothing
    }
    const mark = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos7').textContent=mark; //todo test
    checkWinConditions();
    toggleTurn();
});

document.getElementById('pos8').addEventListener('click', function(){
    const spaceOccupant = document.getElementById('pos8').textContent;
    if (spaceOccupant !== 'position 8'){ //todo update content to empty string after styles
        console.log('space occupied');
        return; //do nothing
    }
    const mark = (isTurnX) ? 'X' : 'O';
    document.getElementById('pos8').textContent=mark; //todo test
    checkWinConditions();
    toggleTurn();
});
