var numbers = [13, 1, 5, 3, 9, 4, 8, 1, 2, 4, 9, 5, 3, 8, 2, 6, 7, 6, 10, 14, 12, 14, 11, 10, 12, 11, 13, 7];
var letters = ["M", "A", "E", "C", "I", "D", "H", "A", "B", "D", "I", "E", "C", "H", "B", "F", "G", "F", "J", "N", "L", "N", "K", "J", "L", "K", "M", "G"];
var values; //values to be on cards
var game, endScreen, cards, exit; //declaring DOMs
game = document.getElementsByClassName("game")[0];
endScreen = document.getElementsByClassName("congrats")[0];
cards = document.getElementsByClassName("card");
exit = document.getElementsByClassName("exit")[0];
for (var i = 0; i < 28; i++) {
    cards[i].setAttribute("disabled", "disabled");
}
function choose(content) { 'use strict';//selecting values type
    switch (content) {
    case 'numbers':
        values = numbers;
        break;
    case 'letters':
        values = letters;
        break;
    }
    document.getElementsByClassName("intro")[0].style.display = "none";
    for (var i = 0; i < 28; i++) {  //to view values on cards
        cards[i].style.borderRadius="0";
        cards[i].innerHTML = values[i];
        cards[i].setAttribute("disabled","disabled"); //disabling button to avoid clicking it when values are shown because that will make player win and game ends even before the game starts
    }
    setTimeout(hideValues,5000);
}

function hideValues () { //to be called when start button is clicked
    for (var i = 0; i < 28; i++) {
        cards[i].innerHTML = "&#63;"; //hiding values
        cards[i].removeAttribute("disabled"); //enabling buttons after the the values are hidden to start playing
    }
    exit.style.display = "block";
}
function changeStyle(j){ //function to be called in setTimeOut function
    cards[j].innerHTML="&#63;"; //removing border radius 
    cards[j].style.borderRadius="0"; //hiding value 
    cards[j].removeAttribute("disabled"); //enabling buttons when they are hidden
}
var firstValue = 0, secondValue = 0; //firstvalue & secondValue to check values on cards whither it's identical or not 
function check(index) { 'use strict';
    cards[index].innerHTML = values[index];
    cards[index].style.borderRadius="20px";
    cards[index].setAttribute("disabled","disabled"); //disabling shown cards to prevent them from using function again
    if (firstValue !== 0) { //storing value
        secondValue = values[index];
    } else {
        firstValue = values[index];
    }
    if (firstValue !== secondValue && firstValue !== 0 && secondValue !== 0) { //checking if the two values are not equal
        for (var i = 0; i < 28; i++) { //in case of non-equality hiding cards
            if (cards[i].innerHTML == firstValue) {
                firstValue = 0;
                setTimeout(changeStyle, 1000, i);
            } 
            if (cards[i].innerHTML == secondValue) {
                secondValue = 0;
                setTimeout(changeStyle, 1000, i);
            }
        }
    } else if (firstValue === secondValue) { //in case of identical cards reseting storing variables
        firstValue = 0;
        secondValue = 0;
    }
    showEndScreen(); //function that checks if game is over or not and if yes it shows end screen
    }
function showEndScreen() {
    var endgame=0;
    for (var i = 0; i < 28; i++) {
        if (cards[i].innerHTML == values[i]) {
            endgame++;
        }
    }
    if (endgame === 28) {
        game.style.display = "none";
        endScreen.style.display = "block";
    }
}
function reset () {
    for (var i = 0; i < 28; i++) {
        changeStyle(i);
        cards[i].innerHTML = "";
        cards[i].setAttribute("disabled", "disabled");
    }
    game.style.display = "block";
    endScreen.style.display = "none";
    exit.style.display = "none";
    document.getElementsByClassName("intro")[0].style.display = "block";
}