import Layout from "../../components/layout";
import Link from 'next/link'
import {
  getAllMarkdownIds,
  getMarkdownData,
} from "../../util/markdownConverter";

export default function Post({ postData }) {
  return (
    <Layout>
      <div>
        <h1>{postData.title}</h1>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
        <p>{postData.slug}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
      </div>

    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllMarkdownIds("pages/reviews");

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getMarkdownData(params.id, "pages/reviews");

  //by doing this, props will be passwed to the layout somehow
  return {
    props: {
      postData,
    },
  };
  // Fetch necessary data for the blog post using params.id
}
