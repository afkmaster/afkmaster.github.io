document.addEventListener('DOMContentLoaded', function() {
  $('.cardInner a.cardStr').on('click', function() {
    
    const body = document.querySelector('body');
    const cardDetails = this.nextElementSibling;
    body.classList.add('show-details');
    cardDetails.classList.add('active');
  });
});
