/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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

// Changes the main volume
function changeVolumeOnMain() {
    globalVolume = document.getElementById("mainVolumeRange").value / 100;
    mainMusic.volume = globalVolume * musicVolume;
}

// Changes the music volume
function changeVolumeOnMusic() {
    musicVolume = document.getElementById("musicVolumeRange").value / 100;
    mainMusic.volume = globalVolume * musicVolume;
}

// Changes the sound volume
function changeVolumeOnSound() {
    soundVolume = document.getElementById("soundVolumeRange").value / 100;
}

// User releases the button, removes volumeBarInterval
function volumeBarClickedUp() {
    clearInterval(volumeBarInterval);
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

var canvas = document.getElementById("mainMenuCanvas");
var ctx = canvas.getContext("2d");

//canvas dimensions
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width = W;
canvas.height = H;

//letters
var mp = 30; //max letters
var particles = [];
for (var i = 0; i < mp; i++)
{
    particles.push({
        x: Math.random() * W, //x-coordinate
        y: Math.random() * H, //y-coordinate
        r: Math.random() * 4 + 1, //radius
        d: Math.random() * mp, //density
        n: Math.round((Math.random() * 100) + 1),
        s: Math.round((Math.random() * 300) + 1),
        cr: Math.round((Math.random() * 255) + 1),
        cg: Math.round((Math.random() * 255) + 1),
        cb: Math.round((Math.random() * 255) + 1),
    });
}

//Draw the letters
function draw()
{
    ctx.clearRect(0, 0, W, H);
    ctx.beginPath();
    for (var i = 0; i < mp; i++)
    {
        var p = particles[i];
        ctx.fillStyle = "rgba(" + p.cr + ", " + p.cg + ", " + p.cb + ", 0.9)";
        ctx.font = p.s + "px Verdana";
        ctx.fillText(p.n, p.x, p.y);
    }
    update();
}

//Function to move the letters
var angle = 0;
function update()
{
    angle += 0.01;
    for (var i = 0; i < mp; i++)
    {
        var p = particles[i];
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;

        if (p.x > W + 15 || p.x < -200 || p.y > H + 200)
        {
            particles[i] = {x: Math.random() * W, y: -10, r: p.r, d: p.d, n: p.n, s: p.s, cr: p.cr, cg: p.cg, cb: p.cb};
        }
    }
}

//animation loop
var animationLoop = setInterval(draw, 33);