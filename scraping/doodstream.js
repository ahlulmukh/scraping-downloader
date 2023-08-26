const { default: axios } = require("axios");
const puppeteer = require("puppeteer");
const platform = require("os");
const cheerio = require("cheerio");

async function doodbypass1(url) {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox"],
  });

  // Create a new page and navigate to the target URL.
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector("body");
  const $ = cheerio.load(await page.content());
  await page.goto(url);
  console.log(await page.content());
  await page.waitForSelector("#os_player");
  const video = $("#video_player_html5_api").attr("src");
  console.log(video);

  const config = {
    url: video,
    // responseType: 'arraybuffer',
    headers: {
      referer: "https://dooood.com/",
    },
  };
  const response = await axios(config);
  console.log(response.data);
}
doodbypass1("urlink");
