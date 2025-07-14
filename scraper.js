const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function getSetIds(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const setIds = [];
    $('.searchFormBox .filterListItems a').each((i, element) => {
      const setId = $(element).attr('data-val');
      const name = $(element).text();
      const nameKey = name.replace('[', '').replace(']', '').replaceAll(' ', '_').toLowerCase();
      if (dataVal) {
        setIds.push({
          name: name,
          nameKey: nameKey,
          webPackageId: setId
        });
      }
    });
    console.log(setIds);
    const data = {
      setIds: setIds
    };
    return data;

  } catch (error) {
    console.error(`Error during request or scraping: ${error.message}`);
    return null;
  }
}

async function getSetData(url, setIds) {
  setData = {}
  setIds.forEach((item) => {
    try {
      const formData = new FormData();
      formData.append('package', item.webPackageId);
      
      const response = await axios.post(url, formData, {
          // You can explicitly set headers if needed, but for FormData,
          // axios often handles Content-Type correctly.
          // headers: formData.getHeaders() // Use this if you need to access boundary etc.
      });
      const $ = cheerio.load(response.data);
      cards = []
      $('.cardInner .cardItem a').each((i, element) => {
        cards.push(element.children('img').attr('alt');
      });

      setData[item.nameKey] = cards;
    } catch (error) {
      console.error(`Error during request or scraping: ${error.message}`);
      return null;
    }
  });
  return setData;
}

(async () => {
  const url = "https://www.gundam-gcg.com/en/cards/index.php";
  const setIds = await getSetIds(url);

  if (setIds) {
    const setData = await getSetData(url, setIds);
    const outputDir = "scraped-data";
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const [key, cards] of Object.entries(setData)) {
      console.log(`${key}: ${cards}`);
      const outputFilePath = path.join(outputDir, `${key}.json`);
      
      fs.writeFileSync(outputFilePath, JSON.stringify(cards, null, 2), 'utf-8');
      console.log(`Data successfully written to ${outputFilePath}`);
    }
    

  } else {
    console.log("Failed to scrape data.");
  }
})();
