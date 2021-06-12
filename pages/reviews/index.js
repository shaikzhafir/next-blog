import { getSortedMarkdownData } from '../../util/markdownConverter'
import Layout from '../../components/layout'
import Link from 'next/link'
import styles from '../../styles/Post.module.css'



export async function getStaticProps(){
    const markDownData = getSortedMarkdownData('reviews')
    return {
        props : { markDownData }
    }
}


const ReviewHome = ({markDownData}) => {
    return (
        <Layout>
            <h1>Here are my book reviews
            </h1>
            <ul className={styles.list}>
            {markDownData.map(({id,date,title}) => (
                <li key={id}>
                <div>
                    <Link href={`reviews/${id}`}>
                    <a>
                    {title}, {date}
                    </a>
                    </Link>
                </div>
                </li>
            ))}
            </ul>
        </Layout>
    )
}


export default ReviewHome