/* 
 */
//document.getElementById('myModal').style.display = "block";
//document.getElementById('stage2StartModalContent').style.display = "block";

//canvas init

iniBack("world1Canvas");

iniMiddle("middleCanvas");

iniFront("frontCanvas");

//Music
playMusic(fightMusic);
var plussCharacter = createAnimatedSprite('assets/characters/plussCharSpr.png', 1200, 300, 300, 300, 4, 30);

var gameState = 0;
setBeforeGame();


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

var firstNumber = 0;
var secondNumber = 0;
var questionAnswer = 0;
var gameSpeed = 5;

//Hinder Object
var hinder = {
    hinderX: W + ((Math.random() * (W / 2))),
    hinderY: 0,
    hinderWidth: W / 10,
    hinderHeight: H / 8

};

//Math Objects
var mathObjects = [];
for(var i = 0; i < 4; i++) {
    mathObjects.push({
        name:"math" + (i + 1),
        mathX:W + ((Math.random() * (W / 2))),
        mathY:Math.random() * (H - 1) + 1,
        mathW:W/40,
        mathNumber:0});
}

//PlayerVariables
var player = {
    playerX: W / 12,
    playerY: H / 2,
    playerHeight: H / 8,
    playerWidth: W / 10
};

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

mouseUp = window.addEventListener("mouseup", function () {
    clearInterval(timer);
    timer = 0;
}, false);

function movePlayer() {
    if (userInputY < ((player.playerY + ((player.playerHeight) / 2)) - 24) && (player.playerY > 0)) {
        player.playerY -= 10;
    } else if (userInputY > ((player.playerY + (player.playerHeight / 2)) + 24) && player.playerY < (H - (player.playerHeight))) {
        player.playerY += 10;
    }
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
        middleCtx.rect(player.playerX, player.playerY, player.playerWidth, player.playerHeight);
        middleCtx.fill();
        middleCtx.stroke();

        if (gameState === 1) {

            updateGame();

            middleCtx.fillStyle = "rgba(0, 0, 0, 1)";
            middleCtx.beginPath();
            middleCtx.rect(hinder.hinderX, hinder.hinderY, hinder.hinderWidth, hinder.hinderHeight);
            middleCtx.fill();

            mathObjects.forEach(function(mathObject) {
                middleCtx.fillStyle = "rgba(255, 200, 200, 0.6)";
                middleCtx.beginPath();
                middleCtx.arc(mathObject.mathX, mathObject.mathY, mathObject.mathW, 0, 2 * Math.PI);
                middleCtx.fill();
                middleCtx.fillStyle = "rgba(0, 0, 0, 1)";
                middleCtx.font = "30px Arial";
                middleCtx.fillText(mathObject.mathNumber, mathObject.mathX
                    - (mathObject.mathW/2), mathObject.mathY
                    + (mathObject.mathW/2));
            });
        }
    }

    function drawFront() {
        frontCtx.drawImage(plussCharacter.image, plussCharacter.srcX, plussCharacter.srcY, plussCharacter.spriteWidth,
                plussCharacter.spriteHeight, 0, 100, W / 4, H / 2);
        plussCharacter.updateFrame();

    }
}

function updateGame() {

    if (gameSpeed === 10) {
        setWinGame();
    } else if (gameSpeed === 0) {
        setGameOver();
    }

    if(checkCollision(player.playerX, player.playerY, player.playerWidth, player.playerHeight,
            hinder.hinderX, hinder.hinderY, hinder.hinderWidth, hinder.hinderHeight)) {
        setGameOver();
    }

    hinder.hinderX -= gameSpeed + 1;
    if (hinder.hinderX < -hinder.hinderWidth) {
        hinder.hinderX = W + ((Math.random() * (W / 2)));
        hinder.hinderY = (Math.random() * (H - 1)) + 1;
    }

    mathObjects.forEach(function(mathObject) {
       if(checkCollision(player.playerX, player.playerY, player.playerWidth, player.playerHeight,
               mathObject.mathX, mathObject.mathY, mathObject.mathW, mathObject.mathW)) {
           if (mathObject.mathNumber === questionAnswer) {
               gameSpeed++;
               restartGame();
           } else {
               gameSpeed--;
               restartGame();
           }
       }
       mathObject.mathX -= gameSpeed;
        if (mathObject.mathX < -mathObject.mathW) {
            mathObject.mathX = W + ((Math.random() * (W / 2)));
            mathObject.mathY = (Math.random() * (H - 1)) + 1;
        }
    });
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

    document.getElementById("questionBox").innerHTML 
            = firstNumber + " + " + secondNumber + " = ??     Score: " 
            + gameSpeed;

    hinder.hinderX = W + ((Math.random() * (W / 2)));
    hinder.hinderY = 0;
    hinder.hinderWidth = W / 10;
    hinder.hinderHeight = H / 8;

    //Math Object
    mathObjects.forEach(function(mathObject) {
        mathObject.mathX = W + ((Math.random() * (W / 2)));
        mathObject.mathY = Math.random() * (H - 1) + 1;
        mathObject.mathW = W / 40;
        mathObject.mathNumber = Math.round(Math.random() * 20);
    });
    mathObjects[0].mathNumber = firstNumber + secondNumber;
}

//animation loop, 60 fps
animationLoop = setInterval(draw, 16);