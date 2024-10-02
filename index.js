const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();
const URL = "https://www.globo.com";
const PORT = 3030;

app.get("/posts", async (req, res) => {
  try {
    const posts = await scrapePosts();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

/**
 * Fetches and parses the latest news posts from Globo.com,
 * printing the scraped data to the console.
 *
 * @throws {Error} If there's a problem fetching or parsing the data.
 */
async function scrapePosts() {
  try {
    const response = await axios(URL);
    const html = response.data;

    const $ = cheerio.load(html);

    const posts = [];

    $(".post-row.with-6-posts .post").each(function () {
      const url = $(this).find(".post__link").attr("href");
      const title = $(this).find(".post__title").text().trim(); // Trim leading/trailing whitespace

      if (url && title) {
        // Check for valid data before pushing
        posts.push({ url, title });
      }
    });

    return posts;
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

scrapePosts();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
