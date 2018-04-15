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

//PlayerVariables
var player = {
    playerChar: null
};

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

        if(player.playerChar != null) {
            drawSpriteImage(frontCtx, player.playerChar, userInputX-(spriteWidthTemp/2), userInputY-(spriteHeighTemp/2), spriteWidthTemp, spriteHeighTemp);
        }

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


        if (gameState === 1) {

            updateGame();
        }
    }
}

function updateGame() {

    if (gameSpeed === 10) {
        setWinGame();
    } else if (gameSpeed === 0) {
        setGameOver();
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
    questionAnswer = firstNumber + secondNumber;
}

//animation loop, 60 fps
animationLoop = setInterval(draw, 16);