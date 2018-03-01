/* 
 */
//document.getElementById('myModal').style.display = "block";
//document.getElementById('stage2StartModalContent').style.display = "block";

//canvas init

var backCanvas = document.getElementById("stageCanvas");
var backCtx = backCanvas.getContext("2d");

var middleCanvas = document.getElementById("middleCanvas");
var middleCtx = middleCanvas.getContext("2d");

var frontCanvas = document.getElementById("frontCanvas");
var frontCtx = frontCanvas.getContext("2d");

var srcX;
var srcY;

playMusic(startMenuMusic);

var frameDelayerCounter = 0;
var frameDelayerValue = 10;

var sheetWidth = 1200;
var sheetHeight = 300;

var frameCount = 4;

var spriteWidth = 300;
var spriteHeight = 300;

var currentFrame = 0;

var gameState = 0;
setBeforeGame();

var plussCharacter = new Image();
plussCharacter.src = "assets/characters/plussCharSpr.png";

function updateFrame() {
    if (frameDelayerCounter > frameDelayerValue) {
        frameDelayerCounter = 0;
        currentFrame = ++currentFrame % frameCount;
        srcX = currentFrame * spriteWidth;
        srcY = 0;
    } else {
        frameDelayerCounter++;
    }
}

//canvas dimensions
var W = window.innerWidth;
var H = window.innerHeight;

backCanvas.width = W;
backCanvas.height = H;
middleCanvas.width = W;
middleCanvas.height = H;
frontCanvas.width = W;
frontCanvas.height = H;


//snowflake particles
var mp = 30; //max particles
var particles = [];
for (var i = 0; i < mp; i++)
{
    particles.push({
        x: Math.random() * W, //x-coordinate
        y: Math.random() * H, //y-coordinate
        r: Math.random() * 4 + 1, //radius
        d: Math.random() * mp //density
    });
}

// Game variables

var gameScore = 0;
var firstNumber = 0;
var secondNumber = 0;
var questionAnswer = 0;
var gameSpeed = 5;

//Hinder Object
var hinderX = W + ((Math.random() * (W / 2)));
var hinderY = 0;
var hinderWidth = W / 10;
var hinderHeight = H / 8;

//Math Object
var Math1ObjectX = W + ((Math.random() * (W / 2)));
var Math1ObjectY = Math.random() * (H - 1) + 1;
var Math1ObjectWidth = W / 40;
var Math1Number = 0;

//Math Object2
var Math2ObjectX = W + ((Math.random() * (W / 2)));
var Math2ObjectY = (Math.random() * (H - 1)) + 1;
var Math2ObjectWidth = W / 40;
var Math2Number = 0;

//Math Object3
var Math3ObjectX = W + ((Math.random() * (W / 2)));
var Math3ObjectY = Math.random() * (H - 1) + 1;
var Math3ObjectWidth = W / 40;
var Math3Number = 0;

//PlayerVariables
var playerX = W / 12;
var playerY = H / 2;
var playerHeight = H / 8;
var playerWidth = W / 10;

var userInputX = 0;
var userInputY = 0;

// Player Controll
var timer = 0;

mouseMove = window.addEventListener("mousemove", function (event) {
    userInputX = event.x;
    userInputY = (event.y - middleCanvas.offsetTop) * 1.4;
    event.preventDefault();
});

touchMove = window.addEventListener("touchmove", function (event) {
    userInputX = event.touches[0].clientX;
    userInputY = (event.touches[0].clientY - middleCanvas.offsetTop) * 1.4;
}, false);

touchStart = window.addEventListener("touchstart", function () {
    if (timer === 0) {
        timer = setInterval(movePlayer, 20);
    }
}, false);

touchEnd = window.addEventListener("touchend", function () {
    clearInterval(timer);
    timer = 0;
}, false);

mouseDown = window.addEventListener("mousedown", function () {
    if (timer === 0) {
        timer = setInterval(movePlayer, 20);
    }
}, false);

var mouseUp = window.addEventListener("mouseup", function () {
    clearInterval(timer);
    timer = 0;
}, false);

function movePlayer() {
    if (userInputY < ((playerY + ((playerHeight) / 2)) - 24) && (playerY > 0)) {
        playerY -= 10;
    } else if (userInputY > ((playerY + (playerHeight / 2)) + 24) && playerY < (H - (playerHeight))) {
        playerY += 10;
    }
}


//Lets draw the flakes
function draw()
{
    backCtx.clearRect(0, 0, W, H);
    middleCtx.clearRect(0, 0, W, H);
    frontCtx.clearRect(0, 0, W, H);

    updateFrame();

    drawBack();
    drawMiddle();
    drawFront();

    function drawBack() {
        backCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
        backCtx.beginPath();
        for (var i = 0; i < mp; i++)
        {
            var p = particles[i];
            backCtx.moveTo(p.x, p.y);
            backCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        backCtx.fill();
        updateBackground();
    }

    function drawMiddle() {

        middleCtx.fillStyle = "rgba(131, 92, 59, 1)";
        middleCtx.beginPath();
        middleCtx.rect(0, 0, W, H);
        middleCtx.fill();

        middleCtx.fillStyle = "rgba(255, 255, 255, 1)";
        middleCtx.beginPath();
        middleCtx.rect(playerX, playerY, playerWidth, playerHeight);
        middleCtx.fill();
        middleCtx.stroke();

        if (gameState === 1) {

            updateGame();

            middleCtx.fillStyle = "rgba(0, 0, 0, 1)";
            middleCtx.beginPath();
            middleCtx.rect(hinderX, hinderY, hinderWidth, hinderHeight);
            middleCtx.fill();

            middleCtx.fillStyle = "rgba(255, 200, 200, 0.6)";
            middleCtx.beginPath();
            middleCtx.arc(Math1ObjectX, Math1ObjectY, Math1ObjectWidth, 0, 2 * Math.PI);
            middleCtx.fill();
            
            middleCtx.beginPath();
            middleCtx.arc(Math2ObjectX, Math2ObjectY, Math2ObjectWidth, 0, 2 * Math.PI);
            middleCtx.fill();
            
            middleCtx.beginPath();
            middleCtx.arc(Math3ObjectX, Math3ObjectY, Math3ObjectWidth, 0, 2 * Math.PI);
            middleCtx.fill();
            
            middleCtx.fillStyle = "rgba(0, 0, 0, 1)";
            middleCtx.font = "30px Arial";
            middleCtx.fillText(Math1Number, Math1ObjectX 
                    - (Math1ObjectWidth/2), Math1ObjectY 
                    + (Math1ObjectWidth/2));
            middleCtx.fillText(Math2Number, Math2ObjectX 
                    - (Math2ObjectWidth/2), Math2ObjectY 
                    + (Math1ObjectWidth/2));
            middleCtx.fillText(Math3Number, Math3ObjectX 
                    - (Math3ObjectWidth/2), Math3ObjectY 
                    + (Math1ObjectWidth/2));
        }
    }

    function drawFront() {
        frontCtx.drawImage(plussCharacter, srcX, srcY, spriteWidth,
                spriteHeight, 0, 100, W / 4, H / 2);
    }
}

function updateGame() {

    if (gameSpeed === 10) {
        setWinGame();
    } else if (gameSpeed === 0) {
        setGameOver();
    }

    if (playerY > (hinderY - hinderHeight) && playerY < (hinderY + hinderHeight)
            && playerX > (hinderX - hinderWidth)
            && playerX < (hinderX + hinderWidth)) {
        setGameOver();
    }

    if (Math1ObjectY > (playerY)
            && Math1ObjectY < (playerY + playerHeight)
            && Math1ObjectX > (playerX - playerWidth)
            && Math1ObjectX < (playerX + playerWidth)) {
        Math1ObjectX = W + ((Math.random() * (W / 2)));

        if (Math1Number === questionAnswer) {
            gameSpeed++;
            restartGame();
        } else {
            gameSpeed--;
            restartGame();
        }
    }

    if (Math2ObjectY > (playerY)
            && Math2ObjectY < (playerY + playerHeight)
            && Math2ObjectX > (playerX - playerWidth)
            && Math2ObjectX < (playerX + playerWidth)) {
        Math2ObjectX = W + ((Math.random() * (W / 2)));

        if (Math2Number === questionAnswer) {
            gameSpeed++;
            restartGame();
        } else {
            gameSpeed--;
            restartGame();
        }
    }

    if (Math3ObjectY > (playerY)
            && Math3ObjectY < (playerY + playerHeight)
            && Math3ObjectX > (playerX - playerWidth)
            && Math3ObjectX < (playerX + playerWidth)) {
        Math3ObjectX = W + ((Math.random() * (W / 2)));

        if (Math3Number === questionAnswer) {
            gameSpeed++;
            restartGame();
        } else {
            gameSpeed--;
            restartGame();
        }
    }

    hinderX -= gameSpeed + 1;
    if (hinderX < -hinderWidth) {
        hinderX = W + ((Math.random() * (W / 2)));
        hinderY = (Math.random() * (H - 1)) + 1;
    }

    Math1ObjectX -= gameSpeed;
    if (Math1ObjectX < -Math1ObjectWidth) {
        Math1ObjectX = W + ((Math.random() * (W / 2)));
        Math1ObjectY = (Math.random() * (H - 1)) + 1;
    }

    Math2ObjectX -= gameSpeed;
    if (Math2ObjectX < -Math2ObjectWidth) {
        Math2ObjectX = W + ((Math.random() * (W / 2)));
        Math2ObjectY = (Math.random() * (H - 1)) + 1;
    }

    Math3ObjectX -= gameSpeed;
    if (Math3ObjectX < -Math3ObjectWidth) {
        Math3ObjectX = W + ((Math.random() * (W / 2)));
        Math3ObjectY = (Math.random() * (H - 1)) + 1;
    }
}

var angle = 0;
function updateBackground()
{
    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    angle += 0.01;
    for (var i = 0; i < mp; i++)
    {
        var p = particles[i];
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;
        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if (p.x > W + 5 || p.x < -5 || p.y > H)
        {
            if (i % 3 > 0) //66.67% of the flakes
            {
                particles[i] = {x: Math.random() * W, y: -10, r: p.r, d: p.d};
            } else
            {
                //If the flake is exitting from the right
                if (Math.sin(angle) > 0)
                {
                    //Enter from the left
                    particles[i] = {x: -5, y: Math.random() * H, r: p.r, d: p.d};
                } else
                {
                    //Enter from the right
                    particles[i] = {x: W + 5, y: Math.random() * H, r: p.r, d: p.d};
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

    document.getElementById("questionBox").innerHTML 
            = firstNumber + " + " + secondNumber + " = ??     Score: " 
            + gameSpeed;

    hinderX = W + ((Math.random() * (W / 2)));
    hinderY = 0;
    hinderWidth = W / 10;
    hinderHeight = H / 8;

    //Math Object
    Math1ObjectX = W + ((Math.random() * (W / 2)));
    Math1ObjectY = Math.random() * (H - 1) + 1;
    Math1ObjectWidth = W / 40;
    Math1Number = firstNumber + secondNumber;

    //Math Object2
    Math2ObjectX = W + ((Math.random() * (W / 2)));
    Math2ObjectY = (Math.random() * (H - 1)) + 1;
    Math2ObjectWidth = W / 40;
    Math2Number = firstNumber + secondNumber + Math.round((Math.random() * 5) + 1);

    //Math Object3
    Math3ObjectX = W + ((Math.random() * (W / 2)));
    Math3ObjectY = Math.random() * (H - 1) + 1;
    Math3ObjectWidth = W / 40;
    Math3Number = firstNumber + secondNumber - Math.round((Math.random() * 5) - 1);
}

//animation loop, 60 fps
animationLoop = setInterval(draw, 16);