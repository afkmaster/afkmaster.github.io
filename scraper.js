const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.gundam-gcg.com/en';

async function getSetIds(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const setIds = [];
    $('.searchFormBox .filterListItems a').each((i, elem) => {
      const setId = $(elem).attr('data-val');
      const name = $(elem).text();
      const nameKey = name.replace('[', '').replace(']', '').replace("'", '').replaceAll(' ', '_').toLowerCase();
      if (setId) {
        setIds.push({
          name: name,
          nameKey: nameKey,
          webPackageId: setId
        });
      }
    });
    return setIds;

  } catch (error) {
    console.error(`Error during request or scraping: ${error.message}`);
    return [];
  }
}

async function getSetData(url, setIds) {
  setData = {}
  for (const item of setIds) {
    try {
      const formData = new FormData();
      formData.append('package', item.webPackageId);
      
      const response = await axios.post(url, formData, {
        // You can explicitly set headers if needed, but for FormData,
        // axios often handles Content-Type correctly.
        // headers: formData.getHeaders() // Use this if you need to access boundary etc.
      });
      const $ = cheerio.load(response.data);
      
      const cards = []
      for (const elem of $('.cardInner .cardItem a')) {
        const name = $(elem).children('img').attr('alt')
        const dataUrl = `${BASE_URL}/cards/${$(elem).attr('data-src')}`;
        
        const imgSrc = $(elem).children('img').attr('data-src').replace('../', '');
        const imgUrl = `${BASE_URL}/${imgSrc}`;

        const dataResponse = await axios.get(dataUrl);
        const $d = cheerio.load(dataResponse.data);
        const dataHtml = $d('.cardDetailPageCol').html();
          
        cards.push({
          name: name,
          dataUrl: dataUrl,
          imgUrl: imgUrl,
          data: dataHtml
        });
      };

      setData[item.nameKey] = cards;
    } catch (error) {
      console.error(`Error during request or scraping: ${error.message}`);
      return {};
    }
  };
  return setData;
}

(async () => {
  const url = `${BASE_URL}/cards/index.php`;
  const setIds = await getSetIds(url);

  if (setIds) {
    const setData = await getSetData(url, setIds);
    const outputDir = "scraped-data";
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const setIdsFilePath = path.join(outputDir, 'setIds.json');
    fs.writeFileSync(setIdsFilePath, JSON.stringify(setIds, null, 2), 'utf-8');
    
    for (const [key, cards] of Object.entries(setData)) {
      const outputFilePath = path.join(outputDir, `${key}.json`);
      
      fs.writeFileSync(outputFilePath, JSON.stringify(cards, null, 2), 'utf-8');
      console.log(`Data successfully written to ${outputFilePath}`);
    }
  } else {
    console.log("Failed to scrape data.");
  }
})();
