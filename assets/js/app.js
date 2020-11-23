
//function inputName(input_name) {
	//name = input_name;
//}

//function index(member) 
//{
	//for (var i = 0; i <16; i++) 
	//{
	//	if(listy[i]==member)
		//	return i;
	//}
//}

//pop up box for players name//

document.getElementById('button').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "flex";
});

document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none";
});



/*

const cards = document.querySelectorAll('.memory-cards');
//Imitated from freecodecamp.org Memory Game in Vanilla JavaScript//
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
    console.log(card.style.order);
  });
})();

	


cards.forEach(card => card.addEventListener('click', flipCard));



//Copied from youtube video Build your own COUNTDOWN TIMER in 15 lines of JavaScript code, Ania Kubów #JavaScriptGames//
document.addEventListener('DOMContentLoaded', () => {

const timeLeftDisplay = document.querySelector('#time-left')
const startBtn = document.querySelector('#start-button')
let timeLeft = 60

function countDown(){
    setInterval(function() {

if(timeLeft <=0 ) {
    clearInterval(timeLeft = 0)
}

        timeLeftDisplay.innerHTML = timeLeft 
        timeLeft -=1
    }, 1000)
}


startBtn.addEventListener('click', countDown)

})
*/




















let matchedCards     = [],
    currentOpenedCards = [],
    moves            = 0,
    rateHTML = "",
    rateStep = 6,
    firstClick = true,
    minutes, seconds,
    totalTime = 0,
    incrementer;

const iconsList          = ["shop", "shop", "coffee", "coffee", "i went", "i went", "to the", "to the", "to", "to", "buy", "buy"],
      cardsList          = document.querySelector(".memory-cards"),
      cards              = cardsList.children,
      movesContainer     = document.querySelector(".score"),
      modal              = document.querySelector(".modal"),
      repeatBtnFromModal = document.querySelector(".modal .play-again"),
      exactMoves         = iconsList.length / 2,
      secondsContainer = document.querySelector("#seconds"),
      minutesContainer = document.querySelector("#minutes"),

/*
 * Shuffle
 */
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

/*
 * Init Game
 */
function init() {
    // Shuffle the current `iconsList`
    const icons = shuffle(iconsList);
    // Using `createDocumentFragment` for a better performance, but you can `appendChild` to the parent directly!
    const cardsFragment = document.createDocumentFragment();
    
    /*
     *
     * 1) Create the cards based on the given length of `icons` array
     * 2) Put a random icon in each card
     * 3) Append the created cards to the container `cardsList`
     *
     */
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.innerHTML = "<i class='" + icons[i] + "'></i>";
        cardsFragment.appendChild(card);
    }
    cardsList.appendChild(cardsFragment);
}

/*
 * Start Game
 */
function start() {
    
    // Initialize Game
    init();

    // Start the 'Click' Functionality
    cardClick();
}

/* 
 * Click
 */
function cardClick() {
    for (let i = 0; i < cards.length; i++) {
        
        // Add a "click" event to each card [ The following function will only be executed if a card was clicked! ]
        cards[i].addEventListener("click", function () {

            // Cache the `current` and `previous` clicked cards
            const currentCard = this; // current card
            const previousCard = currentOpenedCards[0]; // the previous one
            
            // The First Click? Start the timer!
            if(firstClick) {
                startTimer();
                firstClick = false; // This will prevent the timer to start again if the user clicked on another card
            }

            /*
             *
             * If we have ONE card inside our `currentOpenedCards`
             * Do the following:
             *
             * 1) Make sure that the user didn't click on the same card twice
             * 2) Compare the `current` clicked card with the exisiting one on our `currentOpenedCards` array
             * 3) Delete both cards from our `currentOpenedCards`
             * 4) Add a move
             * 5) Change the rating
             *
             */
            if (currentOpenedCards.length === 1) {

                /* 
                 *
                 * show: Allows you to see the icon
                 * disabled: To avoid clicking on the same card again!
                 * animated & flipInY: Both of the are `animate.css` classes for a nicer animation effect
                 *
                 */ 
                currentCard.className = "show disabled animated flipInY";

                // Add this card to the `currentOpenedCards` array
                currentOpenedCards.push(currentCard);

                // Compare the `current` card with the `previous` card (the first one in `currentOpenedCards` array) 
                isMatched(currentCard, previousCard);

                /*
                 *
                 * Empty `currentOpenedCards`
                 *
                 * The `currentOpenedCards` array MUST be empty
                 * Next time the user click on a card, that card would become the first index,
                 * Then, when click on another one, both of them will be compared,
                 * If they are MATCHED or NOT, that doesn't matter here.
                 * We have to reset the `currentOpenedCards` array, to start filling it again with 2 new clicked cards!
                 *
                 */
                currentOpenedCards = [];

                // Add a move
                addMove();

                // Change the rating
                rating();

            } else {
                
                /*
                 *
                 * If we don't have any card inside our `currentOpenedCards` array
                 * Do the following:
                 *
                 * 1) Add the follwing CSS Classes: 
                 *    - show: To see the icon inside your card
                 *    - disabled: To avoid clicking on the same card again!
                 *    - animated & flipInY: Both of the are `animate.css` classes for a nicer animation effect
                 * 2) Add this card to the `currentOpenedCards` array
                 * 
                 */
                currentCard.className = "show disabled animated flipInY";
                currentOpenedCards.push(currentCard);
            }
        });
    }
}

// Compare the 2 opened cards
function isMatched(currentCard, previousCard) {
    
    /* 
     * Matched?
     * Do the following:
     * 
     * 1) Change them to success state:
     *    - Keep displaying the icon
     *    - Animate
     *    - Disable them (cannot be clickable anymore)
     * 2) Add both cards to `matchedCards` array
     * 3) Check if the game is over or not
     *
     */
    if (currentCard.innerHTML === previousCard.innerHTML) {

        // Change them to success state
        currentCard.className = "show matched animated bounceOutDown disabled";
        previousCard.className = "show matched animated bounceOutDown disabled";

        // Add Current & Previous card to `matchedCards` array
        matchedCards.push(currentCard, previousCard);

        // Game Over?
        isOver();

    } else {
        
        /*
         * Not Matched?
         * Do the following:
         *
         * 1) Back both cards to the normal state:
         *    - Hide the icon
         *    - Animate
         *
         */
        setTimeout(function () {
            // Use `className` to replace existing classes with the given ones
            currentCard.className = "animated jello";
            previousCard.className = "animated jello";
        }, 500)

    }
}


/*
 * Add a move
 */
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;
}


/*
 * Game Over?
 */
function isOver() {
    // Check if the `matchedCards` length equals to the `iconsList` array
    if (iconsList.length === matchedCards.length) {
        // If it is over, display a popup message!
        gameOverMessage();
    }
}

/* 
 * Game Over Message
 */
function gameOverMessage() {

    // Display the modal
    modal.style.top = "0";

    // Add moves to the Modal
    const totalMoves = document.querySelector("#total_moves");
    totalMoves.innerHTML = moves + 1; // [bug]: `moves` returns the count - 1

    // Add Rate
    rateContainer.innerHTML = rateHTML;

    // Stop Timer
    stopTimer();

    // Add time to the Modal
    const totalMinutes     = document.querySelector("#totalMinutes");
    const totalSeconds     = document.querySelector("#totalSeconds");
    totalMinutes.innerHTML = minutes;
    totalSeconds.innerHTML = seconds;

}



  Timer [ Start ] 
 
function startTimer() {

    // Start Incrementer
    incrementer = setInterval(function() {

        // Add totalTime by 1
        totalTime += 1;

        // Convert Total Time to H:M:S
        calculateTime(totalTime);

        // Change the current time values
        secondsContainer.innerHTML = seconds;
        minutesContainer.innerHTML = minutes;
        hoursContainer.innerHTML   = hours;

    }, 1000);

    
}

/*
 * Timer [ Calculate Time ] 
 */
function calculateTime(totalTime) {
    hours   = Math.floor( totalTime / 60 / 60);
    minutes = Math.floor( (totalTime / 60) % 60);
    seconds = totalTime % 60;
}

/*
 * Timer [ Stop ] 
 */
function stopTimer() {
    // Stop Timer
    clearInterval(incrementer);
}


/*
 * Reset Current Values
 */
function resetValues() {
    matchedCards = [];
    currentOpenedCards = [];
    moves = 0;
    movesContainer.innerHTML = "--";
    stars[1].style.color = "#ffb400";
    stars[2].style.color = "#ffb400";
    rateHTML = "";
    hoursContainer.innerHTML = "00";
    minutesContainer.innerHTML = "00";
    secondsContainer.innerHTML = "00";
    stopTimer();
    firstClick = true;
    totalTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
}
