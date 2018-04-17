// get canvas related references
//canvas init

var middleCanvas = document.getElementById("middleCanvas");
var middleCtx = middleCanvas.getContext("2d");

//stage progression, gets harder as it goes along, until beatStage is reached
var currentOptions = 3;
var beatStage = 6;

//global selected variables
var selectedRec;
var selectedRec2;
var computerSelected;
var hasSelected = false;
var options = [];





var W = window.innerWidth;
var H = window.innerHeight;

middleCanvas.width = W;
middleCanvas.height = H;


//the squares on canvas for options/answer
var elements;
var computerOptions;

startGame();

function startGame() {
    
    selectedRec1 = null;
    selectedRec2 = null;
    fillElements();
    fillComputerOptions();
    fillOptions();
    drawMiddle();

}

function drawMiddle() {
        middleCtx.clearRect(0, 0, W, H);
        middleCtx.fillStyle = "white";
        middleCtx.fillRect(0, 0, W, H);
        
        headLine("Add the numbers in the right order", 50);
        
        //minus and equal signs
        middleCtx.fillStyle = "black";
        middleCtx.font="100px Arial";
        middleCtx.fillText("-", W/2 - 110, 445);
        middleCtx.fillText("=", W/2 + 240, 445);
        
        drawOptions(currentOptions);
        drawMath();
    }

//the number options
function drawOptions(optionNumber) {
            var numbString = "";
            for (var i = 0; i < optionNumber; i++) {
            var el = elements[i];
            el.number = options[i];
            numbString = el.number;
            if(el === selectedRec) {
                middleCtx.fillStyle = "red";
                middleCtx.fillRect(el.left - 6, el.top - 6, el.width + 12, el.height + 12);
                middleCtx.fillStyle = "white";
                middleCtx.fillRect(el.left, el.top, el.width, el.height);
            } else {
                
                middleCtx.fillStyle = "grey";
                middleCtx.fillRect(el.left, el.top, el.width, el.height);

            }
            middleCtx.fillStyle = "black";
            middleCtx.textAlign="center"; 
            middleCtx.textBaseline = "middle";
            middleCtx.font="25px Arial";
            middleCtx.fillText(numbString, el.left + (el.width / 2), el.top + (el.height / 2));
               

            }
    
}
//the empty rectangles to be filled with numbers
function drawMath() {
            var numbString = "";
            
            for (var i = 0; i < computerOptions.length; i++) {
            
            var cs = computerOptions[i];
            numbString = cs.number;
            if(cs === selectedRec2) {    
                middleCtx.fillStyle = "black";
                middleCtx.fillRect(cs.left - 6, cs.top - 6, cs.width + 12, cs.height + 12);
                middleCtx.fillStyle = cs.colour;
                middleCtx.fillRect(cs.left, cs.top, cs.width, cs.height);
            } else {
                
                middleCtx.fillStyle = "black";
                middleCtx.fillRect(cs.left - 6, cs.top - 6, cs.width + 12, cs.height + 12);
                middleCtx.fillStyle = "grey";
                middleCtx.fillRect(cs.left, cs.top, cs.width, cs.height);
                
            }
            
            middleCtx.fillStyle = "black";
            middleCtx.textAlign="center"; 
            middleCtx.textBaseline = "middle";
            middleCtx.font="35px Arial";
            middleCtx.fillText(numbString, cs.left + (cs.width / 2), cs.top + (cs.height / 2));
            
            }
    
}

// Add event listener for `click` events.
middleCanvas.addEventListener('click', function(event) {
    
    //scaling if canvas is resised from bitmap
    var rect = middleCanvas.getBoundingClientRect();
    var scaleX = middleCanvas.width / rect.width;
    var scaleY = middleCanvas.height / rect.height;
    
    //get mouse position
    var x = (event.clientX - rect.left) * scaleX,
        y = (event.clientY - rect.top) * scaleY;

    // Collision detection between clicked offset and element.
       for(i = 0; i < elements.length; i++){
        var element = elements[i];
        if (y > element.top && y < element.top + element.height 
            && x > element.left && x < element.left + element.width) {
            selectedRec = element;
        }
        drawMiddle();
    }
       for(i = 0; i < computerOptions.length; i++){
        var element = computerOptions[i];
        if (y > element.top && y < element.top + element.height 
            && x > element.left && x < element.left + element.width) {
            selectedRec2 = element;
        }
        drawMiddle();
    }
    
    if(selectedRec2 && selectedRec) {
        
        selectedRec2.number = selectedRec.number;
        drawMiddle();
    }
    
}, false);

//empties option pool, and re-fill it with random numbers + a failsafe number (two of the random numbers added)
//making sure there is always a solution
function fillOptions() {
    var tempOptions = [randomNumber(60, 30), randomNumber(25, 4), randomNumber(50, 15), randomNumber(30, 9), randomNumber(30, 10), randomNumber(30, 10)];
    var numb6 = tempOptions[tempOptions.length - 1] + tempOptions[tempOptions.length - 2];
    tempOptions.push(numb6);
    options = [];
    options = tempOptions.slice(currentOptions * (-1));
    shuffle(options);
    
}

function fillElements() {
    
    elements = [];
    elements.push({
        width: 75,
        height: 75,
        top: H - 175,
        left: W/2 - 105,
        number: ""
        }, {
        width: 75,
        height: 75,
        top: H - 175,
        left: W/2,
        number: ""
        }, {
        width: 75,
        height: 75,
        top: H - 175,
        left: W/2 + 105,
        number: ""
        }, {
        width: 75,
        height: 75,
        top: H - 175,
        left: W/2 - 210,
        number: ""
        }, {
        width: 75,
        height: 75,
        top: H - 175,
        left: W/2 + 210,
        number: ""
        }, {
        width: 75,
        height: 75,
        top: H - 175,
        left: W/2 + 315,
        number: ""
        } 
        );
    
}

function fillComputerOptions() {
    
    computerOptions = [];

    computerOptions.push({
        colour: 'white',
        width: 150,
        height: 150,
        top: 350,
        left: W/2 - 350,
        number: ""
    }, {
        colour: 'white',
        width: 150,
        height: 150,
        top: 350,
        left: W/2,
        number: ""
        }, {
        colour: 'white',
        width: 150,
        height: 150,
        top: 350,
        left: W/2 + 350,
        number: ""
        });
    
}

//determine if answer is right, and progress to harder assignement, until stage is beat, then exit to world
function checkAnswer() {
        var playerSolution = computerOptions[0].number;
        var playerAnswer = computerOptions[computerOptions.length - 1].number;
        
        for(i = 1; i < computerOptions.length - 1; i++) {
            playerSolution -= computerOptions[i].number;
        }

        if(playerSolution === playerAnswer) {
            drawMiddle();
            headLine("Correct!", 120);
            setTimeout(function () {
                if(currentOptions < beatStage) {
                //progress if not beat
                    currentOptions ++;
                    startGame();
                } else {
                //beat stage
                    drawMiddle();
                    headLine("You are now ready for the next world!", 205);
                    if(currentStage < 8) {
                        currentStage = 8;
                    }
                    setTimeout(function() {backToWorld();}, 2500);
                }
            }, 1000);
        } else {
            drawMiddle();
            headLine("Hmm no, this will give you " + playerSolution + " not " + playerAnswer, 120);
        }
   
}

function headLine(text, height) {

    middleCtx.fillStyle = "black";
    middleCtx.font="50px Arial";
    middleCtx.fillText(text, W/2, height);
    
}

//shuffle array (like answer array) (Modern Fisher–Yates shuffle algorithm via 

function shuffle(sourceArray) {
    for (var n = 0; n < sourceArray.length - 1; n++) {
        var k = n + Math.floor(Math.random() * (sourceArray.length - n));

        var temp = sourceArray[k];
        sourceArray[k] = sourceArray[n];
        sourceArray[n] = temp;
    }
}

function randomNumber(upToo, min) {
    var randNumb = Math.floor((Math.random() * upToo) + min);
    return randNumb;
}

function reload() {
    goToNewScreen('source/worldSource/world02/stage08/stage08.html', 'source/worldSource/world02/stage08/stage08.js');
}

function backToWorld() {
    goToNewScreen('source/worldSource/world02/world02.html', 'source/worldSource/world02/world02.js');
}
function backToMenu() {
    goToNewScreen('source/mainMenuSource/mainMenu/mainMenu.html', 'source/mainMenuSource/mainMenu/mainMenu.js');
}

