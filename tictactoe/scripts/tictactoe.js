
/** MODEL cares about the data **/
const tictactoe = {
    gameBoard: ['','','','','','','','',''],
    isTurnX: true,
    winCounter: [0,0],

    toggleTurn: function(){
        this.isTurnX = !this.isTurnX;
    },

    updateBoard: function(pos){
        if (this.gameBoard[pos] !== '') return; //do nothing if space occupied
        this.gameBoard[pos] = this.isTurnX ? 'X' : 'O';
        this.toggleTurn(); // todo here?
    },

    checkGameState: function(){ // winX, winO, incomplete, draw

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
        } else if (this.gameBoard.indexOf('') > 0) {
            return ('incomplete');
        } else {
            return 'draw';
        }
    },
    
    clearBoard : () => {
        this.gameBoard = ['','','','','','','','',''];
    }

};


/** CONTROLLER (event listeners - link between model and view) **/
const controller = {

    setUpBoardListeners(){
        const spaces = document.getElementsByClassName('game-space');

        [].forEach.call(spaces, (space, index) => {

            space.addEventListener('click', () => {

                if (tictactoe.gameBoard[index] === ''){ //only do stuff if space empty
                    tictactoe.updateBoard(index);
                    console.log(tictactoe.gameBoard);
                    // console.log(tictactoe.gameBoard); //todo

                    // TODO : BUG the alert from displayResult appears before the board renders. promises?
                    view.displayBoard();
                    view.displayResult();
                }
            });
        });
    }
};

/** VIEW  cares about the DOM **/
const view = {
    displayBoard() {

        const moves = document.getElementsByClassName('game-space'); //html collection, not array

        tictactoe.gameBoard.forEach((item, index) => {
            // console.log(moves[index]); //todo
            moves[index].textContent = item;
        })
    },

    displayResult() {
        switch (tictactoe.checkGameState()) {
            case 'incomplete' :
                break; //do nothing

            case 'draw' :
                alert('game is a draw');
                break;

            case 'winX' :
                alert('X wins!');
                break;

            case 'winO' :
                alert('O wins!');
                break;
        }
    },


    newGame() {

    }, //user clicks new game button
    chooseTeam() {

    } //user clicks choose team toggle before new game starts
};

/** set up listeners **/
controller.setUpBoardListeners();

// DEMO TEST

// TEST 1
// 0,1,2,3,4,5,7,6,8
// X,O,X,O,X,O,O,X,X
// winX
// const test1 = () => {
//     tictactoe.updateBoard(0);
//     console.log(tictactoe.gameBoard);
//     console.log(tictactoe.checkGameState());
//
//     tictactoe.updateBoard(1);
//     console.log(tictactoe.gameBoard);
//     console.log(tictactoe.checkGameState());
//
//     tictactoe.updateBoard(2);
//     console.log(tictactoe.gameBoard);
//     console.log(tictactoe.checkGameState());
//
//     tictactoe.updateBoard(3);
//     console.log(tictactoe.gameBoard);
//     console.log(tictactoe.checkGameState());
//
//     tictactoe.updateBoard(4);
//     console.log(tictactoe.gameBoard);
//     console.log(tictactoe.checkGameState());
//
//     tictactoe.updateBoard(5);
//     console.log(tictactoe.gameBoard);
//     console.log(tictactoe.checkGameState());
//
//     tictactoe.updateBoard(7);
//     console.log(tictactoe.gameBoard);
//     console.log(tictactoe.checkGameState());
//
//     tictactoe.updateBoard(6);
//     console.log(tictactoe.gameBoard);
//     console.log(tictactoe.checkGameState());
//
//     tictactoe.updateBoard(8);
//     console.log(tictactoe.gameBoard);
//     console.log(tictactoe.checkGameState());
//
//     view.displayBoard();
// };
// test1();

const test2 = () => {

};





