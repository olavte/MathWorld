/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.addEventListener("click", myFunction);

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