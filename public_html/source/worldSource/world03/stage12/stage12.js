
var pinecones = $(".divshuffle");
for (var i = 0; i < pinecones.length; i++) {
    var target = Math.floor(Math.random() * pinecones.length - 1) + 1;
    var target2 = Math.floor(Math.random() * pinecones.length - 1) + 1;
    pinecones.eq(target).before(pinecones.eq(target2));
}

iniBack('world3Canvas');

var multiplicationCharacter = createAnimatedSprite('assets/characters/MultiPlicationCharSpr.png', 1200, 300, 300, 300, 3, 30);

//snowflake particles
iniBackgroundEffects(1);

//Lets draw the flakes
function draw()
{
    backCtx.clearRect(0, 0, W, H);

    multiplicationCharacter.updateFrame();


    updateBackgroundEffects(1);
    backCtx.drawImage(multiplicationCharacter.image, multiplicationCharacter.srcX, multiplicationCharacter.srcY, multiplicationCharacter.spriteWidth,
        multiplicationCharacter.spriteHeight, 160, 150, multiplicationCharacter.spriteWidth, multiplicationCharacter.spriteHeight);
}

//animation loop
animationLoop = setInterval(draw, 16);




$('#pineconediv4,#pineconediv5,#pineconediv6').draggable();



doNextPoint1();
var answer;

mathStageNine();
//mathStageNineSecond();
//mathStageNineThird();

var changeMathDelay = 50;
currentQuestion = 1;
document.getElementById("counter").innerHTML ="Question " + currentQuestion + " of 7";


function mathStageNine() {

    document.getElementById("mathbutton2").disabled = true;
    var ansArray = new Array();
    var text = "";
    for (i = 0; i < 1; i++) {
        var num1 = randomNumber(9) + 2;
        var num2 = randomNumber(10) + 2;
        ansArray.push(num1 * num2);

        text += num1 + " x " + num2 + " = " + "<br />";

    }
    var answer = num1 * num2;
    document.getElementById('question10').innerHTML = "Drag the correct pinecone to the squirrel <br />\n\
                                                       for the multiplication below: <br />" + text;

    document.getElementById('pineconediv4').appendChild(document.createTextNode(answer));
    document.getElementById('pineconediv5').appendChild(document.createTextNode(randomNumber(15) + 30));
    document.getElementById('pineconediv6').appendChild(document.createTextNode(randomNumber(10) + 40));
    //animations for the objects

document.getElementById('qanswers').innerHTML = "" ;
}

function mathStageNineSecond() {
    
   
    
    document.getElementById("mathbutton2").disabled = true;
$("#pineconediv4").css({top: 200, left: Math.floor(Math.random() * 1000 - 1), position:'absolute'});
$("#pineconediv5").css({top: 200, left: Math.floor(Math.random() * 1100 - 1), position:'absolute'});
$("#pineconediv6").css({top: 200, left: Math.floor(Math.random() * 1200 - 1), position:'absolute'});

    var ansArray = new Array();
    var text = "";
    for (i = 0; i < 1; i++) {
        var num1 = randomNumber(4) + 1;
        var num2 = randomNumber(4) + 1;
        var num3 = randomNumber(5) + 2;
        ansArray.push(num1 * num2 * num3);

        text += num1 + " x " + num2 + " x " + num3 + " = " + "<br />";

    }
    var answer = num1 * num2 * num3;
    document.getElementById('question10').innerHTML = "Drag the correct pinecone to the squirrel <br />\n\
                                                        for the multiplication below: <br />" + text;

    document.getElementById('pineconediv4').appendChild(document.createTextNode(answer));
    document.getElementById('pineconediv5').appendChild(document.createTextNode(randomNumber(15) + 43));
    document.getElementById('pineconediv6').appendChild(document.createTextNode(randomNumber(15) + 21));
    //animations for the objects
document.getElementById('qanswers').innerHTML = "" ;


 
}



function mathStageNineThird() {
    
    document.getElementById("mathbutton2").disabled = true;
    $("#pineconediv4").css({top: 200, left: Math.floor(Math.random() * 1000 - 1), position:'absolute'});
$("#pineconediv5").css({top: 200, left: Math.floor(Math.random() * 1100 - 1), position:'absolute'});
$("#pineconediv6").css({top: 200, left: Math.floor(Math.random() * 1200 - 1), position:'absolute'});
  
    removeChilds();
  

    var ansArray = new Array();
    var text = "";
    for (i = 0; i < 1; i++) {
        var num1 = randomNumber(3) + 2;
        var num2 = randomNumber(2) + 2;
        var num3 = randomNumber(3) + 2;
        var num4 = randomNumber(3) + 1;
        ansArray.push(num1 * num2 * num3 * num4);

        text += num1 + " x " + num2 + " x " + num3 + " x " + num4 + " = " + "<br />";

    }
    var answer = num1 * num2 * num3 * num4;
    document.getElementById('question10').innerHTML = "Drag the correct pinecone to the squirrel <br /> for the multiplication below: <br />" + text;

    document.getElementById('pineconediv4').appendChild(document.createTextNode(answer));
    document.getElementById('pineconediv5').appendChild(document.createTextNode(randomNumber(8)+3 * 8));
    document.getElementById('pineconediv6').appendChild(document.createTextNode(randomNumber(8)+3 * 9));

    //animations for the objects
doNextPoint1();

document.getElementById('qanswers').innerHTML = "" ;
}

function removeChilds() {
    var option1 = document.getElementById('pineconediv4');
    option1.removeChild(option1.lastChild);
    var option2 = document.getElementById('pineconediv5');
    option2.removeChild(option2.lastChild);
    var option3 = document.getElementById('pineconediv6');
    option3.removeChild(option3.lastChild);

}

function nextMath() {
     $("#pineconediv4").css({top: 200, left: Math.floor(Math.random() * 1000 - 1), position:'absolute'});
    currentQuestion++;
    document.getElementById("counter").innerHTML ="Question " + currentQuestion + " of 7";
    if(currentQuestion===2){
        removeChilds();
        setTimeout(function () {
      
        mathStageNine();
    }, changeMathDelay);
        
    }else if(currentQuestion===3){
        removeChilds();
        setTimeout(function () {
      
        mathStageNine();
    }, changeMathDelay);
    }else if(currentQuestion===4){
        removeChilds();
        setTimeout(function () {
      
        mathStageNineSecond();
    }, changeMathDelay);
     }else if(currentQuestion===5){
        removeChilds();
        setTimeout(function () {
      
        mathStageNineSecond();
    }, changeMathDelay);
     }else if(currentQuestion===6){
        removeChilds();
        setTimeout(function () {
      
        mathStageNineSecond();
    }, changeMathDelay);
    }else if(currentQuestion===7){
        removeChilds();
        setTimeout(function () {
      
        mathStageNineThird();
    }, changeMathDelay);
    }else if(currentQuestion===8){
        if(currentStage < 12) {
            currentStage = 12;
        }
        creditsMoney += 50;
        backToWorld();
    }
    
    
    
    
   
    


}



   


//Lets user know they were correct, 
function victoryScreen() {
    
     //$("#pineconediv4").parent().css({position: 'relative'});
   // $("#pineconediv4").css({top: 200, left: Math.floor(Math.random() * 300 - 1) + 1, position:'absolute'});
    
    
   document.getElementById('qanswers').innerHTML = "Correct, click next!" ;
   document.getElementById("mathbutton2").disabled = false;
}

//lets user know they pressed wrong
function sadnessScreen() {

    document.getElementById('qanswers').innerHTML = "WRONG!";

}


//få random nummer 
//@param opp til nummer upToo
//@return random nummer
function randomNumber(upToo) {
    var randNumb = Math.floor(Math.random() * upToo);
    return randNumb;
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



window.setInterval(function () {
    $('#result').text(collision_($('#pineconediv4'), $('#squirrel')));
}, 200);

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reload() {
    
    
    goToNewScreen('source/worldSource/world03/stage12/stage12.html', 'source/worldSource/world03/stage12/stage12.js');
    
 
 }



function backToWorld() {
    goToNewScreen('source/worldSource/world03/world03.html', 'source/worldSource/world03/world03.js');
}



function collision($pineconediv4, $squirrel) {
    var x1 = $pineconediv4.offset().left;
    var y1 = $pineconediv4.offset().top;
    var h1 = $pineconediv4.outerHeight(true);
    var w1 = $pineconediv4.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $squirrel.offset().left;
    var y2 = $squirrel.offset().top;
    var h2 = $squirrel.outerHeight(true);
    var w2 = $squirrel.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)
        return false;
    return true;
}


    function collision_() {
 

    if (arguments.length > 1) {
 
        for (var x = 0; x < arguments.length; x++) {
 
            for (var y = 1; y < arguments.length; y++) {
 
                
 
                if (collision(arguments[x], arguments[y])) {
 
                        victoryScreen();
 
                        return true;
 
       
                      }
                return false;
                }  
 
            }
        }
    }



function doNextPoint1(){
    
   $('#world3Canvas').width($('#world3Canvas').width());
   $('#world3Canvas').height($('#world3Canvas').height());
    var maxX = $('#world3Canvas').width() - $('#squirrel').width();    
    var newX = rand(0, maxX);    
   
    var speed  = rand (1000, 300);
    
    $('#squirrel').animate({
        'left': newX + 'px'
        
    }, speed, function(){
        doNextPoint1();    
    });
    
    
    
    
}