// Most Javascript was imitated from  https://github.com/afratetlay/memory_game/blob/master/index.html
(() => {
  "use strict";

  let click1 = {},
    click2 = {},
    level = "medium",
    pairs = 8,
    gameStarted,
    matches,
    moves,
    timer;
   

  class Card {
    constructor(card, num) {
      let cardID = card.id + "-" + num;
      this.id = "#" + card.id + "-" + num;
      this.image = num == 1 ? card.image1 : card.image2;
      this.name = card.name;
      this.html = `<div class="card" id="${cardID}">
        <div class="card-back">
          <img src="assets/imgs/${this.image}" class="card-image" >
        </div>
        <div class="card-front">
          <img src="assets/imgs/cardflag.jpg" class="card-image" >
         </div>
      </div>`;
    }
  }

  const setLevel = level => {
    $("#startModal").hide();
    pairs = gameLevels[level].pairs;
    $("#game-board").removeClass("easy medium hard");
    $("#game-board").addClass(gameLevels[level].class);
  };

  // set size of card array based on level
  const trimArray = array => {
    let newArray = array.slice();
    // trim array as needed
    while (newArray.length > pairs) {
      let randomIndex = Math.floor(Math.random() * newArray.length);
      newArray.splice(randomIndex, 1);
    }
    return newArray;
  };

  const makeCardArray = (data, level) => {
    let array = [];

    // Get the correct sized array for level
    let trimmedData = trimArray(data, level);

    // Add two of each card to the array
    trimmedData.forEach(function(card) {
      array.push(new Card(card, 1));
      array.push(new Card(card, 2));
    });

    return array;
  };

  const shuffle = array => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      // Choose an element randomly
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Switch current element and random element
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const displayCards = cardArray => {
    cardArray.forEach(function(card) {
      // Add cards to game board
      $("#game-board").append(card.html);

      // Add click listeners
      $(card.id).click(function() {
        // Start timer on first click
        if (!gameStarted) {
          // start timer
          gameTimer();
          gameStarted = true;
        }

        // Check for match when clicked
        checkMatch(card);
      });
    });
  };

  const checkMatch = card => {
    if (!click1.name) {
      click1 = card;
      $(card.id).addClass("flipped");
      return;

      // For second card, check if its a different card
    } else if (!click2.name && click1.id !== card.id) {
      click2 = card;
      $(card.id).addClass("flipped");

      // Update move count
      moves++;
      $("#moves").text(moves);

      checkStars();
    } else return;

    if (click1.name === click2.name) {
      foundMatch();
    } else {
      hideCards();
    }
  };

  const foundMatch = () => {
    matches++;
    if (matches === pairs) {
      gameOver();
    }

    // Unbind click functions and reset click objects
    $(click1.id).unbind("click");
    $(click2.id).unbind("click");
    // reset click objects
    click1 = {};
    click2 = {};
  };

  const hideCards = () => {
    //Hide cards
    setTimeout(function() {
      $(click1.id).removeClass("flipped");
      $(click2.id).removeClass("flipped");
      // Reset click objects
      click1 = {};
      click2 = {};
    }, 600);
  };

  const gameOver = () => {
    clearInterval(timer);

    // Pause before show modal
    setTimeout(function() {
      $("#winModal").show();
    }, 500);
  };


  const gameTimer = () => {
    let startTime = new Date().getTime();

    // Update the timer every second
    timer = setInterval(function() {
      var now = new Date().getTime();

      // Find the time elapsed between now and start
      var elapsed = now - startTime;

      // Calculate minutes and seconds
      let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

      // Add starting 0 if seconds < 10
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      let currentTime = minutes + ":" + seconds;

      // Update clock on game screen and modal
      $(".clock").text(currentTime);
    }, 750);
  };


  // Open start modal on load
  $(window).on("load", function() {
    $("#startModal").show();
  });

  $("#openModal").click(function() {
    $("#winModal").show();
  });

  // Close modals when click outside modal
  $("#winModal #close-win, #overlay").click(function() {
    $("#winModal").hide();
  });

  $("#startModal #close-start, #overlay").click(function() {
    $("#startModal").hide();
  });

  $(".modal").click(function() {
    $(".modal").hide();
  });

  $(".modal-content").click(function(event) {
    event.stopPropagation();
  });

  // Level modals
  $("#easy-level").click(function() {
    startGame(cardData, "easy");
  });

  $("#medium-level").click(function() {
    startGame(cardData, "medium");
  });

  $("#hard-level").click(function() {
    startGame(cardData, "hard");
  });

  // Restart game
  $("#restart").click(function() {
    $("#winModal").hide();
    $("#startModal").show();
  });

  const startGame = (cards, level) => {
    // reset game variables
    gameStarted = false;
    moves = 0;
    matches = 0;
    setLevel(level);

    // reset HTML
    $("#game-board").empty();

    $(".clock").text("0:00");
    $("#moves").text("0");
    $("#winModal").hide();

    // Get cards and start the game!
    let cardArray = makeCardArray(cardData, level);

    shuffle(cardArray);
    displayCards(cardArray);
  };
})();