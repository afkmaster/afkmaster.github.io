const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

(() => {
  const scrapedDir = 'scraped-data';
  const setIdsFile = path.join(__dirname, scrapedDir, 'set_ids.json');
  const templatePath = path.join(__dirname, 'index.html');
  
  try {
    const template = fs.readFileSync(templatePath, 'utf8');
    const $ = cheerio.load(template);
    const cardList = $('.cardInner');
    
    cardList.empty();
    
    const data = fs.readFileSync(setIdsFile, 'utf8');
    const jsonData = JSON.parse(data);

    const filterSetOptions = $('.filterListItems').empty();
    const allFilter = $('<a>').addClass('js-selectBtn-package')
      .text('ALL');

    filterSetOptions.append(allFilter);
    
    for (set of jsonData) {
      setFile = path.join(__dirname, scrapedDir, `${set.uid}.json`)
      const setData = fs.readFileSync(setFile, 'utf8');
      const setJsonData = JSON.parse(setData);

      const setFilter = $('<a>').addClass('js-selectBtn-package')
        .text(set.name);
      filterSetOptions.append(setFilter);
      
      for (card of setJsonData) {
        const listItem = $('<li>');
        const a = $('<a>');
        const img = $('<img>')
          .attr('alt', card.name)
          .attr('src', card.imgUrl);

        a.addClass('cardStr')
          .append(img)

        const detailsContainer = $('<div>').addClass('details-container');
        const detailsInner = $('<div>').addClass('details-inner');
        
        const $details = cheerio.load(card.data);
        
        const button = $('<button>')
          .addClass('details-button')
          .addClass('details-button--close');

        //$details('.cardDetailPageCol').append(button);
        $details('.btnCol').empty();
        $details('.cardImage img').attr('src', card.imgUrl);

        const navigation = $('<div>')
          .addClass('details-navigation');

        const navButtonLeft = $('<button>')
          .addClass('details-button')
          .addClass('details-button--arrow-left')
          .attr('title', 'Previous');

        const navButtonRight = $('<button>')
          .addClass('details-button')
          .addClass('details-button--arrow-right')
          .attr('title', 'Next');

        const navButtonClose = $('<button>')
          .addClass('details-button')
          .addClass('details-button--close')
          .attr('title', 'Close');

        navigation.append(navButtonLeft)
          .append(navButtonRight)
          .append(navButtonClose);
        
        const bg = $('<div>').addClass('detailBg');
        
        detailsInner.append($details.html());
        detailsContainer.append(navigation)
          .append(detailsInner)
          .append(bg);
        
        listItem.addClass('cardItem')
          .append(a)
          .append(detailsContainer);
        cardList.append(listItem).append('\n');
      }
    }

    const filterList = $('.filterList').empty();
    filterList.append(filterSetOptions);
      
    const newHtml = $.html();
    fs.writeFileSync(templatePath, newHtml, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('File not found at:', err);
    } else if (err instanceof SyntaxError) {
      console.error('Error parsing JSON (invalid JSON format):', err.message);
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
})();
