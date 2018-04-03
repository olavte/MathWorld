//canvas init
iniBack("mainMenuCanvas");
iniMiddle("middleCanvas");
iniFront("frontCanvas");

var startingHistory = "There was once a teacher";
var startingHistoryArray = startingHistory.split("");

//letters
iniBackgroundEffects(0);

//Draw the letters
function draw()
{
    document.getElementById("startingSceneContent").innerHTML
    backCtx.clearRect(0, 0, W, H);
    updateBackgroundEffects(0);
}

//animation loop
var animationLoop = setInterval(draw, 16);
