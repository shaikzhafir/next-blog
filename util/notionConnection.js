export const getPosts = async (preview, database_id, notionClient) => {
  const query = {
    database_id: database_id,
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

/* export const getPost = async (id,notionClient) => {
  try {
    return await notionClient.pages.retrieve({ page_id: id });
  } catch (error) {
    console.error(error.body);
    return {};
  }
}; */

export const getPostContent = async (id, notionClient) => {
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
