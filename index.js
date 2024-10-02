const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://www.globo.com";

async function main() {
  const response = await axios(URL);
  const html = response.data;

  const $ = cheerio.load(html);

  const posts = [];

  $(".post-row.with-6-posts .post").each(function () {
    const url = $(this).find(".post__link").attr("href");
    const title = $(this).find(".post__title").text();
    posts.push({ url, title });
  });

  console.log({ posts });
}

main();
