/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Creating the global

var gameScreen = document.createElement('div');
gameScreen.id = "gameScreen";
document.body.appendChild(gameScreen);

var globalVolume = 0;
var musicVolume = 0;
var soundVolume = 0;

var latestWorld = 0;
var currentWorld = 0;
var currentStage = 0;

var animationLoop = null;

var mainMusic = new Audio('assets/music/startScreen.mp3');
mainMusic.volume = globalVolume * musicVolume;
mainMusic.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
mainMusic.play();

function fadeIn(element) {
    element.style.opacity = 0;
    var op = 0.2;  // initial opacity
    var timer = setInterval(function () {
        if (op >= 1){
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
            if(animationLoop != null) {
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
    clearInterval(animationLoop);
}

//Start the game
goToNewScreen("source/mainMenuSource/startScreen/startScreen.html", 
"source/mainMenuSource/startScreen/startScreen.js");