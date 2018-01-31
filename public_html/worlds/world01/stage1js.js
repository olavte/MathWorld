/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//math JS testing atm
//legger sammen to random tall (opp til 100)
//skriver dynamisk matte spørsmål og knapper med 1 rett 2 feil svar
//i tilfelding rekkefølge

//saves the completed leves, no use atm
var completedLevel = [];
//saves the current level the user has clicked
var currentLevel;


//final level in world 1, for special assignement and timer function
function mathOneFinal() {
    
    //TODO
    alert("TODO");
}

function GetMath(clickedLevel) {
    var firstNumber = randomNumber(100);
    var secondNumber = randomNumber(100);
    var answer = firstNumber + secondNumber;
    var options1 = [answer, randomNumber(200), randomNumber(150)];
    var options2 = [answer, randomNumber(200), randomNumber(150), randomNumber(100)];
    var options3 = [answer, randomNumber(200), randomNumber(150), randomNumber(100), randomNumber(250), randomNumber(75)];
    
    var map = {
        'level1': options1,
        'level2': options2,
        'level3': options3
    };
    
    var picked = [];
    picked = map[clickedLevel].slice();
    
    shuffle(picked);
    
    document.getElementById('World1Question').innerHTML = "What is " + firstNumber + " + " + secondNumber + "?";
    var text = "<ul>";
    for (i = 0; i < picked.length; i++) {
        if(picked[i] === answer) {
            text += "<button onclick='victoryScreen()' style='height:50px;width:100px'>" + picked[i] + "</button>"; // rett svar knapp
        }
        else{
            text += "<button onclick='sadnessScreen()' style='height:50px;width:100px'>" + picked[i] + "</button>"; // feil svar knapp
        }
    }
    document.getElementById('answers').innerHTML = text;
}

//Lets user know they were correct, and unlocks next button. 
//if button 1 is completed twice, it does not unlock button 3
//saves levels completed in an array
function victoryScreen() {
    if(document.getElementById('level2').disabled && completedLevel.indexOf(currentLevel) === -1) {

        document.getElementById('level2').disabled = false;
        completedLevel.push("currentLevel");

        
    } else if(document.getElementById('level3').disabled && completedLevel.indexOf(currentLevel) === -1 && currentLevel === "level2") {
        
        document.getElementById('level3').disabled = false;
        completedLevel.push("currentLevel");
        
    } else if(completedLevel.indexOf(currentLevel) === -1 && currentLevel === "level3") {
        
        completedLevel.push("currentLevel");
        
    }

    //unlock final button if 3 stages are complete, seperated so we can add more effects to it later
    if(completedLevel.length === 3) {
        
        document.getElementById('levelFinal').disabled = false;
        
    }

    document.getElementById('answers').innerHTML = "CORRECT!";
    
    
}

//lets user know they pressed wrong
function sadnessScreen(){
    
    document.getElementById('answers').innerHTML = "WRONG!";
    
}

  


//få random nummer 
//@param opp til nummer upToo
//@return random nummer
function randomNumber(upToo) {
    var randNumb = Math.floor(Math.random()*upToo);
    return randNumb;
}

// When the user clicks the math button, open the math modal
//@param levelClicked saves the level/button number, so completing level 1 twice dont unlock level 3
function mathOne(clickedLevel) {
    currentLevel = clickedLevel;
    
    GetMath(clickedLevel);
    document.getElementById('MathModal').style.display = "block";
    document.getElementById('MathQuestion').style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function exitModal() {
    document.getElementById('MathModal').style.display = "none";
    document.getElementById('MathQuestion').style.display = "none";
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
