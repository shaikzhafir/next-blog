import { compact } from "lodash";
import {
  getPosts,
  getPost,
  getPostContent,
  getPostById,
} from "util/notionConnection";
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
          <h3>The Bolg</h3>
        </a>
      </Link>
      <Link href="../coding">
        <a>
          Back to coding blogs <Twemoji emoji="🧏🏾‍♂️" />
        </a>
      </Link>
      {props.postContent.map((block) => {
        return <NotionBlock slug={props.slug} block={block} />;
      })}
    </Layout>
  );
};

export async function getStaticPaths() {
  const postsData = await fetch(`${server}/api/getPosts`);
  const posts = await postsData.json();

  //this is done for seo sake so path can be a nice url lol
  const postSlugs = compact(
    posts.results.map((post) => {
      if (
        post.properties &&
        post.properties.slug &&
        post.properties.slug.rich_text
      ) {
        return `/coding/${post.properties.slug.rich_text[0]?.plain_text}`;
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
  const apiposts = await fetch(`${server}/api/getPosts`);
  const posts = await apiposts.json();
  //find actual actual blog page from the slug, which is the params
  const matchedPost = posts.results.find((post) => {
    if (post && post.properties && post.properties.slug) {
      return post.properties.slug.rich_text?.[0].plain_text === slug;
    }
  });
  const url = `${server}/api/posts/${matchedPost.id}`;
  console.log(url);
  const response = await fetch(url);
  const postContent = await response.json();
  //onsole.log(JSON.stringify(postContent, null, 4));
  //console.log(JSON.stringify(newPostData, null, 4));
  /* console.log(postData);
  console.log(postContent); */
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
