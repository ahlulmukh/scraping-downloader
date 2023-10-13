const { chromium } = require("playwright");

async function lahelu() {
  const url = "https://lahelu.com/shuffle";
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(2000);

    const result = await page.evaluate(() => {
      const titleElement = document.querySelector("article header h1");
      const title = titleElement ? titleElement.textContent : "No title found";

      const mediaElement = document.querySelector(
        "div.PostItem_mediaWrapper__As_jS video, div.PostItem_mediaWrapper__As_jS img"
      );
      const link = mediaElement ? mediaElement.getAttribute("src") : null;

      return { judul: title, link };
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
