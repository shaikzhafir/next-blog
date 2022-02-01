const { Client } = require("@notionhq/client");

const notionClient = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

export const getPosts = async () => {
  try {
    return await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      sorts: [
        {
          property: "published",
          direction: "descending",
        },
      ],
    });
  } catch (error) {
    console.error(error.body);
    return {};
  }
};

export const getPost = async (id) => {
  try {
    return await notionClient.pages.retrieve({ page_id: id });
  } catch (error) {
    console.error(error.body);
    return {};
  }
};

export const getPostContent = async (id) => {
  const baseQuery = {
    block_id: id,
    page_size: 100,
  };
  let results = [];
  let postContent = await notionClient.blocks.children.list(baseQuery);
  results = [...postContent.results];
  while (postContent.has_more) {
    postContent = await notionClient.blocks.children.list({
      ...baseQuery,
      start_cursor: postContent.next_cursor,
    });
    results = [...results, ...postContent.results];
  }
  return results;
};
