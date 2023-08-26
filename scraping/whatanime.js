const axios = require("axios");
const fs = require("fs");

const url = "https://api.trace.moe/search?cutBorders";

// Path menuju gambar yang akan diunggah
const imagePath = "1319350.jpeg";

// Membaca gambar sebagai binary data
const imageBuffer = fs.readFileSync(imagePath);

// Mengirim permintaan POST ke API menggunakan axios
axios
  .post(url, imageBuffer, {
    headers: {
      "Content-Type": "image/jpeg", // Ganti dengan tipe konten yang sesuai
    },
  })
  .then((response) => {
    // Lakukan sesuatu dengan data yang diterima
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Terjadi kesalahan:", error);
  });
