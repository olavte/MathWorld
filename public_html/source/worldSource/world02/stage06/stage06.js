/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 */
var candyPrice = randomNumber(10) + 1;
var moneyOnHand = Math.floor(Math.random() * 40) + 15;


// variables for questions
var answer;
var totalSum = 0;

//canvas init
iniBack("world2Canvas");

var minusCharacter = createAnimatedSprite('assets/characters/minusCharSpr.png', 8400, 300, 600, 300, 14, 2);

//backgroundEffects
iniBackgroundEffects(1);

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);

    minusCharacter.updateFrame();


    updateBackgroundEffects(1);
    backCtx.drawImage(minusCharacter.image, minusCharacter.srcX, minusCharacter.srcY, minusCharacter.spriteWidth,
        minusCharacter.spriteHeight, 60, 50, minusCharacter.spriteWidth, minusCharacter.spriteHeight);
}

//animation loop
animationLoop = setInterval(draw, 33);


mathTwoFirst();
//mathTwoSecond();
//creates a random price for a candy
//and a random value of money you have on hand


//final level in world 1, for special assignement and timer function
function mathTwoFirst() {
    var answer = Math.floor(moneyOnHand - candyPrice);
    var options = [answer, randomNumber(25) + 1, randomNumber(20) + 1, randomNumber(20) + 1];
    shuffle(options);

    document.getElementById('question04').innerHTML = "If you buy a candy, costing " + candyPrice + " cents, and you have " + moneyOnHand + " cents, how much money do you have left??";
    var text = "<ul>";
    for (i = 0; i < options.length; i++) {
        if (options[i] === answer) {
            text += "<button onclick='victoryScreen()' style='height:50px;width:100px'>" + options[i] + "</button>"; // rett svar knapp
        } else {
            text += "<button onclick='sadnessScreen()' style='height:50px;width:100px'>" + options[i] + "</button>"; // feil svar knapp
        }
    }
    document.getElementById('stage2answers').innerHTML = text;
}

function mathTwoSecond() {

    var num2 = randomNumber(10) + 1;
    var num1 = randomNumber(10) + 1 + num2;
    var answer = num1 - num2;
    var options = [answer, randomNumber(15) + 1, randomNumber(20) + 1, randomNumber(15) + 1];
    shuffle(options);

    document.getElementById('question04').innerHTML = "If this candy is " + num1 + " - " + num2 + "cents, how much does the candy cost?";
    var text = "<ul>";
    for (i = 0; i < options.length; i++) {
        if (options[i] === answer) {
            text += "<button onclick='victoryScreen2()' style='height:50px;width:100px'>" + options[i] + "</button>"; // rett svar knapp
        } else {
            text += "<button onclick='sadnessScreen2()' style='height:50px;width:100px'>" + options[i] + "</button>"; // feil svar knapp
        }
    }
    document.getElementById('stage2answers').innerHTML = text;
}

function mathTwoThird() {


    var num3 = randomNumber(10) + 1;
    var num2 = randomNumber(10) + 1;
    var num1 = randomNumber(10) + 1 + num2 + num3;
    var answer = num1 - num2 - num3;
    var options = [answer, randomNumber(15) + 1, randomNumber(20) + 1, randomNumber(15) + 1];
    shuffle(options);

    document.getElementById('question04').innerHTML = "If this candy is " + num1 + " - " + num2 + " - " + num3 + " cents, how much does the candy cost?";
    var text = "<ul>";
    for (i = 0; i < options.length; i++) {
        if (options[i] === answer) {
            text += "<button onclick='victoryScreen3()' style='height:50px;width:100px'>" + options[i] + "</button>"; // rett svar knapp
        } else {
            text += "<button onclick='sadnessScreen3()' style='height:50px;width:100px'>" + options[i] + "</button>"; // feil svar knapp
        }
    }
    document.getElementById('stage2answers').innerHTML = text;
}


//Lets user know they were correct, 
function victoryScreen() {


    document.getElementById('stage2answers').innerHTML = "CORRECT!";

    document.getElementById("mathbutton2").disabled = false;

}

//lets user know they pressed wrong
function sadnessScreen() {

    document.getElementById('stage2answers').innerHTML = "WRONG!";
    document.getElementById('reload').innerHTML = "<button onclick='mathTwoFirst()'>Try Again!</button>";
}


function victoryScreen2() {

    document.getElementById('stage2answers').innerHTML = "CORRECT!";

    document.getElementById("mathbutton3").disabled = false;

}

function sadnessScreen2() {

    document.getElementById('stage2answers').innerHTML = "WRONG!";
    document.getElementById('reload').innerHTML = "<button onclick='mathTwoSecond()'>Try Again!</button>";
}


function victoryScreen3() {

    document.getElementById('stage2answers').innerHTML = "CORRECT!!" + "<br/>" + "Move on to next stage";
    if (currentStage < 6) {
        currentStage = 6;
    }
    document.getElementById("nextstage").disabled = false;


}


//functions for math and questions below
function backToWorld() {
    goToNewScreen('source/worldSource/world02/world02.html', 'source/worldSource/world02/world02.js');
}

function sadnessScreen3() {

    document.getElementById('stage2answers').innerHTML = "WRONG!";
    document.getElementById('reload').innerHTML = "<button onclick='mathTwoThird()'>Try Again!</button>";
}


//få random nummer
//@param opp til nummer upToo
//@return random nummer
function randomNumber(upToo) {
    var randNumb = Math.floor(Math.random() * upToo);
    return randNumb;
}


//shuffle array (like answer array) (Modern Fisher–Yates shuffle algorithm via 
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

/* function clikedPic(clickedId) {

var value = document.getElementById(clickedId);
totalSum = candyPrice + totalSum;
document.getElementById('total04').innerHTML = "Money spent: " + totalSum + " cents";
} */