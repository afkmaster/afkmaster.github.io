const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

(() => {
  const fileDir = 'scraped-data';
  const setIdsFile = path.join(fileDir, 'set_ids.json');
  
  try {
    const data = fs.readFileSync(setIdsFile, 'utf8');
    const jsonData = JSON.parse(data);

    console.log(jsonData);
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
