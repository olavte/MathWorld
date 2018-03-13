/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// User clicks the candyland button, open the candyland modal 
function worldSelectCandyLand() {
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectCandyLandModalContent").style.display = "block";
    document.getElementById("selectParisModalContent").style.display = "none";
}

// User clicks the paris button, open the paris modal 
function worldSelectParis() {
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectCandyLandModalContent").style.display = "none";
    document.getElementById("selectParisModalContent").style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function exitModal() {
    document.getElementById('myModal').style.display = "none";
    document.getElementById("selectCandyLandModalContent").style.display = "none";
    document.getElementById("selectParisModalContent").style.display = "none";
}

//canvas init
iniBack("mainMenuCanvas");

//letters
iniBackgroundEffects(0);

//Draw the letters
function draw()
{
    ctx.clearRect(0, 0, W, H);
    updateBackgroundEffects();
}

//animation loop
var animationLoop = setInterval(draw, 33);