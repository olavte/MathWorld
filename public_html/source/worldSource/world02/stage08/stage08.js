// get canvas related references
//canvas init

var middleCanvas = document.getElementById("middleCanvas");
var middleCtx = middleCanvas.getContext("2d");

//global selected variables
var selectedRec;
var selectedRec2;
var computerSelected;
var hasSelected = false;
var numb1 = randomNumber(20);
var numb2 = randomNumber(30);
var numb3 = numb1 + numb2;
var options = [numb1, numb2, numb3];
shuffle(options);



var W = window.innerWidth;
var H = window.innerHeight;

middleCanvas.width = W;
middleCanvas.height = H;


//rectangles, placeholder for rock/paper/scissor figure
var elements = [];
elements.push({
    colour: 'red',
    width: 75,
    height: 75,
    top: H - 175,
    left: W/2 - 105,
    number: ""
    
}, {
    colour: 'blue',
    width: 75,
    height: 75,
    top: H - 175,
    left: W/2,
    number: ""
    }, {
    colour: 'green',
    width: 75,
    height: 75,
    top: H - 175,
    left: W/2 + 105,
    number: ""
    });

var computerOptions = [];

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

startGame();

function startGame()
{   
    drawMiddle();
    headLine("Add the numbers in the right order");

}

function drawMiddle() {
        middleCtx.clearRect(0, 0, W, H);
        middleCtx.fillStyle = "white";
        middleCtx.fillRect(0, 0, W, H);
        
        
        //minus and equal signs
        middleCtx.fillStyle = "black";
        middleCtx.font="100px Arial";
        middleCtx.fillText("-", W/2 - 110, 445);
        middleCtx.fillText("=", W/2 + 240, 445);
        
        drawOptions();
        drawMath();
    }

//the number options
function drawOptions() {
            var numbString = "";
            for (var i = 0; i < elements.length; i++) {
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
                middleCtx.fillStyle = "white";
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

function checkAnswer() {
        
        var first = computerOptions[0];
        var second = computerOptions[1];
        var third = computerOptions[2];
        if((first.number - second.number) === third.number) {
            headLine("Correct!");
        } else {
            headLine("Hmm no, this will give you " + (first.number - second.number) + ", try again");
        }
   
}

function headLine(text) {

    
    middleCtx.fillStyle = "black";
    middleCtx.font="50px Arial";
    middleCtx.fillText(text, W/2, 50);
    
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

function randomNumber(upToo) {
    var randNumb = Math.floor((Math.random() * upToo) + 1);
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

