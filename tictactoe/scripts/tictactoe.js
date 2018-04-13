
/** MODEL cares about the data **/
const tictactoe = {
    gameBoard: ['','','','','','','','',''],
    isTurnX: true,
    winCounter: [0,0],

<<<<<<< HEAD

||||||| merged common ancestors
    toggleTurn: function(){
        this.isTurnX = !this.isTurnX;
    },
=======
    toggleTurn(){
        this.isTurnX = !this.isTurnX;
    },
>>>>>>> 6587578c4c5ab3ce7778df5a58de29f148a9efed

    updateBoard(pos){
        if (this.gameBoard[pos] !== '') return; //do nothing if space occupied
        this.gameBoard[pos] = this.isTurnX ? 'X' : 'O';
        this.toggleTurn(); // todo here?
    },

<<<<<<< HEAD
    toggleTurn: function(){
        this.isTurnX = !this.isTurnX;
    },

    checkGameState: function(){ // winX, winO, incomplete, draw
||||||| merged common ancestors
    checkGameState: function(){ // winX, winO, incomplete, draw
=======
    checkGameState(){ // winX, winO, incomplete, draw
>>>>>>> 6587578c4c5ab3ce7778df5a58de29f148a9efed

        const a = this.gameBoard[0];
        const b = this.gameBoard[1];
        const c = this.gameBoard[2];
        const d = this.gameBoard[3];
        const e = this.gameBoard[4];
        const f = this.gameBoard[5];
        const g = this.gameBoard[6];
        const h = this.gameBoard[7];
        const i = this.gameBoard[8];

        //isTurnX has toggled before this test
        if (a === b && b === c && c !== '' ) {
            return `win${this.isTurnX ? 'O' : 'X'}`;
        } else if (d === e && e === f && f !== '' ) {
            return `win${this.isTurnX ? 'O' : 'X'}`;
        } else if (g === h && h === i && i !== '' ) {
            return `win${this.isTurnX ? 'O' : 'X'}`;
        } else if (a === d && d === g && g !== '' ) {
            return `win${this.isTurnX ? 'O' : 'X'}`;
        } else if (b === e && e === h && h !== '' ) {
            return `win${this.isTurnX ? 'O' : 'X'}`;
        } else if (c === f && f === i && i !== '' ) {
            return `win${this.isTurnX ? 'O' : 'X'}`;
        } else if (a === e && e === i && i !== '' ) {
            return `win${this.isTurnX ? 'O' : 'X'}`;
        } else if (c === e && e === g && g !== '' ) {
            return `win${this.isTurnX ? 'O' : 'X'}`;
        } else if (this.gameBoard.indexOf('') >= 0) {
            return ('incomplete');
        } else {
            return 'draw';
        }
    },
<<<<<<< HEAD

    clearBoard : () => {
||||||| merged common ancestors
    
    clearBoard : () => {
=======
    
    resetBoard()  {
>>>>>>> 6587578c4c5ab3ce7778df5a58de29f148a9efed
        this.gameBoard = ['','','','','','','','',''];
        this.isTurnX = true;
        // return true; //todo for promises
    },

    incrementCounter(){
        // 0=o, 1=x
        // isTurnX was toggled at win point, so toggle it back
        if (!this.isTurnX) { //x won
            this.winCounter[1]++;
        } else {
            this.winCounter[0]++;
        }
    }
};


/** CONTROLLER (event listeners - link between model and view) **/
const controller = {

    handleTurnTaking(){
        const spaces = document.getElementsByClassName('game-space');

        [].forEach.call(spaces, (space, index) => {
            space.addEventListener('click', () => {
                if (tictactoe.gameBoard[index] === ''){ //only do stuff if space empty
                    tictactoe.updateBoard(index);
                    console.log(tictactoe.gameBoard); //todo
                    view.displayBoard();
                    view.displayResult();
                }
            });
        });
    },

    handlePlayAgainButton() {
        const reset = document.getElementsByClassName('btn--reset');
        reset[0].addEventListener('click', () => {

            // un-freeze the game board for clicking
            // reset the tictactoe.gameBoard

            tictactoe.resetBoard();
            view.displayBoard();

        });
    }


};

/** VIEW  cares about the DOM **/
const view = {
    displayBoard() {
        const gamePosns = document.getElementsByClassName('game-space'); //html collection, not array

        tictactoe.gameBoard.forEach((item, index) => {
            gamePosns[index].textContent = item;
        })
    },

    displayResult() {
        const state = tictactoe.checkGameState();

        switch (tictactoe.checkGameState()) {
            case 'incomplete' :
                break; //do nothing

            case 'draw' :
                alert('game is a draw');
                break;

            case 'winX' :
                // X wins!
                // increment counter for an x win
                // render updated counter
                // freeze game board (no more clicks)
                // display play again button
                tictactoe.incrementCounter();
                this.displayWinCounter();
                alert('X wins!');
                break;

            case 'winO' :
                tictactoe.incrementCounter();
                this.displayWinCounter();
                alert('O wins!');
                break;
        }
    },

    displayWinCounter(){
        const o = tictactoe.winCounter[0];
        const x = tictactoe.winCounter[1];

        document.getElementById('count-x').textContent = x;
        document.getElementById('count-o').textContent = o;
    },

    toggleResetButtonDisabled() {
        //todo bug. disabled never goes away in dom
        const resetBtn = document.getElementsByClassName('btn--reset')[0];
        const stateDisabled = resetBtn.getAttribute('disabled');
        console.log(stateDisabled); //todo
        resetBtn.setAttribute('disabled', String(!stateDisabled));
        console.log(resetBtn.getAttribute('disabled')); //todo
    },


    newGame() {

    }, //user clicks new game button
    chooseTeam() {

    } //user clicks choose team toggle before new game starts
};

/** set up listeners **/
controller.handleTurnTaking();
controller.handlePlayAgainButton();
// view.toggleResetButton();


// DEMO TESTS

// TEST 1
// 0,1,2,3,4,5,7,6,8
// X,O,X,O,X,O,O,X,X
// winX
const test1 = () => {
    tictactoe.updateBoard(0);
    console.log(tictactoe.gameBoard);
    console.log(tictactoe.checkGameState());

    tictactoe.updateBoard(1);
    console.log(tictactoe.gameBoard);
    console.log(tictactoe.checkGameState());

    tictactoe.updateBoard(2);
    console.log(tictactoe.gameBoard);
    console.log(tictactoe.checkGameState());

    tictactoe.updateBoard(3);
    console.log(tictactoe.gameBoard);
    console.log(tictactoe.checkGameState());

    tictactoe.updateBoard(4);
    console.log(tictactoe.gameBoard);
    console.log(tictactoe.checkGameState());

    tictactoe.updateBoard(5);
    console.log(tictactoe.gameBoard);
    console.log(tictactoe.checkGameState());

    tictactoe.updateBoard(7);
    console.log(tictactoe.gameBoard);
    console.log(tictactoe.checkGameState());

    tictactoe.updateBoard(6);
    console.log(tictactoe.gameBoard);
    console.log(tictactoe.checkGameState());

    tictactoe.updateBoard(8);
    console.log(tictactoe.gameBoard);
    console.log(tictactoe.checkGameState());

    view.displayBoard();
};


const test2 = () => {

};

// test1();




