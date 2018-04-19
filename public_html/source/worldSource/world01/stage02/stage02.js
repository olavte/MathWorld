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
iniBack("world1Canvas");

var plussCharacter = createAnimatedSprite('assets/characters/plussCharSpr.png', 1200, 300, 300, 300, 4, 30);

//backgroundEffects
iniBackgroundEffects(1);

//Lets draw the flakes
function draw() {
    backCtx.clearRect(0, 0, W, H);

    plussCharacter.updateFrame();


    updateBackgroundEffects(1);
    backCtx.drawImage(plussCharacter.image, plussCharacter.srcX, plussCharacter.srcY, plussCharacter.spriteWidth,
        plussCharacter.spriteHeight, 60, 140, plussCharacter.spriteWidth, plussCharacter.spriteHeight);
}

//animation loop
animationLoop = setInterval(draw, 33);


mathTwoFirst();
//mathTwoSecond();
//creates a random price for a candy
//and a random value of money you have on hand


//final level in world 1, for special assignement and timer function
function mathTwoFirst() {


    var num1 = randomNumber(10) + 1;
    var num2 = randomNumber(10) + 1;
    var answer = num1 + num2;
    var options = [answer, randomNumber(15) + 1, randomNumber(20) + 1, randomNumber(15) + 1];
    shuffle(options);

    document.getElementById('question04').innerHTML = "If this candy is " + num1 + " + " + num2 + " cents, how much does the candy cost?";
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

    
    var num1 = randomNumber(10) + 1;
    var num2 = randomNumber(10) + 1;
    var num3 = randomNumber(10) + 1;
    var answer = num1 + num2 + num3;
    var options = [answer, randomNumber(15) + 1, randomNumber(20) + 1, randomNumber(15) + 1];
    shuffle(options);

    document.getElementById('question04').innerHTML = "If this candy is " + num1 + " + " + num2 + " + " + num3 +" cents, how much does the candy cost?";
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


    var num1 = randomNumber(10) + 1;
    var num2 = randomNumber(10) + 1;
    var num3 = randomNumber(10) + 1;
    var num4 = randomNumber(10) + 1;
    var answer = num1 + num2 + num3 + num4;
    var options = [answer, randomNumber(15) + 1, randomNumber(20) + 1, randomNumber(15) + 1];
    shuffle(options);

    document.getElementById('question04').innerHTML = "If this candy is " + num1 + " + " + num2 + " + " + num3 + " + " + num4 + " cents, how much does the candy cost?";
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
    if (currentStage < 2) {
        currentStage = 2;
    }
    document.getElementById("nextstage").disabled = false;
    document.getElementById("levelFinal").disabled = false;
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