/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if(currentStage > 0 || worldProgression > 0) {
    document.getElementById("selectWorld1Button").style.backgroundImage = "url(\"assets/world1/world1photo.png\")";
    document.getElementById("selectWorld1Button").addEventListener("click", function() {
        worldSelectWorld01();
    })
}
if(currentStage > 4 || worldProgression > 1) {
    document.getElementById("selectWorld2Button").style.backgroundImage = "url(\"assets/world2/world2.png\")";
    document.getElementById("selectWorld2Button").addEventListener("click", function() {
        worldSelectWorld02();
    })
}
if(currentStage > 8 || worldProgression > 2) {
    document.getElementById("selectWorld3Button").style.backgroundImage = "url(\"assets/world3/world03.png\")";
    document.getElementById("selectWorld3Button").addEventListener("click", function() {
        worldSelectWorld03();
    })
}
if(currentStage > 12 || worldProgression > 3) {
    document.getElementById("selectWorld4Button").style.backgroundImage = "url(\"assets/world4/world4.png\")";
    document.getElementById("selectWorld4Button").addEventListener("click", function() {
        worldSelectWorld04();
    })
}
if(currentStage > 16 || worldProgression > 4) {
    document.getElementById("selectWorld5Button").style.backgroundImage = "url(\"assets/world5/world5.png\")";
    document.getElementById("selectWorld5Button").addEventListener("click", function() {
        worldSelectWorld05();
    })
}
if(currentStage > 20 || worldProgression > 5) {
    document.getElementById("selectWorld6Button").style.backgroundImage = "url(\"assets/world6/world6.png\")";
    document.getElementById("selectWorld6Button").addEventListener("click", function() {
        worldSelectWorld06();
    })
}

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
    playMusic(parisMusic);
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
    playMusic(finalBossMusic);
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