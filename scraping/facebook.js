const { default: axios } = require("axios");
const cheerio = require("cheerio");

function facebook(url) {
  return new Promise((resolve, reject) => {
    let config = {
      url: url,
    };
    let headerss = {
      "sec-ch-ua":
        '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      Cookie:
        'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}',
    };
    axios("https://www.getfvid.com/downloader", {
      method: "POST",
      data: new URLSearchParams(Object.entries(config)),
      headers: headerss,
    })
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const title = $(".card-title a").text().trim();
        const links = {
          hd: "",
          sd: "",
          audio: "",
        };

        $(".btns-download a").each((index, element) => {
          const link = $(element).attr("href");
          const text = $(element).text(); // Ambil teks dari link untuk menentukan jenis link
          if (text.includes("HD Quality")) {
            links.hd = link;
          } else if (text.includes("Normal Quality")) {
            links.sd = link;
          } else if (text.includes("Audio Only")) {
            links.audio = link;
          }
        });

        resolve({
          status: 200,
          title: title,
          hd: links.hd,
          sd: links.sd,
          audio: links.audio,
        });
      })
      .catch(reject);
  });
}

facebook(
  "https://www.facebook.com/reel/616135183930816?mibextid=nb1MFm3jZYALyyMy"
)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
