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
    number: numb1
    
}, {
    colour: 'blue',
    width: 75,
    height: 75,
    top: H - 175,
    left: W/2,
    number: numb2
    }, {
    colour: 'green',
    width: 75,
    height: 75,
    top: H - 175,
    left: W/2 + 105,
    number: numb3
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
    shuffle(elements);
    drawMiddle();

}

function drawMiddle() {
        middleCtx.clearRect(0, 0, W, H);
        middleCtx.fillStyle = "white";
        middleCtx.fillRect(0, 0, W, H);
        var numbString = "";
        //minus signs
        middleCtx.fillStyle = "black";
        middleCtx.font="100px Arial";
        middleCtx.fillText("-", computerOptions[0].left + 240, 445);
        middleCtx.fillText("=", computerOptions[1].left + 240, 445);
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
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
        for (var i = 0; i < computerOptions.length; i++) {
            
            var cs = computerOptions[i];
            numbString = cs.number;
            
            if(cs === selectedRec2) {    
                middleCtx.fillStyle = "white";
                middleCtx.fillRect(cs.left, cs.top, cs.width, cs.height);
            } else {
                
                middleCtx.fillStyle = "black";
                middleCtx.fillRect(cs.left - 6, cs.top - 6, cs.width + 12, cs.height + 12);
                middleCtx.fillStyle = "white";
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
            alert("correct!");
        } else {
            alert("wrong, you got" + (first.number - second.number));
        }
   
}

//shuffle array (like answer array) (Modern Fisher–Yates shuffle algorithm via 
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
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

