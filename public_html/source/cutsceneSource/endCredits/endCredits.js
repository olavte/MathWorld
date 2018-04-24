/*
 */
//document.getElementById('myModal').style.display = "block";
//document.getElementById('stage2StartModalContent').style.display = "block";

//canvas init

iniBack("creditsCanvas");

iniMiddle("middleCanvas");

iniFront("frontCanvas");

//Music
if(currentMusic != startMenuMusic) {
    playMusic(startMenuMusic);
}
iniBackgroundEffects(1);

// Game variables
var scrollSpeed = 2;
var initialY = H + 500;
var separation = 200;


var creditsText = [];
creditsText.push("Thank you for playing!");
creditsText.push("");
creditsText.push("Developers:");
creditsText.push("Knut  Johan  Selnes");
creditsText.push("Olav  Telseth");
creditsText.push("Eivind  Michael  Myklebust");
creditsText.push("Einar Weltan");
creditsText.push("");
creditsText.push("Concept:");
creditsText.push("Viana  Vafamehr");
creditsText.push("Imma  Ulheim");
creditsText.push("Darta  Strazdina");


//Math Objects
var mathObjects = [];
for(var i = 0; i < creditsText.length; i++) {
    mathObjects.push({
        name:"math" + (i + 1),
        mathX:W / 2,
        mathY:initialY,
        mathW:W/40,
        mathNumber:creditsText[i]});

    initialY += separation;
}


window.addEventListener("mousemove", mouseMove);
function mouseMove(event) {
    event.preventDefault();
}


//Lets draw the flakes
function draw()
{
    backCtx.clearRect(0, 0, W, H);
    middleCtx.clearRect(0, 0, W, H);
    frontCtx.clearRect(0, 0, W, H);

    drawBack();
    drawMiddle();

    function drawBack() {
        updateBackgroundEffects(1);
    }

    function drawMiddle() {


        updateGame();

        mathObjects.forEach(function(mathObject) {
            frontCtx.textAlign = "center";
            frontCtx.fillStyle = "rgba(255, 255, 255, 1)";
            frontCtx.font = "48px chalkboard";
            frontCtx.fillText(mathObject.mathNumber, mathObject.mathX, mathObject.mathY
                - (mathObject.mathH));
        });
    }
}

function updateGame() {

    mathObjects.forEach(function(mathObject) {
        mathObject.mathY -= scrollSpeed;
    });

    var lastIndex = mathObjects.length - 1;
    var lastText = mathObjects[lastIndex];

    if (lastText.mathY <= -50)
    {
        goToNewScreen('source/mainMenuSource/mainMenu/mainMenu.html', 'source/mainMenuSource/mainMenu/mainMenu.js')
    }
    console.log("mathY = " + lastText.mathY);
    console.log("H/2 = " + (H / 2));
    console.log("music vol = " + musicVolume);
}


function setStartCredits() {

    var newY = H + 500;
    var i = 0;
    //Math Object
    mathObjects.forEach(function(mathObject) {
        mathObject.mathX = W / 2;
        mathObject.mathY = newY;
        mathObject.mathW = W / 10;
        mathObject.mathH = H / 10;
        mathObject.falling = false;
        mathObject.mathNumber = creditsText[i];
        newY += separation;
        i++;
    });
}

//animation loop, 60 fps
animationLoop = setInterval(draw, 16);

setStartCredits();
