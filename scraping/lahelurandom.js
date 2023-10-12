const puppeteer = require("puppeteer");

async function lahelu() {
  const url = "https://lahelu.com/shuffle";
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  try {
    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    const result = await page.evaluate(() => {
      const data = {
        judul:
          document.querySelector("article > header > h1")?.textContent ||
          "No title found",
        link: document.querySelector(
          "div.PostItem_mediaWrapper__As_jS > div > video"
        )
          ? document
              .querySelector("div.PostItem_mediaWrapper__As_jS > div > video")
              .getAttribute("src")
          : document.querySelector(
              "div.PostItem_mediaWrapper__As_jS > div > img"
            )
          ? document
              .querySelector("div.PostItem_mediaWrapper__As_jS > div > img")
              .getAttribute("src")
          : null,
      };
      return data;
    });

    console.log(result);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await page.close();
    await browser.close();
  }
}

lahelu();
