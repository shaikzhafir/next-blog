import { getSortedMarkdownData } from "../../util/markdownConverter";
import Layout from "../../components/layout";
import Link from "next/link";
import Article from "../../components/article";
import styles from "../../styles/Post.module.css";
import Twemoji from "../../util/Twemoji";
import PaginationComponent from "components/pagination";
import { POSTS_PER_PAGE } from "util/constants";
import { useState } from "react";

export async function getStaticProps() {
  const markDownData = getSortedMarkdownData("reviews");
  return {
    props: { markDownData },
  };
}

const ReviewHome = ({ markDownData }) => {
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
        Here are my book reviews <Twemoji emoji="📜" />
      </h1>
      <ul className={styles.list}>
        {markDownData
          .slice(offset, offset + POSTS_PER_PAGE)
          .map(({ id, date, title, slug }) => (
            <li key={id}>
              <Article
                postType="reviews"
                id={id}
                title={title}
                slug={slug}
                date={date}
              />
            </li>
          ))}
      </ul>
      <PaginationComponent
        count={Math.ceil(markDownData.length / POSTS_PER_PAGE)}
        handlePageClick={handlePageClick}
        page={page}
      />
    </Layout>
  );
};

export default ReviewHome;
