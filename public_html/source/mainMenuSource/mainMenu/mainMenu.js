/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if(currentStage === 0) {
    document.getElementById("mainMenuStartButton").innerHTML = "New Game";
    document.getElementById("mainMenuStartButton").addEventListener('click', function (ev) {
        goToNewScreen('source/worldSource/world01/world01.html', 'source/worldSource/world01/world01.js')
    });
} else {
    document.getElementById("mainMenuStartButton").innerHTML = "Continue";
    document.getElementById("mainMenuStartButton").addEventListener('click', function (ev) {
        var html = 'source/worldSource/world0' + currentWorld + '/world0' + currentWorld + '.html';
        var js = 'source/worldSource/world0' + currentWorld + '/world0' + currentWorld + '.js';
        goToNewScreen(html, js);
    });
}

// setting a global variable for the volume sliders
var volumeBarInterval = 0;

// setting default value on input range tags
document.getElementById("mainVolumeRange").defaultValue = globalVolume * 100;
document.getElementById("musicVolumeRange").defaultValue = musicVolume * 100;
document.getElementById("soundVolumeRange").defaultValue = soundVolume * 100;

// User clicks on one of the sliders, starts volumeBarInterval timer
function volumeBarClickedDown(changeVolume) {
    volumeBarInterval = setInterval(changeVolume, 100);
}

playMusic(startMenuMusic);

// Changes the main volume
function changeVolumeOnMain() {
    globalVolume = document.getElementById("mainVolumeRange").value / 100;
    currentMusic.volume = globalVolume * musicVolume;
}

// Changes the music volume
function changeVolumeOnMusic() {
    musicVolume = document.getElementById("musicVolumeRange").value / 100;
    currentMusic.volume = globalVolume * musicVolume;
}

// Changes the sound volume
function changeVolumeOnSound() {
    soundVolume = document.getElementById("soundVolumeRange").value / 100;
}

// User releases the button, removes volumeBarInterval
function volumeBarClickedUp() {
    clearInterval(volumeBarInterval);
    console.log(currentMusic.volume);
}

// User clicks the settings button, open the settings modal 
function mainMenuSettings() {
    document.getElementById('myModal').style.display = "block";
    document.getElementById("settingsModalContent").style.display = "block";
    document.getElementById("creditsModalContent").style.display = "none";
}

// User clicks the credits button, open the credits modal 
function mainMenuCredits() {
    document.getElementById('myModal').style.display = "block";
    document.getElementById("settingsModalContent").style.display = "none";
    document.getElementById("creditsModalContent").style.display = "block";
}

// User clicks on <span> (x), close the modal
function exitModal() {
    document.getElementById('myModal').style.display = "none";
    document.getElementById("settingsModalContent").style.display = "none";
    document.getElementById("creditsModalContent").style.display = "none";
}

//Letters falling animation
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