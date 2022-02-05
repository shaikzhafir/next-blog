import Layout from "components/layout";
import { getPosts, filterTag } from "util/notionConnection";
import Link from "next/link";
import styles from "../../styles/Post.module.css";
import Twemoji from "util/Twemoji";
import { useState } from "react";
import { POSTS_PER_PAGE } from "util/constants";
import PaginationComponent from "components/pagination";

const Notion = ({ posts }) => {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const handlePageClick = (e, page) => {
    setPage(page);
    setOffset((page - 1) * POSTS_PER_PAGE);
  };
  return (
    <Layout>
      <Link href="/">
        <a>
          <h3>The Bolg</h3>
        </a>
      </Link>
      <h1>
        Here are my coding related posts <Twemoji emoji="💻" />
      </h1>
      <ul className={styles.list}>
        {posts.slice(offset, offset + POSTS_PER_PAGE).map((post) => (
          <div className={styles.notionList}>
            <li key={post.id}>
              <Link
                href={`coding/${post.properties.slug.rich_text[0]?.plain_text}`}
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
      <PaginationComponent
        count={Math.ceil(posts.length / POSTS_PER_PAGE)}
        handlePageClick={handlePageClick}
        page={page}
      />
    </Layout>
  );
};

export async function getStaticProps() {
  let allPosts = await getPosts();
  let posts = allPosts.results.filter((post) => filterTag(post, "engineering"));
  //console.log(JSON.stringify(posts, null, 4));
  return { props: { posts }, revalidate: 60 };
}

export default Notion;
