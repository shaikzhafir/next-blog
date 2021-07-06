import { getSortedMarkdownData } from '../../util/markdownConverter'
import Layout from '../../components/layout'
import Link from 'next/link'
import Article from '../../components/article'
import Head from 'next/head'
import styles from '../../styles/Post.module.css'
import Twemoji from '../../util/Twemoji'



export async function getStaticProps(){
    const markDownData = getSortedMarkdownData('reviews')
    return {
        props : { markDownData }
    }
}


const ReviewHome = ({markDownData}) => {
    return (
        
        <Layout>
            <Head>
           
            </Head>
            <Link href="/">
                <a><h3>The Bolg</h3></a>
            </Link>
            <h1>Here are my book reviews <Twemoji emoji="📜"/>
            </h1>
            <ul className={styles.list}>
            {markDownData.map(({id,date,title,slug}) => (
                <li key={id}>
                    <Article 
                    postType="reviews"
                    id = {id}
                    title = {title}
                    slug = {slug}
                    date = {date}
                    />
                </li>
            ))}
            </ul>
        </Layout>
    )
}


export default ReviewHome