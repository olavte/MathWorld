/*
 */
//document.getElementById('myModal').style.display = "block";
//document.getElementById('stage2StartModalContent').style.display = "block";

//canvas init

iniBack("creditsCanvas");
iniFront("frontCanvas");

//Music
playMusic(startMenuMusic);
iniBackgroundEffects(1);

var currentSceneText = 0;
var currentAlpha = 0;
var alphaGoingUp = true;
var timerForAlpha = 0;

var startingSceneText = [
    {
        text: "There  was  once  a  math  teacher",
        x: W/2,
        y: H/2
    },
    {
        text: "His  class  was  so  bad  at  math",
        x: W * (40/100),
        y: H * (40/100)
    },
    {
        text: "So  he  tried  to  find  another  way",
        x: W/2,
        y: H/2
    },
    {
        text: "He  found  a  spell  that  would...",
        x: W/2,
        y: H/2
    },
    {
        text: "Force  everyone  to  learn  math!",
        x: W/2,
        y: H/2
    },
    {
        text: "He  casted  a  spell",
        x: W/2,
        y: H/2
    },
    {
        text: "and  turned  everyone  to..",
        x: W/2,
        y: H/2
    },
    {
        text: "Math  operators!!",
        x: W/2,
        y: H/2
    },
    {
        text: "And  casted  them  away  in  a  portal",
        x: W/2,
        y: H/2
    },
    {
        text: "Here  your  story  begins",
        x: W/2,
        y: H/2
    }
]


window.addEventListener("mousemove", mouseMove);
function mouseMove(event) {
    event.preventDefault();
}


//Lets draw the flakes
function draw()
{
    backCtx.clearRect(0, 0, W, H);
    frontCtx.clearRect(0, 0, W, H);

    drawBack();
    drawMiddle();

    function drawBack() {
        updateBackgroundEffects(1);
    }

    function drawMiddle() {

        var text = startingSceneText[currentSceneText];

        updateGame();

        frontCtx.fillStyle = "rgba(0, 0, 0, 0.2)";
        frontCtx.beginPath();
        frontCtx.rect(W/8, 0, W*(6/8), H);
        frontCtx.fill();

        frontCtx.fillStyle = "rgba(20, 20, 20, 0.8)";
        frontCtx.beginPath();
        frontCtx.rect(W/6, 0, W*(4/6), H);
        frontCtx.fill();

        if(currentSceneText >= 2) {
            if(currentMusic !== finalBossMusic) {
                playMusic(finalBossMusic);
            }
        }

        frontCtx.fillStyle = "rgba(255, 255, 255, " + currentAlpha + ")";
        frontCtx.font = "24px chalkboard";
        frontCtx.textAlign = "center";
        frontCtx.fillText(text.text, text.x, text.y);
    }
}

function updateGame() {
    if(currentAlpha <= 0 && alphaGoingUp === false) {
        if(timerForAlpha >= 30) {
            alphaGoingUp = true;
            currentSceneText++;
            timerForAlpha = 0;
        } else {
            timerForAlpha++;
        }
    } else if (currentAlpha >= 1 && alphaGoingUp === true) {
        if(timerForAlpha >= 5) {
            alphaGoingUp = false;
            timerForAlpha = 0;
        } else {
            timerForAlpha++;
        }
    } else {
        if (alphaGoingUp === true) {
            currentAlpha += 0.01;
        } else {
            currentAlpha -= 0.008;
        }
    }

    if(currentSceneText > startingSceneText.length - 1) {
        goToNewScreen('source/worldSource/world01/world01.html', 'source/worldSource/world01/world01.js');
    }
}

//animation loop, 60 fps
animationLoop = setInterval(draw, 33);
