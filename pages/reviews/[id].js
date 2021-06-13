import Layout from "../../components/layout";
import Link from 'next/link'
import Twemoji from '../../util/Twemoji'
import {
  getAllMarkdownIds,
  getMarkdownData,
} from "../../util/markdownConverter";

export default function Post({ postData }) {
  return (
    <Layout>
      <Link href="/">
                <a><h3>The Bolg</h3></a>
            </Link>
            <Link href="../reviews">
                <a>Back to reviews <Twemoji emoji="📖"/></a>
            </Link>
      <div>
        <h1>{postData.title}</h1>
        <p>{postData.slug}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
      </div>

    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllMarkdownIds("reviews");

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getMarkdownData(params.id, "reviews");

  //by doing this, props will be passwed to the layout somehow
  return {
    props: {
      postData,
    },
  };
  // Fetch necessary data for the blog post using params.id
}
