const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function lahelu() {
  const url = "https://lahelu.com/";
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("video");
  const videoUrl = await page.evaluate(() => {
    const videoElement = document.querySelector("video");
    return videoElement ? videoElement.src : null;
  });
  const content = await page.content();
  const $ = cheerio.load(content);
  const postElements = $(".PostItem_wrapper__Y0x_H");
  const randomIndex = Math.floor(Math.random() * postElements.length);
  const randomPostElement = postElements[randomIndex];
  const title = $(randomPostElement).find(".Typography_overflow__R5BlX").text();
  console.log(title);
  console.log(videoUrl);
  await browser.close();
}

lahelu();
