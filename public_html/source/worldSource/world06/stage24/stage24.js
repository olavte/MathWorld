/* 
 */
//document.getElementById('myModal').style.display = "block";
//document.getElementById('stage2StartModalContent').style.display = "block";

//canvas init

iniBack("world6Canvas");
iniFront("frontCanvas");

//Music
if(currentMusic != finalBossMusic) {
    playMusic(finalBossMusic);
}
var plussChar = createAnimatedSprite('assets/characters/plussCharSpr.png', 1200, 300, 300, 300, 4, 30);
var minusChar = createAnimatedSprite('assets/characters/minusCharSpr.png', 8400, 300, 600, 300, 14, 2);
var multiplicationChar = createAnimatedSprite('assets/characters/MultiplicationCharSpr.png', 1800, 300, 300, 300, 6, 30);
var divisionChar = createAnimatedSprite('assets/characters/divisionCharSpr.png', 1200, 300, 300, 300, 22, 1);
var roundingChar = createAnimatedSprite('assets/characters/roundingChar.png', 1800, 300, 300, 300, 6, 15);
var erlikChar = createAnimatedSprite('assets/characters/ErlikStanding.png', 300, 5400, 300, 300, 18, 10);

var gameState = 0;
setBeforeGame();


iniBackgroundEffects(6);

// Game variables

var firstNumber = 0;
var secondNumber = 0;
var questionAnswer = 0;
var timer = 60;
var numberOfTries = 0;
var maxNumberOfTries = 2;
var animationTimer = 0;
var damagedObject = 0;
var currentAnimatedCharInBox = null;
var doingDamageAnimation = false;

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
    checkIfClickedOnAnyChars();
}

window.addEventListener("touchend", touchEnd);

function touchEnd() {
    player.playerChar = null;
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
        var bgrd=backCtx.createLinearGradient(0,0,0,H);
        if(gameState === 2) {
            bgrd.addColorStop(0,"rgba(255,255,255, 1)");
            bgrd.addColorStop(0.75, "rgba(0,0,255, 1)");
            bgrd.addColorStop(1,"white");
        } else {
            bgrd.addColorStop(0,"rgba(0,0,0, 1)");
            bgrd.addColorStop(0.75, "rgba(255, 0, 0, 1)");
            bgrd.addColorStop(1,"black");
        }

        backCtx.fillStyle = bgrd;
        backCtx.beginPath();
        backCtx.rect(0, 0, W, H);
        backCtx.fill();

        backCtx.fillStyle = "rgba(40, 40, 40, 1)";
        backCtx.beginPath();
        backCtx.rect(0, H/3, W, H);
        backCtx.fill();
        if(gameState !== 2) {
            updateBackgroundEffects(6);
        }
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
        frontCtx.textAlign="start";
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

        //Player current health
        if(playerHP > 0) {
            frontCtx.fillStyle = "rgba(0, 255, 0, 1)";
            frontCtx.beginPath();
            frontCtx.rect(W * (5 / 100), H * (8 / 100), W * (35 / 100) * (playerHP / 100), H * (10 / 100));
            frontCtx.fill();
        }

        // Erliks current health
        if(erlikHP > 0) {
            frontCtx.fillStyle = "rgba(0, 255, 0, 1)";
            frontCtx.beginPath();
            frontCtx.rect(W * (60 / 100), H * (8 / 100), W * (35 / 100) * (erlikHP / 100), H * (10 / 100));
            frontCtx.fill();
        }

        if (gameState === 1) {
            if(animationTimer <= 0) {updateGame()};
            frontCtx.fillStyle = "rgba(255, 255, 255, 1)";
            frontCtx.beginPath();
            frontCtx.rect(W * (25/100), H * (25/100), W * (50/100), H * (20/100));
            frontCtx.fill();

            frontCtx.fillStyle = "rgba(0, 0, 0, 1)";
            frontCtx.beginPath();
            frontCtx.rect(W * (26/100), H * (26/100), W * (48/100), H * (18/100));
            frontCtx.fill();

            frontCtx.fillStyle = "rgba(255, 255, 255, 1)";
            frontCtx.font = "80px Arial";
            frontCtx.fillText(firstNumber, W * (30/100), H * (37/100));

            frontCtx.fillStyle = "rgba(255, 255, 255, 1)";
            frontCtx.font = "80px Arial";
            frontCtx.fillText(secondNumber, W * (55/100), H * (37/100));

            frontCtx.fillStyle = "rgba(255, 255, 255, 1)";
            frontCtx.font = "80px Arial";
            frontCtx.fillText("= " + questionAnswer, W * (60/100), H * (37/100));

            frontCtx.strokeStyle = "rgba(255, 255, 255, 1)";
            frontCtx.beginPath();
            frontCtx.rect(checkBox.x, checkBox.y, checkBox.w, checkBox.h);
            frontCtx.stroke();
        }

        if(player.playerChar != null) {
            drawSpriteImage(frontCtx, player.playerChar, userInputX-(spriteWidthTemp/2), userInputY-(spriteHeighTemp/2), spriteWidthTemp, spriteHeighTemp);
        }

        if(animationTimer >= 0) {
            doingDamageAnimation = true;
            if(damagedObject === 0) {
                if(animationTimer % 10 >= 5) {
                    frontCtx.fillStyle = "rgba(255, 0, 0, 0.8)";
                    frontCtx.beginPath();
                    frontCtx.rect(0, 0, W, H);
                    frontCtx.fill();
                }
                drawSpriteImage(frontCtx, erlikChar, W - ((W / 4)), H / 4, W / 5, W / 4);
            } else if (damagedObject === 1) {
                if(animationTimer % 10 >= 5) {
                    drawSpriteImage(frontCtx, erlikChar, W - ((W / 4)), H / 4, W / 5, W / 4);
                }
            }
            animationTimer--;
            if(currentAnimatedCharInBox != null) {
                drawSpriteImage(frontCtx, currentAnimatedCharInBox, checkBox.x, checkBox.y, checkBox.w, checkBox.h);
            }
        } else {
            if(gameState === 2) {
                frontCtx.save();
                frontCtx.translate(W/2, H/2);
                frontCtx.rotate(0.3);
                drawSpriteImage(frontCtx, erlikChar, (W - ((W / 4)))-(W/2), (H / 4)-(H/2), W / 5, W / 4);
                frontCtx.rotate(-0.3);
                frontCtx.restore();
            } else {
                drawSpriteImage(frontCtx, erlikChar, W - ((W / 4)), H / 4, W / 5, W / 4);
            }
        }

        if(gameState !== 2) {
            var someRand = Math.random() * 10000;
            if(someRand > 9990) {
                frontCtx.fillStyle = "white";
                frontCtx.beginPath();
                frontCtx.rect(0, 0, W, H);
                frontCtx.fill();
                playSound("assets/sound/thunder.mp3");
            } else {
                var grd=frontCtx.createLinearGradient(0,0,0,H);
                grd.addColorStop(0,"rgba(0,0,0, 0.8)");
                grd.addColorStop(0.75,"rgba(0,0,0, 0)");
                grd.addColorStop(1,"rgba(0,0,0, 0.8)");

                frontCtx.fillStyle = grd;
                frontCtx.beginPath();
                frontCtx.rect(0, 0, W, H);
                frontCtx.fill();
            }
        }

        // Current timer
        var timerFontSize = 80;
        var timerYPos = H * (12/100);
        if(Math.round(timer) % 10 === 0) {
            timerFontSize = 120;
            timerYPos = H * (14/100);
        }

        frontCtx.fillStyle = "rgba(255, 255, 255, 1)";
        frontCtx.font = timerFontSize + "px Arial";
        frontCtx.textAlign="center";
        frontCtx.fillText(Math.round(timer), W * (50/100), timerYPos);
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
                    damageErlik();
                } else {
                    numberOfTries++;
                }
            } else if (player.playerChar === minusChar) {
                if(operators[1].method(firstNumber, secondNumber) === questionAnswer) {
                    damageErlik();
                } else {
                    numberOfTries++;
                }
            } else if (player.playerChar === multiplicationChar) {
                if(operators[2].method(firstNumber, secondNumber) === questionAnswer) {
                    damageErlik();
                } else {
                    numberOfTries++;
                }
            } else if (player.playerChar === divisionChar) {
                if(operators[3].method(firstNumber, secondNumber) === questionAnswer) {
                    damageErlik()
                } else {
                    numberOfTries++;
                }
            } else if (player.playerChar === roundingChar) {
                if(operators[4].method(firstNumber, secondNumber) === questionAnswer) {
                    damageErlik();
                } else {
                    numberOfTries++;
                }
            }
        }
    }

    function damageErlik() {
        animationTimer = 60;
        damagedObject = 1;
        currentAnimatedCharInBox = player.playerChar;
        player.playerChar = null;
        if(timer >= 50) {
            erlikHP -= 6;
        } else if (timer >= 40) {
            erlikHP -= 5;
        } else if (timer >= 30) {
            erlikHP -= 4;
        } else if (timer >= 20) {
            erlikHP -= 3;
        } else if (timer >= 10) {
            erlikHP -= 2;
        } else {
            erlikHP -= 1;
        }
        if(Math.round(timer) % 10 === 0) {
            erlikHP -= 5;
        }
    }

    if(timer <= 0 && doingDamageAnimation === false) {
        currentAnimatedCharInBox = null;
        animationTimer = 60;
        damagedObject = 0;
        playerHP -= 5;
        player.playerChar = null;
    } else {
        timer -= 1/60;
        if(erlikHP < 100 && ((100 - erlikHP)/60 - (100 - playerHP)/70) > 0) {
            timer -= (100 - erlikHP)/120 - (100 - playerHP)/150;
        }
    }

    if(numberOfTries >= maxNumberOfTries) {
        currentAnimatedCharInBox = player.playerChar;
        animationTimer = 60;
        damagedObject = 0;
        playerHP -= 5;
        numberOfTries = 0;
        player.playerChar = null;
    }

    if(doingDamageAnimation === true && animationTimer < 0) {
        doingDamageAnimation = false;
        restartGame();
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
    playerHP = 100;
    erlikHP = 100;
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
    gameState = 2;
    if(currentStage < 24) {
        currentStage = 24;
    }
    creditsMoney += 50;
    stopMusic();
    playSound('assets/sound/gotKey.mp3');
    /*document.getElementById('myModal').style.display = "block";
    document.getElementById("gameOverModalContent").style.display = "none";
    document.getElementById("startModalContent").style.display = "none";
    document.getElementById("winModalContent").style.display = "block";*/
    if (beatGame)
    {
        setTimeout(function(){
            goToNewScreen('source/worldSource/world06/world06.html', 'source/worldSource/world06/world06.js');     
        }, 6000);

    } else
    {
        beatGame = true;
        setTimeout(function(){
            goToNewScreen('source/cutsceneSource/endCredits/endCredits.html', 'source/cutsceneSource/endCredits/endCredits.js');
        }, 6000);

    }
}

function restartGame() {
    // Game variables
    //Hinder Object
    player.playerChar = null;
    timer = 60;
    var operator = operators[Math.round(Math.random() * 4)];
    if(operator.gameChar === roundingChar) {
        firstNumber = Math.round(((Math.random() * 10) + 1) * 19) / 10;
        secondNumber = Math.round(firstNumber);
        questionAnswer = operator.method(firstNumber, secondNumber);
        while(firstNumber % 1 === 0) {
            firstNumber = Math.round(((Math.random() * 10) + 1) * 19) / 10;
            secondNumber = Math.round(firstNumber);
            questionAnswer = operator.method(firstNumber, secondNumber);
        }
    } else {
        firstNumber = Math.round(Math.random() * 20);
        secondNumber = Math.round(Math.random() * 19 + 1);
        questionAnswer = operator.method(firstNumber, secondNumber);
        while(questionAnswer % 1 !== 0) {
            firstNumber = Math.round(Math.random() * 20);
            secondNumber = Math.round(Math.random() * 19 + 1);
            questionAnswer = operators[3].method(firstNumber, secondNumber);
        }
    }
}

//animation loop, 60 fps
animationLoop = setInterval(draw, 16);