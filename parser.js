const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

(() => {
  const scrapedDir = 'scraped-data';
  const setIdsFile = path.join(__dirname, scrapedDir, 'set_ids.json');
  const templatePath = path.join(__dirname, 'test.html');
  
  try {
    const template = fs.readFileSync(templatePath, 'utf8');
    const $ = cheerio.load(template);
    const cardList = $('.cardInner');
    
    cardList.empty();
    
    const data = fs.readFileSync(setIdsFile, 'utf8');
    const jsonData = JSON.parse(data);
    
    for (set of jsonData) {
      setFile = path.join(__dirname, scrapedDir, `${set.nameKey}.json`)
      const setData = fs.readFileSync(setFile, 'utf8');
      const setJsonData = JSON.parse(setData);

      for (card of setJsonData) {
        const listItem = $('<li>');
        const a = $('<a>');
        const img = $('<img>')
          .attr('alt', card.name)
          .attr('src', card.imgUrl);

        a.addClass('cardStr')
          .append(img)

        const $details = cheerio.load(card.data);
        
        const button = $('<button>');
        button.addClass('details-button-close');

        $details('.cardDetailPageCol').append(button);
        $details('.btnCol').empty();
        $details('cardImage').attr('src', card.imgUrl);
        
        listItem.addClass('cardItem')
          .append(a)
          .append($details.html());
        cardList.append(listItem).append('\n');
      }
      
      const newHtml = $.html();
      fs.writeFileSync(templatePath, newHtml, 'utf8');
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('File not found at:', filePath);
    } else if (err instanceof SyntaxError) {
      console.error('Error parsing JSON (invalid JSON format):', err.message);
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
})();
