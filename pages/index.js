import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import Twemoji from "../util/Twemoji";
import Book from "components/book";
import { getPost } from "util/notionConnection";
import cloudinary from "cloudinary";

export default function Home({ author, title, percentage, imageUrl }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>The bolg</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          priority
          src="/images/limmy.jpg"
          height={144}
          width={144}
          className={utilStyles.borderCircle}
        />
        <br></br>
        <br></br>
        <a
          href="https://github.com/shaikzhafir"
          className={utilStyles.githubLink}
        >
          <Image priority src="/github.svg" height={30} width={30} />
        </a>
        <h1 className="font-bold text-center">
          Welcome to the Bolg <Twemoji emoji="😀" />
        </h1>
        <h3 className="my-5">
          Now <b>notion</b> powered
        </h3>

        <br />
        <br />

        <div className={styles.flexContainer}>
          <Book
            bookTitle={title}
            bookAuthor={author}
            readPercentage={parseInt(percentage)}
            imageUrl={imageUrl}
          />
          <div className={styles.tabs}>
            <Link href="/book-reviews">
              <a className={styles.card}>
                <h2>Book Reviews &rarr;</h2>
                <p>
                  Read my book <Twemoji emoji="📖" /> reviews
                </p>
              </a>
            </Link>
            <Link href="/coding">
              <a className={styles.card}>
                <h2>Blog &rarr;</h2>
                <p>
                  Learn about useless <Twemoji emoji="🧏🏾‍♂️" /> things!
                </p>
              </a>
            </Link>
          </div>
        </div>
      </main>

      {/* <footer className={styles.footer}>
       
          <p>Were you expecting a normal copyright thing here? well this blog aint normal</p>
          
        
      </footer> */}
    </div>
  );
}

export async function getStaticProps() {
  let page = await getPost(process.env.NOTION_READING_PAGE_ID);
  let author = page.properties.subtitle.rich_text[0]?.plain_text;
  let title = page.properties.slug.rich_text[0]?.plain_text;
  let percentage = page.properties.percentage.rich_text[0]?.plain_text;
  let notionImageId = page.properties.image_id.rich_text[0]?.plain_text;
  let notionImageUrl = page.properties.image.files[0]?.file.url;

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  //initiase variables here to access outside of trycatch
  let getImage;
  let uploadImage;
  let image;

  // check if image exists in cloudinary
  // if exist use that image
  // else upload the notion image to cloudinary and use the response for the imageurl
  try {
    getImage = await cloudinary.v2.search
      .expression(`public_id:${notionImageId}`)
      .execute();
  } catch (error) {
    console.log(error);
  }
  // if image exists in cloudinary, assign as image

  if (getImage?.resources[0]?.url) {
    image = getImage.resources[0].url;
  }
  // else upload the image to cloudinary and use the response for the imageurl
  else {
    try {
      uploadImage = await cloudinary.v2.uploader.upload(
        notionImageUrl,
        { public_id: notionImageId },
        function (error, result) {
          return result;
        }
      );
      if (uploadImage) {
        image = uploadImage.url;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // if both getImage and uploadImage are undefined, then use the default image
  let imageUrl = image ? image : "/images/book.png";
  return {
    props: {
      author,
      title,
      percentage,
      imageUrl,
    },
    revalidate: 60,
  };
}
