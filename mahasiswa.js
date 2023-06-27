const axios = require("axios");

async function mahasiswa(text) {
  try {
    const response = await axios.get(
      "https://api-frontend.kemdikbud.go.id/hit_mhs/" + text
    );
    const data = response.data;
    console.log(data);

    const result = [];

    for (const mahasiswa of data.mahasiswa) {
      const nama = mahasiswa.text.split("(")[0].trim();
      const nim = mahasiswa.text.match(/\((.*?)\)/)[1].trim();
      const prodi = mahasiswa.text.match(/Prodi: (.*?)(?=(,|$))/)[1].trim();
      const pt = mahasiswa.text.match(/PT : (.*?)(?=(,|$))/)[1].trim();
      const website_link = mahasiswa["website-link"].split("/").pop();

      const mahasiswaObj = {
        Nama: nama,
        Nim: nim,
        Prodi: prodi,
        Kampus: pt,
        id: website_link,
      };

      result.push(mahasiswaObj);
      console.log(result);
    }
  } catch (error) {
    console.log("Terjadi kesalahan saat mengambil data mahasiswa");
  }
}

async function datamahasiswa(text) {
  try {
    const response = await axios.get(
      "https://api-frontend.kemdikbud.go.id/detail_mhs/" + text
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

mahasiswa("Reza Riski");
