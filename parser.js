const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

(() => {
  const scrapedDir = 'scraped-data';
  const setIdsFile = path.join(__dirname, scrapedDir, 'set_ids.json');
  const templatePath = path.join(__dirname, 'test.html');
  
  try {
    const template = await fs.promises.readFile(templatePath, 'utf8');
    const $ = cheerio.load(template);
    const cardList = $('.cardInner');
    
    const data = fs.readFileSync(setIdsFile, 'utf8');
    const jsonData = JSON.parse(data);

    for (set of jsonData) {
      setFile = path.join(__dirname, scrapedDir, `${set.nameKey}.json`)
      const setData = fs.readFileSync(setFile, 'utf8');
      const setJsonData = JSON.parse(setData);
      
      const listItem = $('<li>');
      
      // Append the raw HTML content from cardItem.data directly into the <li>
      // Cheerio will parse this HTML snippet and append its DOM representation.
      listItem.append(setJsonData.data);
      
      // Add a class for styling if desired (e.g., to make each card item distinct)
      listItem.addClass('generated-card-item');
      
      // Append the new <li> to the <ul>
      cardList.append(listItem);
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
