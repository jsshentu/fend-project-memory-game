/*
 * Create a list that holds all of your cards
 */

let cards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 
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

let winCount = 0;

//add cards dynamically
for(let i = 0; i < myCards.length; i++){
    $(".deck").append('<li class="card"><i class="' + myCards[i] + '"></i></li>');
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

 $(document).ready(function() {
    displayCard();
 });


//restart button
$(".restart").click(() => {
    location.reload();
    opened = [];
    winCount = 0;
});


//display a card
function displayCard () {
    $(".card").click(function () {
        let card = $(this).children().attr("class");
        $(this).addClass("open show");
        if(opened.length % 2 === 0){
            opened.push(card);
        } else {
            checkForMatch(card);
        }
    });
 }


 //check if two cards match
 function checkForMatch (theCard) {
    let check = document.getElementsByClassName(theCard);
    if(opened.includes(theCard)){
       $(check).parent().addClass("card match");
       winCount++;
       opened.push(theCard);
    } else {
        let lastElement = document.getElementsByClassName(opened[opened.length - 1]);
        setTimeout(function () {
            $(check).parent().removeClass().addClass("card");
            $(lastElement).parent().removeClass().addClass("card");
        }, 500);
        opened.pop();
    }
    
 }



