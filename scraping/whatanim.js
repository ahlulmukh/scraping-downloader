const axios = require("axios");
const fs = require("fs");

function whatAnime(imagePath) {
  return new Promise((resolve, reject) => {
    const imageBuffer = fs.readFileSync(imagePath);
    axios
      .post("https://api.trace.moe/search?cutBorders", imageBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const imagePath = "1319350.jpeg";
whatAnime(imagePath)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Terjadi kesalahan:", error);
  });
