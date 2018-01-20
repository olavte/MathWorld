/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Creating the global

var gameScreen = document.createElement('div');
gameScreen.id = "gameScreen";
document.body.appendChild(gameScreen);

function goToNewScreen(html, js) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            gameScreen.innerHTML = this.responseText;
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = js;
            gameScreen.append(script);
        }
    };
    xhttp.open("GET", html, true);
    xhttp.send();
}

//Start the game
goToNewScreen("startScreen/startScreen.html", "startScreen/startScreen.js");
