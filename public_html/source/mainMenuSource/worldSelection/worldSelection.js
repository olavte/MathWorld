/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// User clicks the candyland button, open the candyland modal 
function worldSelectWorld01() {
    exitModal();
    playMusic(candyMusic);
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
    playMusic(forestMusic);
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectWorld03ModalContent").style.display = "block";
}

// User clicks the paris button, open the paris modal
function worldSelectWorld04() {
    exitModal();
    playMusic(norwayMusic);
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectWorld04ModalContent").style.display = "block";
}

// User clicks the paris button, open the paris modal
function worldSelectWorld05() {
    exitModal();
    playMusic(spaceMusic);
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectWorld05ModalContent").style.display = "block";
}

// User clicks the paris button, open the paris modal
function worldSelectWorld06() {
    exitModal();
    playMusic(crazyMusic);
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectWorld06ModalContent").style.display = "block";
}

function miniGame1() {
    exitModal();
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectWorldMiniGame1ModalContent").style.display = "block";
}

function miniGame2() {
    exitModal();
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectWorldMiniGame2ModalContent").style.display = "block";
}

function miniGame3() {
    exitModal();
    document.getElementById('myModal').style.display = "block";
    document.getElementById("selectWorldMiniGame3ModalContent").style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function exitModal() {
    playMusic(startMenuMusic);
    document.getElementById('myModal').style.display = "none";
    document.getElementById("selectWorld01ModalContent").style.display = "none";
    document.getElementById("selectWorld02ModalContent").style.display = "none";
    document.getElementById("selectWorld03ModalContent").style.display = "none";
    document.getElementById("selectWorld04ModalContent").style.display = "none";
    document.getElementById("selectWorld05ModalContent").style.display = "none";
    document.getElementById("selectWorld06ModalContent").style.display = "none";
    document.getElementById("selectWorldMiniGame1ModalContent").style.display = "none";
    document.getElementById("selectWorldMiniGame2ModalContent").style.display = "none";
    document.getElementById("selectWorldMiniGame3ModalContent").style.display = "none";
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