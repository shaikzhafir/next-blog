import { getSortedMarkdownData } from '../../util/markdownConverter'
import Layout from '../../components/layout'
import Link from 'next/link'
import Article from '../../components/article'
import styles from '../../styles/Post.module.css'
import Twemoji from '../../util/Twemoji'

export function getStaticProps(){
    const markDownData = getSortedMarkdownData('posts')
    return {
        props : { markDownData }
    }
}
const PostHome = ({markDownData}) => {
    return (
        <Layout>
            <Link href="/">
                <a><h3>The Bolg</h3></a>
            </Link>
            <h1>Here are my blog posts <Twemoji emoji="📝"/>
            </h1>
            <ul className={styles.list}>
            {markDownData.map(({id,date,title,slug}) => (
                <li key={id} >
                 <Article 
                    postType="posts"
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


export default PostHome