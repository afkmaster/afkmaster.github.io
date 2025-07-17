document.addEventListener('DOMContentLoaded', function() {
  $('.cardInner a.cardStr').on('click', function() {
    const body = document.querySelector('html');
    const cardDetails = this.parentElement.querySelector('.cardDetailPageCol');
    const bg = this.parentElement.querySelector('.detailBg');
    
    body.classList.add('show-details');
    cardDetails.classList.add('active');
    bg.classList.add('active');
  });

  $('.cardInner .detailBg').on('click', function() {
    const body = document.querySelector('html');
    const cardDetails = this.parentElement.querySelector('.cardDetailPageCol');
    
    body.classList.remove('show-details');
    cardDetails.classList.remove('active');
    this.classList.remove('active');
  });
});
