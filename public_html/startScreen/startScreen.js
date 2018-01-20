/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.addEventListener("click", myFunction);
window.addEventListener("click", clearStartScreenInterval);

// If the user clicks in the window, set the background color of <body> to yellow
function myFunction() {
    window.removeEventListener("click", myFunction);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            gameScreen.innerHTML = this.responseText;
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "mainMenu/mainMenu.js";
            gameScreen.append(script);
        }
    };
    xhttp.open("GET", "mainMenu/mainMenu.html", true);
    xhttp.send();
}

blinkText = function(){
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

