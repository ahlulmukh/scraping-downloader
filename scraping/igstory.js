const { default: axios } = require("axios");

async function igstory(username) {
  try {
    const data = await axios.get(
      "https://insta-stories-viewer.com/" + username
    );
    const userIdRegex = /var USER_ID = (\d+);/;
    const match = data.data.match(userIdRegex);
    const userId = parseInt(match[1]);
    console.log(userId);
    const hasil = await axios.get(
      "https://igs.sf-converter.com/api/stories/" + userId
    );
    const result = [];
    hasil.data.result.forEach((item, index) => {
      const imageUrl =
        item.image_versions2 &&
        item.image_versions2.candidates &&
        item.image_versions2.candidates.length > 0
          ? item.image_versions2.candidates[0].url
          : null;

      const videoUrl =
        item.video_versions && item.video_versions.length > 0
          ? item.video_versions[0].url
          : null;

      result.push(imageUrl);
      if (videoUrl) {
        result.push(videoUrl);
      }
    });

    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
}

igstory("coachjustinl");
