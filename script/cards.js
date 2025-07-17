document.addEventListener('DOMContentLoaded', function() {
  const cardListContainer = document.querySelector('.cardInner');
  
  cardListContainer.addEventListener('click', function(event) {
    const card = event.target.closest('a.cardStr');
    
    if (card) {
      const body = document.querySelector('body');
      const cardDetails = card.nextElementSibling;
      body.classList.add('show-details');
      cardDetails.classList.add('active');
    }
  });
});
