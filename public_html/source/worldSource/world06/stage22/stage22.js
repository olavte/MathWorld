//functions for math and questions below


var answer;
var currentQuestion = 1;
mathStageNine();
//mathStageNineSecond();
//mathStageNineThird();



function mathStageNine(){
    
   
    
    var ansArray = new Array();
    var text = "";
    for(i = 0; i<1; i++){
        var num1 = randomNumber(5) +2;
        var num2 = randomNumber(5) +2;
        var num3 = randomNumber(4)+1;
        ansArray.push((num1 * num2) - num3);
       
        text += "(" + num1 + " x " + num2 + ")"  + " - "+ num3+ " = " + "<br />";
        
    }
    var answer = (num1 * num2) - num3;
     document.getElementById('question10').innerHTML = "Click the right pinecone for the math below: <br />"+text;
    
     document.getElementById('pineconediv1').appendChild(document.createTextNode(answer));
     document.getElementById('pineconediv2').appendChild(document.createTextNode(randomNumber(15)+5));
     document.getElementById('pineconediv3').appendChild(document.createTextNode(randomNumber(10)+5));
     //animations for the objects
     doNextPoint1();
     doNextPoint2();
     doNextPoint3();

}

function mathStageNineSecond(){
    
   
    
    var ansArray = new Array();
    var text = "";
    for(i = 0; i<1; i++){
        var num1 = randomNumber(6) +2;
        var num2 = randomNumber(6) +3;
        var num3 = randomNumber(4)+2;
        ansArray.push(num1 * num2) - num3;
       
        text += "(" + num1 + " x " + num2 + ")"  + " - "+ num3+ " = " + "<br />";
        
    }
    var answer = (num1 * num2) - num3;
     document.getElementById('question10').innerHTML = "Click the right pinecone for the math below: <br />"+text;
    
     document.getElementById('pineconediv1').appendChild(document.createTextNode(answer));
     document.getElementById('pineconediv2').appendChild(document.createTextNode(randomNumber(10)+5));
     document.getElementById('pineconediv3').appendChild(document.createTextNode(randomNumber(10)+5));
      //animations for the objects
     doNextPoint1();
     doNextPoint2();
     doNextPoint3();
 
    document.getElementById('#stage2answers').innerHTML = "";

}



function mathStageNineThird(){
    
   
    
    var ansArray = new Array();
    var text = "";
    for(i = 0; i<1; i++){
        var num1 = randomNumber(5) +1;
        var num2 = randomNumber(5) +3;
        var num3 = randomNumber(4) +1;
        ansArray.push(num1 * num2 / num3);
       
        text += "(" + num1 + " x " + num2 + ")"  + "/"+ num3+ " = " + "<br />";
        
    }
    var answer = Math.floor((num1 * num2) / num3);
     document.getElementById('question10').innerHTML = "Click the right pinecone for the multiplication below: <br />"+text;
    
     document.getElementById('pineconediv1').appendChild(document.createTextNode(answer));
     document.getElementById('pineconediv2').appendChild(document.createTextNode(randomNumber(15)+2));
     document.getElementById('pineconediv3').appendChild(document.createTextNode(randomNumber(10)+2));

     //animations for the objects
     doNextPoint1();
     doNextPoint2();
     doNextPoint3();
     creditsMoney +=50;

}


//Lets user know they were correct, 
function victoryScreen() {
    currentQuestion++;
    document.getElementById('#stage2answers').innerHTML = "CORRECT! Click Next";
    document.getElementById("mathbutton2").disabled = false;
     var option1 = document.getElementById('pineconediv1');
        option1.removeChild(option1.lastChild);
        var option2 = document.getElementById('pineconediv2');
        option2.removeChild(option2.lastChild);
        var option3 = document.getElementById('pineconediv3');
        option3.removeChild(option3.lastChild);
 if(currentQuestion === 5){
     backToWorld();
 }
}

//lets user know they pressed wrong
function sadnessScreen() {

    document.getElementById('#stage2answers').innerHTML = "WRONG!";
    reload();
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

    function clikedPic(clickedId) {
    
   var correctPic = document.getElementById(clickedId);
     if (correctPic===document.getElementById("pineconediv1")) {
    victoryScreen(); // rett svar knapp
        } 
        else if(!correctPic !==document.getElementById("pineconediv1")){
            sadnessScreen();
        }

   
   
 
   }
   //creates an area for the animation of the objects, width and heigth of stage background
//$('#animationArea').width($('#stage10background').width()).height(($('#stage10background').height()/2));


function doNextPoint1(){
    
   $('#animationArea').width($('#stage10background').width());
   $('#animationArea').height($('#stage10background').height());
    var animationTop = $("#animationArea")[0].getBoundingClientRect();
    var maxX = $('#animationArea').width() - $('#pineconediv1').width();    
    var newX = rand(0, maxX);    
    var maxY = $('#animationArea').height() - $('#pineconediv1').height();
    var newY = rand(animationTop.top, maxY);
    var speed  = rand (1000, 600);
    
    $('#pineconediv1').animate({
        'top': newY + 'px',
        'left': newX + 'px'
        
    }, speed, function(){
        doNextPoint1();    
    });
    
    
    
    
}
//$('#animationArea').width($('#stage10background').width()).height(($('#stage10background').height()/2));


function doNextPoint2(){
    var animationTop = $("#animationArea")[0].getBoundingClientRect();
    var maxX = $('#animationArea').width() - $('#pineconediv2').width();    
    var newX = rand(0, maxX);    
    var maxY = $('#animationArea').height() - $('#pineconediv2').height();
    var newY = rand(animationTop.top, maxY);
    var speed  = rand (1000, 600);
    
    $('#pineconediv2').animate({
        'top': newY + 'px',
        'left': newX + 'px'
        
    }, speed, function(){
        doNextPoint2();    
    });

}
//$('#animationArea').width($('#stage10background').width()).height(($('#stage10background').height()/2));


function doNextPoint3(){
    var animationTop = $("#animationArea")[0].getBoundingClientRect();
    var maxX = $('#animationArea').width() - $('#pineconediv3').width();    
    var newX = rand(0, maxX);    
    var maxY = $('#animationArea').height() - $('#pineconediv3').height();
    var newY = rand(animationTop.top, maxY);
    var speed  = rand (1000, 600);
    
    $('#pineconediv3').animate({
        'top': newY + 'px',
        'left': newX + 'px'
        
    }, speed, function(){
        doNextPoint3();    
    });
    
}
function rand (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}    

function reload() {
    goToNewScreen('source/worldSource/world06/stage22/stage22.html', 'source/worldSource/world06/stage22/stage22.js');
    
}

function backToWorld() {
    goToNewScreen('source/worldSource/world06/world06.html', 'source/worldSource/world06/world06.js');
    }