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

var globalVolume = 1;
var musicVolume = 1;
var soundVolume = 1;

var startMenuMusic = new Audio('assets/music/startScreen.mp3');

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
    }
    currentMusic = music;
    currentMusic.pause();
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

//Start the game
goToNewScreen("source/mainMenuSource/startScreen/startScreen.html",
    "source/mainMenuSource/startScreen/startScreen.js");