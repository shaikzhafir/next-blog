const { Client } = require("@notionhq/client");

export const getPosts = async (preview) => {
  const notionClient = new Client({ auth: process.env.NOTION_KEY });
  const databaseId = process.env.NOTION_DATABASE_ID;
  const query = {
    database_id: databaseId,
    sorts: [
      {
        property: "published",
        direction: "descending",
      },
    ],
  };

  if (!preview) {
    query.filter = {
      property: "active",
      checkbox: {
        equals: true,
      },
    };
  }

  try {
    return await notionClient.databases.query(query);
  } catch (error) {
    console.error(error.body);
    return {};
  }
};

export const getFilteredPosts = async (posts, tagToFilter) => {
  const filteredPosts = posts.filter((post) => filterTag(post, tagToFilter));
  return filteredPosts;
};

export const getPost = async (id) => {
  try {
    const notionClient = new Client({ auth: process.env.NOTION_KEY });
    return await notionClient.pages.retrieve({ page_id: id });
  } catch (error) {
    console.error(error.body);
    return {};
  }
};

export const getPostContent = async (id) => {
  const notionClient = new Client({ auth: process.env.NOTION_KEY });
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

export function filterTag(post, tag) {
  return post.properties.tags.multi_select[0]?.name === tag;
}
