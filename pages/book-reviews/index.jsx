import Layout from "components/layout";
import { getPosts, filterTag } from "util/notionConnection";
import Link from "next/link";
import styles from "../../styles/Post.module.css";
import Twemoji from "util/Twemoji";

const Notion = ({ posts }) => {
  return (
    <Layout>
      <Link href="/">
        <a>
          <h3>The Bolg</h3>
        </a>
      </Link>
      <h1>
        Here are my book reviews <Twemoji emoji="📜" />
      </h1>
      <ul className={styles.list}>
        {posts.results
          .filter((post) => filterTag(post, "book reviews"))
          .map((post) => (
            <div className={styles.notionList}>
              <li key={post.id}>
                <Link
                  href={`book-reviews/${post.properties.slug.rich_text[0]?.plain_text}`}
                >
                  <a>
                    <h3>{post.properties.name.title[0]?.text.content}</h3>
                  </a>
                </Link>
                <p>{post.properties.subtitle.rich_text[0]?.plain_text}</p>
                <small>{post.properties.published.date?.start}</small>
              </li>
            </div>
          ))}
      </ul>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  res.setHeader("Cache-Control", "s-maxage=86400");
  const posts = await getPosts();
  //console.log(JSON.stringify(posts, null, 4));
  return { props: { posts } };
}

export default Notion;
