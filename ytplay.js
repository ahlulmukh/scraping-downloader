const { default: axios } = require("axios");
const cheerio = require("cheerio");

function ytPlay(text) {
  return new Promise((resolve, reject) => {
    let configd = {
      k_query: text,
      k_page: "mp3",
      q_auto: 1,
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
        let v = data.vitems;
        var v2 = v[Math.floor(Math.random() * v.length)].v;
        let url = "https://www.youtube.com/watch?v=" + v2;
        let config = {
          url: "https://www.youtube.be/" + url,
          q_auto: 0,
          ajax: 1,
        };
        axios("https://www.y2mate.com/mates/en68/analyze/ajax", {
          method: "POST",
          data: new URLSearchParams(Object.entries(config)),
          headers: headerss,
        }).then(({ data }) => {
          const $ = cheerio.load(data.result);
          let img = $("div.thumbnail.cover > a > img").attr("src");
          let title = $("div.thumbnail.cover > div > b").text();
          let size = $(
            "#mp4 > table > tbody > tr:nth-child(3) > td:nth-child(2)"
          ).text();
          let size_mp3 = $(
            "#audio > table > tbody > tr:nth-child(1) > td:nth-child(2)"
          ).text();
          let id = /var k__id = "(.*?)"/.exec(data.result)[1];
          let idElement = $('input[data-extractor="youtube"]');
          let vid = idElement.attr("data-id");
          let configs = {
            type: "youtube",
            _id: id,
            v_id: vid,
            ajax: "1",
            token: "",
            ftype: "mp4",
            fquality: 480,
          };
          axios("https://www.y2mate.com/mates/en68/convert", {
            method: "POST",
            data: new URLSearchParams(Object.entries(configs)),
            headers: headerss,
          }).then(({ data }) => {
            const $ = cheerio.load(data.result);
            let link = $("div > a").attr("href");
            let configss = {
              type: "youtube",
              _id: id,
              v_id: vid,
              ajax: "1",
              token: "",
              ftype: "mp3",
              fquality: 128,
            };
            axios("https://www.y2mate.com/mates/en68/convert", {
              method: "POST",
              data: new URLSearchParams(Object.entries(configss)),
              headers: headerss,
            }).then(({ data }) => {
              const $ = cheerio.load(data.result);
              let audio = $("div > a").attr("href");
              resolve({
                id: vid,
                url: url,
                title: title,
                thumb: img,
                size_mp3: size_mp3,
                link: audio,
              });
            });
          });
        });
      })
      .catch(reject);
  });
}

ytPlay("abadi speedup")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
