/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// User clicks the candyland button, open the candyland modal 
function worldSelectWorld01() {
    exitModal();
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectWorld01ModalContent").style.display = "block";
}

// User clicks the paris button, open the paris modal 
function worldSelectWorld02() {
    exitModal();
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectWorld02ModalContent").style.display = "block";
}

// User clicks the paris button, open the paris modal
function worldSelectWorld03() {
    exitModal();
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectWorld03ModalContent").style.display = "block";
}

// User clicks the paris button, open the paris modal
function worldSelectWorld04() {
    exitModal();
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectWorld04ModalContent").style.display = "block";
}

// User clicks the paris button, open the paris modal
function worldSelectWorld05() {
    exitModal();
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectWorld05ModalContent").style.display = "block";
}

// User clicks the paris button, open the paris modal
function worldSelectWorld06() {
    exitModal();
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectWorld06ModalContent").style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function exitModal() {
    document.getElementById('myModal').style.display = "none";
    document.getElementById("selectWorld01ModalContent").style.display = "none";
    document.getElementById("selectWorld02ModalContent").style.display = "none";
    document.getElementById("selectWorld03ModalContent").style.display = "none";
    document.getElementById("selectWorld04ModalContent").style.display = "none";
    document.getElementById("selectWorld05ModalContent").style.display = "none";
    document.getElementById("selectWorld06ModalContent").style.display = "none";
}

//canvas init
iniBack("mainMenuCanvas");

//letters
iniBackgroundEffects(0);

//Draw the letters
function draw()
{
    backCtx.clearRect(0, 0, W, H);
    updateBackgroundEffects();
}

//animation loop
var animationLoop = setInterval(draw, 33);