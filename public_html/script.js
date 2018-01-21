/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Creating the global

var gameScreen = document.createElement('div');
gameScreen.id = "gameScreen";
document.body.appendChild(gameScreen);

var animationLoop = null;

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
goToNewScreen("startScreen/startScreen.html", "startScreen/startScreen.js");