/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Creating the global

var gameScreen = document.createElement('div');
gameScreen.id = "gameScreen";
document.body.appendChild(gameScreen);

var latestWorld = 0;
var currentWorld = 0;
var currentStage = 0;

var animationLoop = null;

// Music and sounds

var globalVolume = 0;
var musicVolume = 0;
var soundVolume = 0;

var startMenuMusic = new Audio('assets/music/startScreen.mp3');
var fightMusic = new Audio('assets/music/falconLunch.mp3');

var currentMusic = null;

var musicLooper = null;

function playSound(sound) {
    var s = new Audio(sound);
    s.volume = soundVolume * globalVolume;
    s.play();
}

function playMusic(music) {
    if(musicLooper !== null) {
        currentMusic.removeEventListener("ended", musicLooper);
        musicLooper = null;
    }
    if(currentMusic !== null) {
        currentMusic.pause();
    }
    currentMusic = music;
    currentMusic.currentTime = 0;
    currentMusic.volume = globalVolume * musicVolume;
    currentMusic.play();
    musicLooper = currentMusic.addEventListener("ended", function () {
        if (currentMusic !== null) {
            this.currentTime = 0;
            this.play();
        }
    }, false);
}

//Controllers
var mouseDown = 0;
var mouseUp = 0;
var mouseMove = 0;
var touchStart = 0;
var touchEnd = 0;
var touchMove = 0;

function fadeIn(element) {
    element.style.opacity = 0;
    var op = 0.2;  // initial opacity
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += 0.02;
    }, 10);
}

function goToNewScreen(html, js) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (animationLoop != null) {
                clearAnimation();
            }
            gameScreen.innerHTML = this.responseText;
            fadeIn(gameScreen);
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = js;
            gameScreen.append(script);
        }
    };
    xhttp.open("GET", html, true);
    xhttp.send();
}

function addExtraScript(js) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = js;
    gameScreen.append(script);
}

function clearAnimation() {

    //Clears the animation loop (fps)
    clearInterval(animationLoop);

    //Clears all window related events
    if (mouseDown !== 0) {
        window.removeEventListener("mousedown", mouseDown);
        mouseDown = 0;
    }
    if (mouseUp !== 0) {
        window.removeEventListener("mouseup", mouseUp);
        mouseUp = 0;
    }
    if (mouseMove !== 0) {
        window.removeEventListener("mousemove", mouseMove);
        mouseMove = 0;
    }
    if (touchStart !== 0) {
        window.removeEventListener("touchstart", touchStart);
        touchStart = 0;
    }
    if (touchEnd !== 0) {
        window.removeEventListener("touchend", touchEnd);
        touchEnd = 0;
    }
    if (touchMove !== 0) {
        window.removeEventListener("touchmove", touchMove);
        touchMove = 0;
    }
}

//Check collision
function checkCollision(targetX, targetY, targetW, targetH, coliderX, coliderY, coliderW, coliderH) {
    var result = false;
    if((targetY < coliderY + coliderH) && (coliderY < targetY + targetH)
        && (targetX < coliderX + coliderW) && (coliderX < targetX + targetW)) {
        result = true;
    }
    return result;
}

//Initialize canvases
var backCanvas = null;
var middleCanvas = null;
var frontCanvas = null;

var backCtx = null;
var middleCtx = null;
var frontCtx = null;

var W = window.innerWidth;
var H = window.innerHeight;

function iniBack(canvasID) {
    backCanvas = document.getElementById(canvasID);
    backCtx = backCanvas.getContext("2d");
    backCanvas.width = W;
    backCanvas.height = H;
}

function iniMiddle(canvasID) {
    middleCanvas = document.getElementById(canvasID);
    middleCtx = middleCanvas.getContext("2d");
    middleCanvas.width = W;
    middleCanvas.height = H;
}

function iniFront(canvasID) {
    frontCanvas = document.getElementById(canvasID);
    frontCtx = frontCanvas.getContext("2d");
    frontCanvas.width = W;
    frontCanvas.height = H;
}

function createAnimatedSprite(src, sheetWidth, sheetHeight, spriteWidth, spriteHeight, frameCount, frameDelay) {

    var character = new Image();
    character.src = src;
    return {
        image: character,
        src: src,
        srcX: 0,
        srcY: 0,
        sheetWidth: sheetWidth,
        sheetHeight: sheetHeight,
        spriteWidth: spriteWidth,
        spriteHeight: spriteHeight,
        currentFrame: 0,
        frameCount: frameCount,
        frameDelay: frameDelay,
        frameDelayCounter: 0,
        updateFrame: function() {
            if (this.frameDelayCounter > this.frameDelay) {
                this.frameDelayCounter = 0;
                this.currentFrame = ++this.currentFrame % this.frameCount;
                this.srcX = this.currentFrame * this.spriteWidth;
                this.srcY = 0;
            } else {
                this.frameDelayCounter++;
            }
        }};
}

//Start the game
goToNewScreen("source/mainMenuSource/startScreen/startScreen.html",
    "source/mainMenuSource/startScreen/startScreen.js");