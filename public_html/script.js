/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Creating the global

var gameScreen = document.createElement('div');
gameScreen.id = "gameScreen";

//Start the game

var startxhttp = new XMLHttpRequest();
startxhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {

        gameScreen.innerHTML = this.responseText;
        document.body.appendChild(gameScreen);
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = "startScreen/startScreen.js";
        gameScreen.append(script);
    }
};

startxhttp.open("GET", "startScreen/startScreen.html", true);
startxhttp.send();