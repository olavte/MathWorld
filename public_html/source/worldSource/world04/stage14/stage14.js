/* 
 */
//document.getElementById('myModal').style.display = "block";
//document.getElementById('stage2StartModalContent').style.display = "block";

//canvas init

iniBack("world4Canvas");

iniMiddle("middleCanvas");

iniFront("frontCanvas");

//Music
playMusic(norwayMusic);
var divisionCharacter = createAnimatedSprite('assets/characters/divisionCharSpr.png', 1200, 300, 300, 300, 22, 1);

var gameState = 0;
setBeforeGame();

iniBackgroundEffects(1);

// Game variables

var firstNumber = 0;
var secondNumber = 0;
var questionAnswer = 0;
var gameSpeed = 7;

//Math Objects
var mathObjects = [];
for(var i = 0; i < 4; i++) {
    mathObjects.push({
        name:"math" + (i + 1),
        mathX:W + ((Math.random() * (W / 2))),
        mathY:H - 150,
        mathW:W/40,
        mathNumber:0});
}

//PlayerVariables
var player = {
    playerX: W / 12,
    playerY: H - 150,
    playerHeight: H / 8,
    playerWidth: W / 10
};

var isJumping = false;
var isFalling = false;
var jumpBoost = 90;
var speed = 0;

var userInputY = 0;

// Player Controll
var timer = 0;
userInputGame = true;

window.addEventListener("touchstart", touchStart);
function touchStart() {
    if ((!isJumping) && (!isFalling)) {    
        speed = 100;
        isJumping = true;
        isFalling = false;
    }
}

window.addEventListener("mousedown", mouseDown);
function mouseDown() {
    if ((!isJumping) && (!isFalling)) {   
        speed = jumpBoost;
        isJumping = true;
        isFalling = false;
    }
}


function movePlayer() {
    var gravity = 5;
    
    if (isJumping || isFalling)
    {
        speed -= gravity;
    }
    
    
    if ((isJumping) && (speed > 0))
    {
    } else if ((isJumping) && (speed <= 0)){
        isJumping = false;
        isFalling = true;
    }
    
    if ((isFalling) && (player.playerY < H - 150)){
    } else if ((isFalling) && (player.playerY >= H - 150)){
        player.playerY = H -150;
        speed = 0;
        isJumping = false;
        isFalling = false;
    }
    
    //Update playerY
    player.playerY -= speed;
}


//Lets draw the flakes
function draw()
{
    backCtx.clearRect(0, 0, W, H);
    middleCtx.clearRect(0, 0, W, H);
    frontCtx.clearRect(0, 0, W, H);

    drawBack();
    drawMiddle();
    drawFront();

    function drawBack() {
        updateBackgroundEffects(1);
    }

    function drawMiddle() {

        middleCtx.fillStyle = "rgba(255, 255, 255, 1)";
        middleCtx.beginPath();
        middleCtx.rect(0, 0, W, H);
        middleCtx.fill();
        
        middleCtx.fillStyle = "rgba(0, 0, 0, 1)";
        middleCtx.beginPath();
        middleCtx.strokeRect(0, 0, W, H);
        middleCtx.fill();

        drawSpriteImage(middleCtx, divisionCharacter, player.playerX, player.playerY, player.playerWidth, player.playerHeight);
        divisionCharacter.updateFrame();

        if (gameState === 1) {

            updateGame();

            mathObjects.forEach(function(mathObject) {
                middleCtx.fillStyle = "rgba(0, 0, 0, 1)";
                middleCtx.beginPath();
                middleCtx.rect(mathObject.mathX, mathObject.mathY, mathObject.mathW, mathObject.mathH);
                middleCtx.fill();
                middleCtx.fillStyle = "rgba(255, 255, 255, 1)";
                middleCtx.font = "60px Arial";
                middleCtx.fillText(mathObject.mathNumber, mathObject.mathX
                    + (mathObject.mathW/2), mathObject.mathY
                    + (mathObject.mathH/2));
            });
        }
    }
}

function updateGame() {
    movePlayer();
    
    if (gameSpeed === 20) {
        setWinGame();
    } else if (gameSpeed === 10) {
        setGameOver();
    }

    mathObjects.forEach(function(mathObject) {
        if(checkCollision(player.playerX, player.playerY, player.playerWidth - 100, player.playerHeight - 50,
               mathObject.mathX, mathObject.mathY, mathObject.mathW - 100, mathObject.mathW)) {
            if (mathObject.mathNumber === questionAnswer) {
               gameSpeed++;
               restartGame();
            } else {
               gameSpeed--;
               restartGame();
            }
        }
        
        mathObject.mathX -= gameSpeed;
        if (mathObject.mathX < -500) {
            mathObject.mathX = W + 500;
            mathObject.mathY = H - 150;
        }
    });
}

function setGameOver() {
    gameState = 0;
    playSound('assets/sound/lostGame.mp3');
    document.getElementById('myModal').style.display = "block";
    document.getElementById("gameOverModalContent").style.display = "block";
    document.getElementById("startModalContent").style.display = "none";
    document.getElementById("winModalContent").style.display = "none";
    restartGame();
}

function setStartGame() {
    gameState = 1;
    gameSpeed = 15;
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
    if(currentStage < 4) {
        currentStage = 4;
    }
    document.getElementById('myModal').style.display = "block";
    document.getElementById("gameOverModalContent").style.display = "none";
    document.getElementById("startModalContent").style.display = "none";
    document.getElementById("winModalContent").style.display = "block";
}


function randomNumber(upTo) {
    var zeroCheck = true;
    while (zeroCheck) {
        var randNumb = Math.floor(Math.random() * upTo);
        
        if (randNumb != 0 && randNumb != 1) {
            zeroCheck = false;;
        }
    }
    return randNumb;
}


function countDecimals(number) {
  var match = (''+number).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  return Math.max(
       0,
       // Number of digits right of decimal point.
       (match[1] ? match[1].length : 0)
       // Adjust for scientific notation.
       - (match[2] ? +match[2] : 0));
}


function restartGame() {
    // Game variables

    var decimalCheck = true;
       
    while (decimalCheck) {
        firstNumber = randomNumber(100);
        secondNumber = randomNumber(12);
        questionAnswer = firstNumber / secondNumber;
               
        if((countDecimals(questionAnswer) === 0) && (questionAnswer != 1) && (questionAnswer < 13)) {
            decimalCheck = false;
        }
    }

    document.getElementById("questionBox").innerHTML 
            = firstNumber + " / " + secondNumber + " = ??     Score: " 
            + gameSpeed;
    newX = W;
    //Math Object
    mathObjects.forEach(function(mathObject) {
            mathObject.mathX = newX;
            mathObject.mathY = H - 150;
            mathObject.mathW = W / 10;
            mathObject.mathH = H / 10;
            mathObject.mathNumber = Math.round(Math.random() * 20);
            newX += 750;
    });
    var ansIndex = Math.round((Math.random() * (mathObjects.length)));
    console.log(ansIndex);
    console.log(mathObjects.length);
    mathObjects[ansIndex].mathNumber = firstNumber / secondNumber;
}

//animation loop, 60 fps
animationLoop = setInterval(draw, 16);