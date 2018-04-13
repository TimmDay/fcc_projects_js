var calculator = {
    storedNum : 0,
    nextNum: 0,
    hasBaseNum: false,
    operator: "",
    wasDecPressed: false,
    wasLastZero : "",
    equalsLastPressed : false, // for continuous equals press
    increment : 0,             // the value to use when continuous equals press
    numBuild : function(num) {
        if (calculator.wasDecPressed === false) {

            if (calculator.hasBaseNum === false) { //build base num
                calculator.storedNum = calculator.storedNum*10 + num;
            } else { //build next num
                calculator.nextNum = calculator.nextNum*10 + num;
            }

        } else { //decimal has been pressed

            var stringArg = ""; //need to deal with strings temporarily, so leading and trailing zeroes aren't dropped
            if (calculator.wasLastZero !== "") { //stored zeroes b4 new decimal
                stringArg = calculator.wasLastZero + num.toString();
                //console.log(stringArg); ///TEST

            } else { //no stored zeroes
                stringArg = num.toString();
            }

            if (calculator.hasBaseNum === false) { //build base
                var stringNum = (calculator.storedNum).toString();
                if (stringNum.includes(".")) {
                    stringNum += stringArg;
                } else {
                    stringNum += ("."+ stringArg);
                }
                calculator.storedNum = parseFloat(stringNum);

            } else { //build next num
                var stringNum = (calculator.nextNum).toString();
                if (stringNum.includes(".")) {
                    stringNum += stringArg; //but lose a zero when back to num...
                } else {
                    stringNum += ("."+ stringArg);
                }
                calculator.nextNum = parseFloat(stringNum);
            }

            //remember decimal zeroes
            if (num.toString() === "0") {
                calculator.wasLastZero += "0"; //remember for next entry
            } else {
                calculator.wasLastZero = ""; //no zeroes to remember
            }
        }

        //if dec pressed, we want to add a decimal to end
        //convert to string so it doesnt get chopped by js
        //concat to end
        //convert back to num, update

    },

    operations : {
        add : function(){

//            if operator matches previous, dont erase next num so op can continue
//            if it is different do not calculate
            calculator.increment = calculator.nextNum; // in case equals pressed again and again
            calculator.equalsLastPressed = false;

            if (calculator.storedNum !== "") {

                calculator.storedNum = calculator.storedNum + calculator.nextNum;
                calculator.operator ="+";
                calculator.nextNum = 0;
                calculator.hasBaseNum = true;
                calculator.wasDecPressed = false;
            }
        },
        subtract : function(){
            calculator.increment = calculator.nextNum; // in case equals pressed again and again
            calculator.equalsLastPressed = false;

            if (calculator.storedNum !== "") {
                calculator.storedNum = calculator.storedNum -
                    calculator.nextNum;
                calculator.nextNum = 0;
                calculator.hasBaseNum = true;
                calculator.operator ="-";
                calculator.wasDecPressed = false;
            } else {
                //do nothing if no storedNum to operate on
            }
        },
        multiply : function(){
            calculator.increment = calculator.nextNum; // in case equals pressed again and again
            calculator.equalsLastPressed = false;

            if (calculator.storedNum !== "") {
                if (calculator.nextNum === 0) {  // first operation, dont* by 0, just update operator are store num
                    calculator.hasBaseNum = true;
                    calculator.operator ="*";
                    calculator.wasDecPressed = false;
                } else {
                    calculator.storedNum = calculator.storedNum * calculator.nextNum;
                    calculator.nextNum = 0;
                    calculator.hasBaseNum = true;
                    calculator.operator ="*";
                    calculator.wasDecPressed = false;
                }
            }
        },
        divide : function(){
            calculator.increment = calculator.nextNum; // in case equals pressed again and again
            calculator.equalsLastPressed = false;

            if (calculator.storedNum !== "") {
                if (calculator.nextNum === 0) { // again, don't divide by 0 if no next num
                    calculator.hasBaseNum = true;
                    calculator.operator ="/";
                    calculator.wasDecPressed = false;
                } else {
                    calculator.storedNum = calculator.storedNum / calculator.nextNum;
                    calculator.nextNum = 0;
                    calculator.hasBaseNum = true;
                    calculator.operator ="/";
                    calculator.wasDecPressed = false;
                }
            }
        },
        equals : function(){
            if (calculator.operator === "+") {
                if (calculator.equalsLastPressed) {
                    calculator.nextNum = calculator.increment;
                    calculator.operations.add();
                } else {
                    calculator.operations.add();
                    // calculator.operator = ""; //means it cannot repeat
                    calculator.wasDecPressed = false;
                }

            } else if (calculator.operator === "-") {
                if (calculator.equalsLastPressed) {
                    calculator.nextNum = calculator.increment;
                    calculator.operations.subtract();
                } else {
                    calculator.operations.subtract();
                    // calculator.operator = "";
                    calculator.wasDecPressed = false;
                }

            } else if (calculator.operator === "*") {
                if (calculator.equalsLastPressed) {
                    calculator.nextNum = calculator.increment;
                    calculator.operations.multiply();
                } else {
                    calculator.operations.multiply();
                    // calculator.operator = "";
                    calculator.wasDecPressed = false;
                }

            } else if (calculator.operator === "/") {
                if (calculator.equalsLastPressed) {
                    calculator.nextNum = calculator.increment;
                    calculator.operations.divide();
                } else {
                    calculator.operations.divide();
                    // calculator.operator = "";
                    calculator.wasDecPressed = false;
                }

            } else if (calculator.operator === "" && calculator.hasBaseNum === false) { //num was entered, equals pressed with no operator
                // make the base num true so next num can be built. stored num is now stored with no mod
                calculator.hasBaseNum = true;
                calculator.wasDecPressed = false;

            } else if (calculator.operator === "") {
                if (calculator.operator !== 0) {
                    calculator.storedNum = calculator.nextNum;
                    calculator.nextNum = 0;
                }
            }
            calculator.equalsLastPressed = true;
        },

        ac : function() {
            calculator.storedNum = 0;
            calculator.nextNum = 0;
            calculator.operator = "";
            calculator.hasBaseNum = false;
            calculator.wasDecPressed = false;
            calculator.increment = 0;
            calculator.equalsLastPressed = false;
        },
        ce : function(){
            if (calculator.hasBaseNum === false) {
                calculator.operations.ac(); // no base num, just clear the lot

            } else if (calculator.hasBaseNum) {
                calculator.nextNum = 0;           //clear the next num that was being built (it had typo)
                calculator.wasDecPressed = false; // clear dec in case it was pressed during the next num build
            }
        }
    },
    //for testing
    display : function(num){
        console.log("\nstored:" + calculator.storedNum);
        console.log("next:" + calculator.nextNum);
        console.log("operator: " + calculator.operator);
        console.log("hasBaseNum: " + calculator.hasBaseNum);
        console.log("decimal pressed? " + calculator.wasDecPressed);
        console.log("last num 0?: " + calculator.wasLastZero);
        console.log(("increment: " + calculator.increment))
    }
}

// in progress below

var handlers = {
    one : function() {
        calculator.numBuild(1);
        view.displayBuild();
    },
    two : function() {
        calculator.numBuild(2);
        view.displayBuild();
    },
    three : function() {
        calculator.numBuild(3);
        view.displayBuild();
    },
    four : function() {
        calculator.numBuild(4);
        view.displayBuild();
    },
    five : function() {
        calculator.numBuild(5);
        view.displayBuild();
    },
    six : function() {
        calculator.numBuild(6);
        view.displayBuild();
    },
    seven : function() {
        calculator.numBuild(7);
        view.displayBuild();
    },
    eight : function() {
        calculator.numBuild(8);
        view.displayBuild();
    },
    nine : function() {
        calculator.numBuild(9);
        view.displayBuild();
    },
    zero : function() {
        calculator.numBuild(0);
        view.displayBuild();
    },
    decimal : function() {
        calculator.wasDecPressed = true;
        view.displayBuild();
    },
    ac : function() {
        calculator.operations.ac();
        view.displayBlank();
    },
    ce : function() {
        calculator.operations.ce();
        view.displayBlank();
    },
    add : function () {
        calculator.operations.add();
        view.displayEval();
    },
    subtract : function () {
        calculator.operations.subtract();
        view.displayEval();
    },
    multiply : function () {
        calculator.operations.multiply();
        view.displayEval();
    },
    divide : function () {
        calculator.operations.divide();
        view.displayEval();
    },
    equals : function () {
        calculator.operations.equals();
        view.displayEval();
    },
}


/** CONTROLLER **/
var listeners = {
    setUpEventListeners : function() {

        // WIDEN RED EYE DISPLAY on btn click
        var eyeEffect = document.getElementsByClassName("btn");
        var entry = document.getElementById("entry-eye");

        for (var i=0; i<eyeEffect.length; i++) {
            eyeEffect[i].addEventListener("click",function(evt){
                entry.style.width="9.85em";
            })
        }

        //SHORTEN RED EYE on ac and ce click
        var ac = document.getElementById("ac");
        var ce = document.getElementById("ce");
        ac.addEventListener("click", function(){
            entry.style.width="1.7em";
        })
        ce.addEventListener("click", function(){
            entry.style.width="1.7em";
        })

        // UPDATE NUM BUTTONS ON CLICK
        var btnOne = document.getElementById("one");
        var btnTwo = document.getElementById("two");
        var btnThree = document.getElementById("three");
        var btnFour = document.getElementById("four");
        var btnFive = document.getElementById("five");
        var btnSix = document.getElementById("six");
        var btnSeven = document.getElementById("seven");
        var btnEight = document.getElementById("eight");
        var btnNine = document.getElementById("nine");
        var btnZero = document.getElementById("zero");
        var decimal = document.getElementById("decimal");

        btnOne.addEventListener('click', function(){handlers.one()});
        btnTwo.addEventListener('click', function(){handlers.two()});
        btnThree.addEventListener('click', function(){handlers.three()});
        btnFour.addEventListener('click', function(){handlers.four()});
        btnFive.addEventListener('click', function(){handlers.five()});
        btnSix.addEventListener('click', function(){handlers.six()});
        btnSeven.addEventListener('click', function(){handlers.seven()});
        btnEight.addEventListener('click', function(){handlers.eight()});
        btnNine.addEventListener('click', function(){handlers.nine()});
        btnZero.addEventListener('click', function(){handlers.zero()});
        decimal.addEventListener('click', function(){handlers.decimal()});

        // REST OF BUTTONS
        var add = document.getElementById("plus");
        var subtract = document.getElementById("subtract");
        var multiply = document.getElementById("multiply");
        var divide = document.getElementById("divide");
        var ac = document.getElementById("ac");
        var ce = document.getElementById("ce");
        var equals = document.getElementById("equals");

        add.addEventListener('click', function(){handlers.add()});
        subtract.addEventListener('click', function(){handlers.subtract()});
        multiply.addEventListener('click', function(){handlers.multiply()});
        divide.addEventListener('click', function(){handlers.divide()});
        ac.addEventListener('click', function(){handlers.ac()});
        ce.addEventListener('click', function(){handlers.ce()});
        equals.addEventListener('click', function(){handlers.equals()});
    },
    setUpEasterEggListeners : function() {
        var eeOne = document.getElementById("ee1");
        var eeTwo = document.getElementById("ee2");
        var eeThree = document.getElementById("ee3");
        var eeFour = document.getElementById("ee4");
        var eeFive = document.getElementById("ee5");
        var eeSix = document.getElementById("ee6");

        eeOne.addEventListener('click', function(){view.eeOne()});
        eeTwo.addEventListener('click', function(){view.eeTwo()});
        eeThree.addEventListener('click', function(){view.eeThree()});
        eeFour.addEventListener('click', function(){view.eeFour()});
        eeFive.addEventListener('click', function(){view.eeFive()});
        eeSix.addEventListener('click', function(){view.eeSix()});
    }
}

var view = {

    displayBuild : function() {
        var numDisplay = document.getElementById("entry-eye-p");

        var stored = calculator.storedNum;
        var next = calculator.nextNum;

       if (calculator.hasBaseNum) {
           numDisplay.textContent = next;
           view.resetDisplay();
           view.resizeDisplay();
       } else {
           numDisplay.textContent = stored;
           view.resetDisplay();
           view.resizeDisplay();
       }
    },
    displayEval : function() {
        var numDisplay = document.getElementById("entry-eye-p");
        numDisplay.textContent = calculator.storedNum;
        view.resetDisplay();
        view.resizeDisplay();
    },
    displayBlank : function() {
        var numDisplay = document.getElementById("entry-eye-p");
        numDisplay.textContent = "";
    },
    resizeDisplay : function() {

        //weird bug. when e-num, the bit after the - goes to new line.
        //e+num is fine

        function isOverflowing(el){
            return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
        }
        var eye = document.getElementById("entry-eye-p");
        var fontSize = parseInt(eye.style.fontSize);
        var paddingAbove = parseInt(eye.style.paddingTop);

        for (var i=fontSize; i>=0; i--){
            var overflow = isOverflowing(eye);
            if (overflow) {
                fontSize--;
                paddingAbove += 0.41;
                eye.style.fontSize = fontSize + "px";
                eye.style.paddingTop = paddingAbove + "px";
            }
        }
    },
    resetDisplay : function() {
        var eye = document.getElementById("entry-eye-p");
        eye.style.fontSize = "27px";
        eye.style.paddingTop = "3px";
    },

    //easter egg view updates
    eeOne : function() { //blinks the flashlight. uses keyframes at base of css

        var el = document.getElementById("history-in");

        if (el.className === "flash"){
            el.className = "noFlash";
        } else {
            el.className = "flash";
        }
    },
    eeTwo : function () { //color scheme to jungle

        view.eeSix(); //reset

        var detailEls = document.getElementsByClassName("detail");
        for (let i=0; i<detailEls.length; i++) {
            detailEls[i].style.backgroundColor="rgb(22, 96, 75)";
        }
        var btnEls = document.getElementsByClassName("btn");
        for (let i=0; i<btnEls.length; i++) {
            btnEls[i].style.backgroundColor = "rgb(195, 146, 32)";
        }
        var btnExtra = document.getElementsByClassName("operators");
        for (let i=0; i<btnExtra.length; i++) {
            btnExtra[i].style.borderTopColor = "rgb(195, 146, 32)";
        }
    },
    eeThree : function () { // color scheme to orange candy

        view.eeSix(); // reset

        var detailEls = document.getElementsByClassName("detail");
        for (let i=0; i<detailEls.length; i++) {
            detailEls[i].style.backgroundColor="rgb(165, 146, 254)";
        }
        var btnEls = document.getElementsByClassName("btn");
        for (let i=0; i<btnEls.length; i++) {
            btnEls[i].style.backgroundColor = "rgb(254, 146, 165)";
        }
        var btnExtra = document.getElementsByClassName("operators");
        for (let i=0; i<btnExtra.length; i++) {
            btnExtra[i].style.borderTopColor = "rgb(254, 146, 165)";
        }
    },
    eeFour : function () { // color scheme to rainbow

        //lighter green and lighter blue

        view.eeSix(); // reset
        //9 and ac red
        (document.getElementById("nine")).style.backgroundColor ="red";
        (document.getElementById("ac")).style.backgroundColor ="orange";
        //6,8 orange
        (document.getElementById("six")).style.backgroundColor ="orange";
        (document.getElementById("eight")).style.backgroundColor ="orange";
        //3,5,7 yellow
        (document.getElementById("three")).style.backgroundColor ="yellow";
        (document.getElementById("five")).style.backgroundColor ="yellow";
        (document.getElementById("seven")).style.backgroundColor ="yellow";
        //0,2,4,/ green
        (document.getElementById("zero")).style.backgroundColor ="green";
        (document.getElementById("two")).style.backgroundColor ="green";
        (document.getElementById("four")).style.backgroundColor ="green";
        (document.getElementById("divide")).style.backgroundColor ="green";
        (document.getElementById("divide")).style.borderTopColor ="green";
        //1, x ...red!
        (document.getElementById("one")).style.backgroundColor ="red";
        (document.getElementById("multiply")).style.backgroundColor ="red";
        (document.getElementById("multiply")).style.borderTopColor ="red";
        //. = - indigo
        (document.getElementById("decimal")).style.backgroundColor ="red";
        (document.getElementById("equals")).style.backgroundColor ="indigo";
        (document.getElementById("subtract")).style.backgroundColor ="indigo";
        (document.getElementById("subtract")).style.borderTopColor ="indigo";
        //ce + violet
        (document.getElementById("ce")).style.backgroundColor ="violet";
        (document.getElementById("plus")).style.backgroundColor ="violet";

        (document.getElementById("strip-ll")).style.backgroundColor ="orange";
        (document.getElementById("strip-l")).style.backgroundColor ="green";
        (document.getElementById("blue-square")).style.backgroundColor ="yellow";
        (document.getElementById("entry")).style.backgroundColor ="violet";
        (document.getElementById("main-lens")).style.backgroundColor ="green";
        (document.getElementById("strip-rr")).style.backgroundColor ="indigo";
        (document.getElementById("hbase")).style.backgroundColor ="yellow";

        (document.getElementById("big-vent-r")).style.backgroundColor ="violet";
        (document.getElementById("big-vent-l")).style.backgroundColor ="violet";
        (document.getElementById("hexagon")).style.backgroundColor ="green";

        (document.getElementById("blue-stripe2")).style.backgroundColor ="red";
        (document.getElementById("black-stripe2")).style.backgroundColor ="yellow";
        (document.getElementById("blue-stripe3")).style.backgroundColor ="green";

        (document.getElementById("ee1")).style.backgroundColor ="red";
        (document.getElementById("ee2")).style.backgroundColor ="orange";
        (document.getElementById("ee3")).style.backgroundColor ="yellow";
        (document.getElementById("ee4")).style.backgroundColor ="green";
        (document.getElementById("ee5")).style.backgroundColor ="indigo";
        (document.getElementById("ee6")).style.backgroundColor ="violet";


    },
    eeFive : function () { // PARTY MODE

        view.eeSix(); //reset

        var x = 0;
        var partyBackground = setInterval(function() {

            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            let randomRGB = "rgb("+r+","+g+","+b+")";
            let randomRev = "rgb("+b+","+g+","+r+")";

            var detailEls = document.getElementsByClassName("detail");
            for (let i=0; i<detailEls.length; i++) {
                detailEls[i].style.backgroundColor=randomRGB;
            }
            var btnEls = document.getElementsByClassName("btn");
            for (let i=0; i<btnEls.length; i++) {
                btnEls[i].style.backgroundColor = randomRev;
            }
            var btnExtra = document.getElementsByClassName("operators");
            for (let i=0; i<btnExtra.length; i++) {
                btnExtra[i].style.borderTopColor = randomRev;
            }
            if (++x === 12) {
                window.clearInterval(partyBackground)
            }
        },250)
    },
    eeSix : function () { //reset to default

        var detailEls = document.getElementsByClassName("detail");
        for (let i=0; i<detailEls.length; i++) {
            detailEls[i].style.backgroundColor="#3366ff";
        }
        var btnEls = document.getElementsByClassName("btn");
        for (let i=0; i<btnEls.length; i++) {
            btnEls[i].style.backgroundColor = "skyblue";
        }
        var btnExtra = document.getElementsByClassName("operators");
        for (let i=0; i<btnExtra.length; i++) {
            btnExtra[i].style.borderTopColor = "skyblue";
        }

        (document.getElementById("big-vent-r")).style.backgroundColor ="white";
        (document.getElementById("big-vent-l")).style.backgroundColor ="white";
        (document.getElementById("black-stripe2")).style.backgroundColor ="black";
        (document.getElementById("ee1")).style.backgroundColor ="#3366ff";
        (document.getElementById("ee2")).style.backgroundColor ="#3366ff";
        (document.getElementById("ee3")).style.backgroundColor ="#3366ff";
        (document.getElementById("ee4")).style.backgroundColor ="#3366ff";
        (document.getElementById("ee5")).style.backgroundColor ="#3366ff";
        (document.getElementById("ee6")).style.backgroundColor ="#3366ff";
        (document.getElementById("hexagon")).style.backgroundColor ="#000";
    }
}


listeners.setUpEventListeners();
listeners.setUpEasterEggListeners();



// TESTS PROGRAM

// ADD OPERATOR AS EQUALS - PASS
// calculator.display();
// calculator.numBtns.one();
// calculator.numBtns.two(); //12
// calculator.operations.add(); //12
// calculator.numBtns.one();
// calculator.numBtns.two();
// calculator.operations.add(); //12 + 12
// calculator.display(); // stored 24, nxt 0


// SUBTRACT OP  -  PASS
// calculator.display();
// calculator.numBtns.four();
// calculator.numBtns.zero();
// calculator.operations.subtract();
// calculator.display();
// calculator.numBtns.one();
// calculator.numBtns.zero();
// calculator.operations.equals();
// calculator.display(); //stored 30, next 0


// MULTIPLY OP  -  PASS
// calculator.display();
// calculator.numBtns.four();
// calculator.numBtns.zero();
// calculator.operations.multiply();
// calculator.display();
// calculator.numBtns.one();
// calculator.numBtns.zero();
// calculator.operations.equals();
// calculator.display(); //stored 400, next 0


// DIVIDE OP  (and ac) -  PASS
// calculator.operations.ac();
// calculator.display();
// calculator.numBtns.four();
// calculator.numBtns.zero();
// calculator.operations.divide();
// calculator.display();
// calculator.numBtns.one();
// calculator.numBtns.zero();
// calculator.operations.equals();
// calculator.display(); //stored 4, next 0


// DECIMALS LEADING ZEROES - PASS (ish)
// calculator.operations.ac();
// calculator.numBtns.one();
// calculator.numBtns.two();
// calculator.numBtns.decimal();
// calculator.numBtns.one();
// calculator.numBtns.two();
// calculator.display(); //12.12
// calculator.operations.add();
//
// calculator.numBtns.one();
// calculator.numBtns.two();
// calculator.numBtns.decimal();
// calculator.numBtns.one();
// calculator.numBtns.zero();
// calculator.numBtns.zero();
// calculator.numBtns.zero();
// calculator.numBtns.two(); //12.12 + 12.10002
// calculator.display();
//
// calculator.operations.equals();
// calculator.display(); // 24.22002 (js gives 24.220019999999998)


// TEST CE WITH STORED
// calculator.operations.ac();
// calculator.numBtns.one();
// calculator.numBtns.two();
// calculator.numBtns.decimal();
// calculator.numBtns.one();
// calculator.numBtns.zero();
// calculator.numBtns.one();
// calculator.operations.equals();
// calculator.display(); //stored 12.101 next
//
// calculator.numBtns.one();
// calculator.numBtns.two();
// calculator.display(); //stored 12.101, next 12
// calculator.operations.ce();
// calculator.display(); //stored 12.101, next 0



// EQUALS PRESSED WITH NO OPERATOR - PASS
// current num on screen, whether stored or next, becomes stored num
// calculator.display();
// calculator.numBtns.one();
// calculator.numBtns.one();
// calculator.operations.equals();
// calculator.display(); // 11
// calculator.numBtns.two();
// calculator.numBtns.two();
// calculator.operations.equals();
// calculator.display(); // stored 22, next 0

// EQUALS PRESSED BEFORE ANY BASENUM - PASS
// calculator.display();
// calculator.numBtns.one();
// calculator.numBtns.one();
// calculator.operations.equals();
// calculator.display(); // stored: 11, next: 0, hasBase true
// calculator.numBtns.two();
// calculator.numBtns.two();
// calculator.display(); // stored: 11, next: 22


// CONTINUOUS EQUALS PRESS ADD - PASS
// calculator.display();
// calculator.numBtns.one();
// calculator.operations.add();
// calculator.numBtns.two();
// calculator.operations.equals();
// calculator.display(); // 3
// calculator.operations.equals();
// calculator.display(); // 5
// calculator.operations.equals();
// calculator.display(); // 7

// CONTINUOUS EQUALS PRESS MULT - PASS
// calculator.display();
// calculator.numBtns.one();
// calculator.operations.multiply();
// calculator.numBtns.two();
// calculator.operations.equals();
// calculator.display(); // 2
// calculator.operations.equals();
// calculator.display(); // 4
// calculator.operations.equals();
// calculator.display(); // 8

// CONTINUOUS EQUALS PRESS DIVIDE - PASS
// calculator.display();
// calculator.numBtns.one();
// calculator.operations.divide();
// calculator.numBtns.two();
// calculator.operations.equals();
// calculator.display(); // 0.5
// calculator.operations.equals();
// calculator.display(); // 0.25
// calculator.operations.equals();
// calculator.display(); // 0.125
//
// calculator.operations.multiply();
// calculator.numBtns.seven();
// calculator.operations.equals();
// calculator.display(); // 0.875


// DISPLAY TEST - unknown
// calculator.display();
// calculator.numBtns.one();
// calculator.operations.divide();
// calculator.numBtns.two();
// calculator.operations.equals();
// calculator.display(); // 0.5
// calculator.operations.equals();
// calculator.display(); // 0.25
// calculator.operations.multiply();
// calculator.numBtns.four();
// calculator.operations.equals();
// view.displayEval();
