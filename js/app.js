
const cards = document.querySelectorAll('.memory-cards');

function flipCard() {
  this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));

