const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // --- Your scraping logic here ---
    const setIds = [];
    $('.searchFormBox .filterListItems a').each((i, element) => {
      const setId = $(element).attr('data-val');
      const name = $(element).text();
      const nameKey = name.replace('[', '').replace(']', '').replaceAll(' ', '_').toLowerCase();
      if (dataVal) {
        setIds.push({
          name: name,
          nameKey: nameKey,
          setId: setId
        });
      }
    });

    const data = {
      setIds: setIds
    };
    return data;

  } catch (error) {
    console.error(`Error during request or scraping: ${error.message}`);
    return null;
  }
}

(async () => {
  // Set the target URL for the Gundam website
  const targetUrl = "https://www.gundam-gcg.com/en/cards/index.php";
  const scrapedData = await scrapeWebsite(targetUrl);

  if (scrapedData) {
    // Define the output file path
    const outputDir = "scraped-data";
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true }); // Create 'data' directory if it doesn't exist
    }
    const outputFilePath = path.join(outputDir, "gundam_card_data.json"); // Changed filename

    fs.writeFileSync(outputFilePath, JSON.stringify(scrapedData, null, 2), 'utf-8');
    console.log(`Data successfully written to ${outputFilePath}`);
  } else {
    console.log("Failed to scrape data.");
  }
})();
