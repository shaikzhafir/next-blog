import { getSortedMarkdownData } from '../../util/markdownConverter'
import Layout from '../../components/layout'
import Link from 'next/link'
import styles from '../../styles/Post.module.css'

export async function getStaticProps(){
    const markDownData = getSortedMarkdownData('pages/posts')
    return {
        props : { markDownData }
    }
}
const PostHome = ({markDownData}) => {
    return (
        <Layout>
            <h1>Here are my blog posts
            </h1>
            <ul className={styles.list}>
            {markDownData.map(({id,date,title}) => (
                <li key={id} >
                <div>
                    <Link href={`/posts/${id}`}>
                    <a>
                    <span className={styles.link}>
                    {title},</span>{date}
                    </a>
                    
                    </Link>
                </div>
                </li>
            ))}
            </ul>
        </Layout>
    )
}


export default PostHome