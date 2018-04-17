/* 
 */
//document.getElementById('myModal').style.display = "block";
//document.getElementById('stage2StartModalContent').style.display = "block";

//canvas init

iniBack("world6Canvas");
iniFront("frontCanvas");

//Music
playMusic(fightMusic);
var plussChar = createAnimatedSprite('assets/characters/plussCharSpr.png', 1200, 300, 300, 300, 4, 30);
var minusChar = createAnimatedSprite('assets/characters/minusCharSpr.png', 8400, 300, 600, 300, 14, 2);
var multiplicationChar = createAnimatedSprite('assets/characters/MultiplicationCharSpr.png', 1800, 300, 300, 300, 6, 30);
var divisionChar = createAnimatedSprite('assets/characters/divisionCharSpr.png', 1200, 300, 300, 300, 22, 1);
var roundingChar = createAnimatedSprite('assets/characters/roundingChar.png', 1800, 300, 300, 300, 6, 15);
var erlikChar = createAnimatedSprite('assets/characters/ErlikStanding.png', 300, 5400, 300, 300, 18, 10);

var gameState = 0;
setBeforeGame();


iniBackgroundEffects(1);

// Game variables

var firstNumber = 0;
var secondNumber = 0;
var questionAnswer = 0;

var operators = [{
    sign: "+",
    gameChar: plussChar,
    method: function(a,b){ return a + b; }
},{
    sign: "-",
    gameChar: minusChar,
    method: function(a,b){ return a - b; }
}, {
    sign: "x",
    gameChar: multiplicationChar,
    method: function(a,b){ return a * b; }
},  {
    sign: "/",
    gameChar: divisionChar,
    method: function(a,b){ return a / b; }
},  {
    sign: "round",
    gameChar: roundingChar,
    method: function(a,b){ return Math.round(a); }
}
];


var erlikHP = 100;
var playerHP = 100;


//PlayerVariables
var player = {
    playerChar: null
};

var checkBox = {
    x: W * (38/100),
    y: H * (27/100),
    w: W * (11/100),
    h: H * (16/100),
}

var userInputX = 0;
var userInputY = 0;

// Player Controll
var timer = 0;
userInputGame = true;

window.addEventListener("mousemove", mouseMove);

function mouseMove(event) {
    userInputX = (event.x - frontCanvas.offsetLeft);
    userInputY = (event.y - frontCanvas.offsetTop);
    event.preventDefault();
}

window.addEventListener("touchmove", touchMove);

function touchMove(event) {
    userInputX = (event.touches[0].clientX - frontCanvas.offsetLeft);
    userInputY = (event.touches[0].clientY - frontCanvas.offsetTop);
}

window.addEventListener("touchstart", touchStart);

function touchStart() {
    movePlayer();
    if (timer === 0) {
        timer = setInterval(movePlayer, 20);
    }
}

window.addEventListener("touchend", touchEnd);

function touchEnd() {
    clearInterval(timer);
    timer = 0;
}

window.addEventListener("mousedown", mouseDown);

function mouseDown() {
    checkIfClickedOnAnyChars();
}

window.addEventListener("mouseup", mouseUp);

function mouseUp() {
    player.playerChar = null;
}

function movePlayer() {
    if (userInputX < W / 2) {
        player.playerPlacement = 0;
    } else if (userInputX > W / 2) {
        player.playerPlacement = 1;
    }
}

var spriteWidthTemp = W / 8;
var spriteHeighTemp = H / 9;
var spriteStartYTemp = H / 3;

function checkIfClickedOnAnyChars() {
    //PlussChar
    if(checkCollision(userInputX, userInputY, 10, 10,
        10 + 100, spriteStartYTemp, spriteWidthTemp, spriteHeighTemp)) {
        player.playerChar = plussChar;
    } else if (checkCollision(userInputX, userInputY, 10, 10,
        10 + 50, spriteStartYTemp + ((H/8) * 1), spriteWidthTemp, spriteHeighTemp)) {
        player.playerChar = minusChar;
    } else if (checkCollision(userInputX, userInputY, 10, 10,
        10 + 100, spriteStartYTemp + ((H/8) * 2), spriteWidthTemp, spriteHeighTemp)) {
        player.playerChar = multiplicationChar;
    } else if (checkCollision(userInputX, userInputY, 10, 10,
        10 + 150, spriteStartYTemp + ((H/8) * 3), spriteWidthTemp, spriteHeighTemp)) {
        player.playerChar = divisionChar;
    } else if (checkCollision(userInputX, userInputY, 10, 10,
        10 + 200, spriteStartYTemp + ((H/8) * 4), spriteWidthTemp, spriteHeighTemp)) {
        player.playerChar = roundingChar;
    }
    return false;
}

//Lets draw the flakes
function draw()
{
    backCtx.clearRect(0, 0, W, H);
    frontCtx.clearRect(0, 0, W, H);

    drawBack();
    drawFront();

    function drawBack() {
        backCtx.fillStyle = "rgba(30, 30, 30, 1)";
        backCtx.beginPath();
        backCtx.rect(0, H/3, W, H);
        backCtx.fill();
        updateBackgroundEffects(1);
    }

    function drawFront() {

        if(player.playerChar != plussChar) {
            drawSpriteImage(frontCtx, plussChar, 10 + 50, spriteStartYTemp, spriteWidthTemp, spriteHeighTemp);
        }
        if(player.playerChar != minusChar) {
            drawSpriteImage(frontCtx, minusChar, 10 + 50, spriteStartYTemp + ((H/8) * 1), spriteWidthTemp, spriteHeighTemp);
        }
        if(player.playerChar != multiplicationChar) {
            drawSpriteImage(frontCtx, multiplicationChar, 10 + 100, spriteStartYTemp + ((H/8) * 2),spriteWidthTemp, spriteHeighTemp);
        }
        if(player.playerChar != divisionChar) {
            drawSpriteImage(frontCtx, divisionChar, 10 + 150, spriteStartYTemp + ((H/8) * 3), spriteWidthTemp, spriteHeighTemp);
        }
        if(player.playerChar != roundingChar) {
            drawSpriteImage(frontCtx, roundingChar, 10 + 200, spriteStartYTemp + ((H/8) * 4), spriteWidthTemp, spriteHeighTemp);
        }

        drawSpriteImage(frontCtx, erlikChar, W - ((W / 4)), H / 4, W / 5, W / 4);

        plussChar.updateFrame();
        minusChar.updateFrame();
        multiplicationChar.updateFrame();
        divisionChar.updateFrame();
        roundingChar.updateFrame();
        erlikChar.updateFrame();

        frontCtx.fillStyle = "rgba(0, 0, 0, 1)";
        frontCtx.beginPath();
        frontCtx.rect(0, 0, W, H * (20/100));
        frontCtx.fill();

        //Player healthbar

        frontCtx.fillStyle = "rgba(255, 255, 255, 1)";
        frontCtx.font = "30px Arial";
        frontCtx.fillText("Your HP: ", W * (5/100), H*(5/100));

        frontCtx.fillStyle = "rgba(255, 0, 0, 1)";
        frontCtx.beginPath();
        frontCtx.rect(W*(5/100), H * (8/100), W * (35/100), H * (10/100));
        frontCtx.fill();

        //Erlik healthbar

        frontCtx.fillStyle = "rgba(255, 255, 255, 1)";
        frontCtx.font = "30px Arial";
        frontCtx.fillText("Erlik's HP: ", W * (60/100), H*(5/100));

        frontCtx.fillStyle = "rgba(255, 0, 0, 1)";
        frontCtx.beginPath();
        frontCtx.rect(W*(60/100), H * (8/100), W * (35/100), H * (10/100));
        frontCtx.fill();

        if (gameState === 1) {
            updateGame();
            frontCtx.fillStyle = "rgba(255, 255, 255, 1)";
            frontCtx.beginPath();
            frontCtx.rect(W * (25/100), H * (25/100), W * (50/100), H * (20/100));
            frontCtx.fill();

            frontCtx.fillStyle = "rgba(0, 0, 0, 1)";
            frontCtx.beginPath();
            frontCtx.rect(W * (26/100), H * (26/100), W * (48/100), H * (18/100));
            frontCtx.fill();

            //Player current health
            frontCtx.fillStyle = "rgba(0, 255, 0, 1)";
            frontCtx.beginPath();
            frontCtx.rect(W*(5/100), H * (8/100), W * (35/100) * (playerHP/100), H * (10/100));
            frontCtx.fill();

            // Erliks current health
            frontCtx.fillStyle = "rgba(0, 255, 0, 1)";
            frontCtx.beginPath();
            frontCtx.rect(W*(60/100), H * (8/100), W * (35/100) * (erlikHP/100), H * (10/100));
            frontCtx.fill();

            frontCtx.fillStyle = "rgba(255, 255, 255, 1)";
            frontCtx.font = "80px Arial";
            frontCtx.fillText(firstNumber, W * (30/100), H * (37/100));

            frontCtx.fillStyle = "rgba(255, 255, 255, 1)";
            frontCtx.font = "80px Arial";
            frontCtx.fillText(secondNumber, W * (55/100), H * (37/100));

            frontCtx.fillStyle = "rgba(255, 255, 255, 1)";
            frontCtx.font = "80px Arial";
            frontCtx.fillText("= " + questionAnswer, W * (65/100), H * (37/100));

            frontCtx.strokeStyle = "rgba(255, 255, 255, 1)";
            frontCtx.beginPath();
            frontCtx.rect(checkBox.x, checkBox.y, checkBox.w, checkBox.h);
            frontCtx.stroke();
        }

        if(player.playerChar != null) {
            drawSpriteImage(frontCtx, player.playerChar, userInputX-(spriteWidthTemp/2), userInputY-(spriteHeighTemp/2), spriteWidthTemp, spriteHeighTemp);
        }
    }
}

function updateGame() {

    if (erlikHP <= 0) {
        setWinGame();
    } else if (playerHP <= 0) {
        setGameOver();
    }

    if (player.playerChar != null) {
        if(checkCollision(userInputX, userInputY, 20, 20, checkBox.x + checkBox.w/2, checkBox.y + checkBox.h/2, 20, 20)) {
            if(player.playerChar === plussChar) {
                if(operators[0].method(firstNumber, secondNumber) === questionAnswer) {
                    erlikHP--;
                }
            } else if (player.playerChar === minusChar) {
                if(operators[1].method(firstNumber, secondNumber) === questionAnswer) {
                    erlikHP--;
                }
            } else if (player.playerChar === multiplicationChar) {
                if(operators[2].method(firstNumber, secondNumber) === questionAnswer) {
                    erlikHP--;
                }
            } else if (player.playerChar === divisionChar) {
                if(operators[3].method(firstNumber, secondNumber) === questionAnswer) {
                    erlikHP--;
                }
            } else if (player.playerChar === roundingChar) {
                if(operators[4].method(firstNumber, secondNumber) === questionAnswer) {
                    erlikHP--;
                }
            }
        }
    }
}

function setGameOver() {
    gameState = 0;
    document.getElementById('myModal').style.display = "block";
    document.getElementById("gameOverModalContent").style.display = "block";
    document.getElementById("startModalContent").style.display = "none";
    document.getElementById("winModalContent").style.display = "none";
    restartGame();
}

function setStartGame() {
    gameState = 1;
    gameSpeed = 5;
    document.getElementById('myModal').style.display = "none";
    document.getElementById("gameOverModalContent").style.display = "none";
    document.getElementById("startModalContent").style.display = "none";
    document.getElementById("winModalContent").style.display = "none";

    restartGame();
}

function setBeforeGame() {
    gameState = 0;
    document.getElementById('myModal').style.display = "block";
    document.getElementById("gameOverModalContent").style.display = "none";
    document.getElementById("startModalContent").style.display = "block";
    document.getElementById("winModalContent").style.display = "none";
}

function setWinGame() {
    gameState = 0;
    document.getElementById('myModal').style.display = "block";
    document.getElementById("gameOverModalContent").style.display = "none";
    document.getElementById("startModalContent").style.display = "none";
    document.getElementById("winModalContent").style.display = "block";
}

function restartGame() {
    // Game variables
    //Hinder Object

    firstNumber = Math.round(Math.random() * 10);
    secondNumber = Math.round(Math.random() * 10);
    questionAnswer = operators[Math.round(Math.random() * 4)].method(firstNumber, secondNumber);
}

//animation loop, 60 fps
animationLoop = setInterval(draw, 16);