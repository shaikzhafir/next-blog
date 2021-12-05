import Layout from "../../components/layout";
import PostHeader from "components/post";
import Link from "next/link";
import Twemoji from "../../util/Twemoji";
import {
  getAllMarkdownIds,
  getMarkdownData,
} from "../../util/markdownConverter";
import "prismjs/themes/prism-okaidia.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Link href="/">
        <a>
          <h3>The Bolg</h3>
        </a>
      </Link>
      <Link href="../posts">
        <a>
          Back to posts <Twemoji emoji="🧏🏾‍♂️" />
        </a>
      </Link>
      <PostHeader postData={postData} />
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id, prebuilt so that vercel is ready to serve the url
  // the params will be passed to staticprops when visited
  const paths = getAllMarkdownIds("posts");

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getMarkdownData(params.id, "posts");

  //by doing this, props will be passwed to the layout somehow
  return {
    props: {
      postData,
    },
  };
  // Fetch necessary data for the blog post using params.id
}
