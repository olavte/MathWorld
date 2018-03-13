/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.addEventListener("click", goToMainMenuFromStartScreen);
window.addEventListener("click", clearStartScreenInterval);

function goToMainMenuFromStartScreen() {
    window.removeEventListener("click", goToMainMenuFromStartScreen);
    goToNewScreen("source/mainMenuSource/mainMenu/mainMenu.html", "source/mainMenuSource/mainMenu/mainMenu.js");
}

//Blinking Text Script

blinkText = function () {
    var el = document.getElementById("clickToStart");
    if (el.style.display === 'block') {
        el.style.display = 'none';
    } else {
        el.style.display = 'block';
    }
};

var startScreenInterval = setInterval(blinkText, 1000);

function clearStartScreenInterval() {
    window.removeEventListener("click", clearStartScreenInterval);
    clearInterval(startScreenInterval);
    startScreenInterval = null;
}

//canvas init
iniBack("mainMenuCanvas");

//letters
iniBackgroundEffects(0);

//Draw the letters
function draw()
{
    backCtx.clearRect(0, 0, W, H);
    updateBackgroundEffects(0);
}

//animation loop
var animationLoop = setInterval(draw, 33);
