const { default: axios } = require("axios");
const cheerio = require("cheerio");

function instagram(url) {
  return new Promise((resolve, reject) => {
    let config = {
      url: url,
      lang_code: "en",
      token: "",
    };

    let headerss = {
      "sec-ch-ua":
        '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      Cookie:
        'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}',
    };
    axios("https://fastdl.app/c/", {
      method: "POST",
      data: new URLSearchParams(Object.entries(config)),
      headers: headerss,
    })
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const downloadLinks = [];

        // Iterate over all anchor elements with an href attribute
        $("a[href]").each((index, element) => {
          const hrefValue = $(element).attr("href");
          downloadLinks.push(hrefValue);
        });

        resolve(downloadLinks);
      })
      .catch(({ error }) => {
        reject(error);
      });
  });
}

instagram(
  "https://www.instagram.com/reel/CwOMK_ohU85/?utm_source=ig_web_copy_link"
)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
