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

  $('.details-navigation .details-button--close').on('click', function() {
    $(this).closest('.details-container')[0].querySelector('.detailBg').click();
  });

  $('.details-navigation .details-button--arrow-left').on('click', function() {
    const cardItem = $(this).closest('.cardItem')[0];
    const prevSibling = cardItem.previousElementSibling;
    console.log(prevSibling);
    cardItem.querySelector('.cardInner .detailBg').click();
    if (prevSibling) {
      prevSibling.querySelector('a.cardStr').click();
    } else {
      const siblings = cardItem.parentElement.children;
      const wrapSibling = siblings[siblings.length - 1];
      wrapSibling.querySelector('a.cardStr').click();
    }
  });

  $('.details-navigation .details-button--arrow-right').on('click', function() {
    const cardItem = $(this).closest('.cardItem')[0];
    const nextSibling = cardItem.nextElementSibling;

    cardItem.querySelector('.cardInner .detailBg').click();
    if (nextSibling) {
      nextSibling.querySelector('a.cardStr').click();
    } else {
      const siblings = cardItem.parentElement.children;
      const wrapSibling = siblings[0];
      wrapSibling.querySelector('a.cardStr').click();
    }
  });
});
