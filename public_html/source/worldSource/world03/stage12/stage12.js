
$('#pineconediv4,#pineconediv5,#pineconediv6').draggable(); 

var pinecones = $(".divshuffle");
for(var i = 0; i < pinecones.length; i++){
    var target = Math.floor(Math.random() * pinecones.length -1) + 1;
    var target2 = Math.floor(Math.random() * pinecones.length -1) +1;
    pinecones.eq(target).before(pinecones.eq(target2));
}


var answer;
currentQuestion=1;
mathStageNine();
//mathStageNineSecond();
//mathStageNineThird();

var changeMathDelay = 1000;



function mathStageNine(){
  
    
    var ansArray = new Array();
    var text = "";
    for(i = 0; i<1; i++){
        var num1 = randomNumber(9) +2;
        var num2 = randomNumber(10) +2;
        ansArray.push(num1 * num2);
       
        text += num1 + " x " + num2 + " = " + "<br />";
        
    }
    var answer = num1 * num2;
     document.getElementById('question10').innerHTML = "Drag the correct pinecone to the squirrel <br />\n\
                                                       for the multiplication below: <br />"+text;
    
     document.getElementById('pineconediv4').appendChild(document.createTextNode(answer));
     document.getElementById('pineconediv5').appendChild(document.createTextNode(randomNumber(15)+30));
     document.getElementById('pineconediv6').appendChild(document.createTextNode(randomNumber(10)+40));
     //animations for the objects
    

}

function mathStageNineSecond(){
    
   
    
    var ansArray = new Array();
    var text = "";
    for(i = 0; i<1; i++){
        var num1 = randomNumber(4) +2;
        var num2 = randomNumber(5) +3;
        var num3 = randomNumber(5) +2;
        ansArray.push(num1 * num2 * num3);
       
        text += num1 + " x " + num2 + " x " + num3 + " = " + "<br />";
        
    }
    var answer = num1 * num2 * num3;
     document.getElementById('question10').innerHTML = "Drag the correct pinecone to the squirrel <br />\n\
                                                        for the multiplication below: <br />"+text;
    
     document.getElementById('pineconediv4').appendChild(document.createTextNode(answer));
     document.getElementById('pineconediv5').appendChild(document.createTextNode(randomNumber(10)+40));
     document.getElementById('pineconediv6').appendChild(document.createTextNode(randomNumber(10)+20));
      //animations for the objects
    
 
    document.getElementById('qanswers').innerHTML = "";

}



function mathStageNineThird(){
    
   
    
    var ansArray = new Array();
    var text = "";
    for(i = 0; i<1; i++){
        var num1 = randomNumber(10) +1;
        var num2 = randomNumber(10) +3;
        var num3 = randomNumber(5) +1;
        ansArray.push(num1 * num2 * num3);
       
        text += num1 + " * " + num2 + " * " + num3 + " = " + "<br />";
        
    }
    var answer = num1 * num2 * num3;
     document.getElementById('question10').innerHTML = "Drag the correct pinecone to the squirrel <br /> for the multiplication below: <br />"+text;
    
     document.getElementById('pineconediv4').appendChild(document.createTextNode(answer));
     document.getElementById('pineconediv5').appendChild(document.createTextNode(randomNumber(15)+2));
     document.getElementById('pineconediv6').appendChild(document.createTextNode(randomNumber(10)+2));

     //animations for the objects
     
 

}

function removeChilds(){
       var option1 = document.getElementById('pineconediv4');
        option1.removeChild(option1.lastChild);
        var option2 = document.getElementById('pineconediv5');
        option2.removeChild(option2.lastChild);
        var option3 = document.getElementById('pineconediv6');
        option3.removeChild(option3.lastChild);
    
}

function nextMath(){
    removeChilds();
    creditsMoney += 50;
    reload();

    
   
   
    setTimeout(function() {
    removeChilds();
    mathStageNineSecond();
}, changeMathDelay);
    
   
}


//Lets user know they were correct, 
function victoryScreen() {
    removeChilds();
    document.getElementById('qanswers').innerHTML = "CORRECT!";
    document.getElementById("mathbutton2").disabled = false;
    
   
   
    nextMath(); 

    
   
    

   
      
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



window.setInterval(function() {
    $('#result').text(collision_($('#pineconediv4'), $('#squirrel')));
}, 200);
 
function rand (min, max) {
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
        
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
    }

    function collision_() {
    if (arguments.length > 1) {
        for (var x = 0; x < arguments.length; x++) {
            for (var y = 1; y < arguments.length; y++) {
                if (x === y) {
                    continue;
                }
                if (collision(arguments[x], arguments[y])) {
                        victoryScreen();
                        return true;
                   
                }
            }
        }
        return false;
      
        
    }
}


