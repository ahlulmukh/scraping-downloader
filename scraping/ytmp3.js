const { default: axios } = require("axios");
const cheerio = require("cheerio");

function ytMP3(url) {
  return new Promise((resolve, reject) => {
    let configd = {
      k_query: url,
      k_page: "Youtube Downloader",
      hl: "en",
      q_auto: 0,
    };
    let headerss = {
      "sec-ch-ua":
        '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      Cookie:
        'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}',
    };
    axios("https://www.y2mate.com/mates/analyzeV2/ajax", {
      method: "POST",
      data: new URLSearchParams(Object.entries(configd)),
      headers: headerss,
    })
      .then(({ data }) => {
        let url = "https://www.youtube.com/watch?v=" + data.vid;
        let configimg = {
          url: "https://www.youtube.be/" + url,
          q_auto: 0,
          ajax: 1,
        };
        let configdl = {
          vid: data.vid,
          k: data.links.mp3.mp3128.k,
        };
        let size = data.links.mp3.mp3128.size;
        axios("https://www.y2mate.com/mates/en68/analyze/ajax", {
          method: "POST",
          data: new URLSearchParams(Object.entries(configimg)),
          headers: headerss,
        }).then(({ data }) => {
          const $ = cheerio.load(data.result);
          let img = $("div.thumbnail.cover > a > img").attr("src");
          axios("https://www.y2mate.com/mates/convertV2/index", {
            method: "POST",
            data: new URLSearchParams(Object.entries(configdl)),
            headers: headerss,
          }).then(({ data }) => {
            resolve({
              status: 200,
              title: data.title,
              ftype: data.ftype,
              quality: data.fquality,
              thumb: img,
              size_mp3: size,
              link: data.dlink,
            });
          });
        });
      })
      .catch(reject);
  });
}

ytMP3("https://youtu.be/j_MlBCb9-m8?si=g6KsGM6cHNotU-rH")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
