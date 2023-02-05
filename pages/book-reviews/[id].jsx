import { compact } from "lodash";
import { getPosts, getPostContent } from "util/notionConnection";
import Layout from "../../components/layout";
import Link from "next/link";
import Twemoji from "../../util/Twemoji";
import NotionBlock from "components/notion/NotionBlock";
import { server } from "util/server";

const Post = (props) => {
  return (
    <Layout>
      <Link href="/">
        <a>
          <p className="text-lg font-bold">The Bolg</p>
        </a>
      </Link>
      <Link href="../book-reviews">
        <a>
          <p className="mb-5">
            Back to book reviews <Twemoji emoji="🧏🏾‍♂️" />
          </p>
        </a>
      </Link>
      {props.postContent.map((block) => {
        return <NotionBlock slug={props.slug} block={block} />;
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
        return `/book-reviews/${post.properties.slug.rich_text?.[0]?.plain_text}`;
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
  const postContent = await getPostContent(matchedPost.id);
  return {
    props: {
      postId: matchedPost.id,
      postContent,
      slug: slug,
    },
    revalidate: 60,
  };
}

export default Post;
