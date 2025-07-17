document.addEventListener('DOMContentLoaded', function() {
  $('.cardInner a.cardStr').on('click', function() {
    const html = document.querySelector('html');
    const detailsContainer = this.parentElement.querySelector('.details-container');
    const bg = this.parentElement.querySelector('.detailBg');
    
    html.classList.add('show-details');
    detailsContainer.classList.add('active');
    bg.classList.add('active');
  });

  $('.cardInner .detailBg').on('click', function() {
    const html = document.querySelector('html');
    const detailsContainer = this.parentElement;
    
    html.classList.remove('show-details');
    detailsContainer.classList.remove('active');
    this.classList.remove('active');
  });
});
