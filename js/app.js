/*
 * Create a list that holds all of your cards
 */

const cards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 
'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 
'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let myCards = shuffle(cards);

let opened = [];

let idArray = [];

let moveCount = 0;

let timeCount = 0;

//add cards dynamically
for(let i = 0; i < myCards.length; i++){
    $(".deck").append('<li class="card"><i class="' + myCards[i] + '" id="' + i +'"></i></li>');
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//restart button
$(".restart").click(function() {
    reset();
});

//reset the game
function reset() {
    location.reload();
    opened = [];
    idArray = [];
    moveCount = 0;
    timeCount = 0;
}

//display a card and update socres
function init () {
    $(".card").click(function() {
        let card = $(this).children().attr("id");
        $(this).addClass("open show");
        moveCount++;
        if(opened.length % 2 === 0){
            addCard(card);
        } else {
            checkForMatch(card);
        }

        changeMoves();

        changeRating();

        if(moveCount === 1){
            changeTimer();
        }

        popup();
    });
 }


//add a card to opened array
function addCard(theCard) {
    let clsName = document.getElementById(theCard).className;
    opened.push(clsName);
    idArray.push(theCard);
    console.log(idArray);
}


 //check if two cards match
 function checkForMatch (theCard) {
    let cName = document.getElementById(theCard).className;
    let match = document.getElementsByClassName(cName);
    if(opened.includes(cName) && !idArray.includes(theCard)){
        opened.push(cName);
        idArray.push(theCard);
       $(match).parent().addClass("card match");
    } else {
        let lastElement = document.getElementsByClassName(opened[opened.length - 1]);
        setTimeout(function() {
            $(match).parent().removeClass().addClass("card");
            $(lastElement).parent().removeClass().addClass("card");
        }, 500);
        opened.pop();
        idArray.pop();
    }
    
 }

//update the moves
function changeMoves() {
    if(moveCount % 2 === 0){
      $(".moves").text(function() {
        return moveCount / 2;
        });
    }
}


//update the star rating
function changeRating() {
    if(moveCount / 2 === 12){
       $('.stars li:first-child').remove();
    } else if(moveCount / 2 === 20){
        $('.stars li:nth-child(2)').remove();
    }
}


//update the timer
function changeTimer() {
    setInterval(function() {
      $(".timer").text(function() {
        timeCount++;
        return timeCount;
       });
    }, 1000);
}

//popup if win
function popup() {
    if(idArray.length === 16){
        let numOfStars = document.getElementsByClassName('deck').length;
        let winTime = timeCount;
        $('#stop').removeClass();
        $("#stop").text(function() {
            return winTime;
        });
        setTimeout(function() {
            if(window.confirm("Congratulations!\nYour moves: " + (moveCount / 2).toString() + ",\n" + "Your time: " + winTime.toString() + " seconds,\n" + "Your star rating: " + numOfStars.toString() + ",\n" + "Do you want to play it agian?")){
             reset();
            }
        }, 100);  
    }
}

$(document).ready(function() {
    init();
 });


