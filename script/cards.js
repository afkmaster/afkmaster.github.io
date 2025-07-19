document.addEventListener('DOMContentLoaded', function() {
  $('.cardInner').on('click', function() {
    const card = event.target.closest('a.cardStr');

    if (card && event.currentTarget.contains(card)) {
      const html = document.querySelector('html');
      const parent = card.closest('cardItem');
      const detailsContainer = parent.querySelector('.details-container');
      const bg = parent.querySelector('.detailBg');
      
      html.classList.add('show-details');
      detailsContainer.classList.add('active');
      bg.classList.add('active');
    }

    const bg = event.target.closest('.detailBg');

    if (bg && event.currentTarget.contains(bg)) {
      const html = document.querySelector('html');
      const detailsContainer = bg.closest('.details-container');
    
      html.classList.remove('show-details');
      detailsContainer.classList.remove('active');
      bg.classList.remove('active');
    }
  });

  $('.details-navigation .details-button--close').on('click', function() {
    this.closest('.details-container').querySelector('.detailBg').click();
  });

  $('.details-navigation .details-button--arrow-left').on('click', function() {
    const cardItem = $(this).closest('.cardItem')[0];
    const prevSibling = cardItem.previousElementSibling;

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
