import { compact } from "lodash";
import { getPosts, getPost, getPostContent } from "util/notionConnection";
import Layout from "../../components/layout";
import Link from "next/link";
import Twemoji from "../../util/Twemoji";
import { CopyBlock, dracula, monokai } from "react-code-blocks";

const Post = (props) => {
  return (
    <Layout>
      <Link href="/">
        <a>
          <h3>The Bolg</h3>
        </a>
      </Link>
      <Link href="../notion">
        <a>
          Back to notion blogs <Twemoji emoji="🧏🏾‍♂️" />
        </a>
      </Link>
      <h1>{props.slug}</h1>
      {props.postContent.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={block.id}>
                {block.paragraph.text.map((text) => {
                  return text.text.content;
                })}
              </p>
            );
            break;
          case "code":
            return (
              <CopyBlock
                language="javascript"
                key={block.id}
                theme={monokai}
                text={block.code.text[0].text.content}
              />
            );
          default:
            break;
        }
      })}
    </Layout>
  );
};

export async function getStaticPaths() {
  const posts = await getPosts();
  const postSlugs = compact(
    posts.results.map((post) => {
      if (
        post.properties &&
        post.properties.slug &&
        post.properties.slug.rich_text
      ) {
        return `/notion/${post.properties.slug.rich_text[0].plain_text}`;
      }
    })
  );
  return {
    paths: postSlugs,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const slug = params.id;
  const posts = await getPosts();

  //get the id of the actual blog page from the slug
  const matchedPost = posts.results.find((post) => {
    if (post && post.properties && post.properties.slug) {
      return post.properties.slug.rich_text?.[0].plain_text === slug;
    }
  });

  const [postData, postContent] = await Promise.all([
    getPost(matchedPost.id),
    getPostContent(matchedPost.id),
  ]);
  console.log(JSON.stringify(postData, null, 4));
  console.log(JSON.stringify(postContent, null, 4));
  /* console.log(postData);
  console.log(postContent); */
  return {
    props: {
      postId: matchedPost.id,
      postData,
      postContent,
      slug: slug,
    },
    revalidate: 60,
  };
}

export default Post;
