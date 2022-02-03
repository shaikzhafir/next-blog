import { getPostContent } from "util/notionConnection";
const { Client } = require("@notionhq/client");

export default async function (req, res) {
  const notionClient = new Client({ auth: process.env.NOTION_KEY });
  // need a way for nextjs to know API has been resolved
  // call resolve() once its completed
  return new Promise((resolve, reject) => {
    const { postId } = req.query;

    getPostContent(postId, notionClient)
      .then((content) => {
        res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
        res.status(200).json(content);
        return resolve();
      })
      .catch((error) => {
        res.status(500).json(error);
        return resolve();
      });
  });
}
