import Link from "next/link"
import styles from "../styles/Article.module.css"


const Article = (props) => {
    return (
        <div>
            <Link href={`${props.postType}/${props.id}`}>
                <a>
                    <h3 className={styles.header}>{props.title}</h3>
                </a>
            </Link>
            <small>
                {props.date}
            </small>
            <p>{props.slug}</p>
        </div>
    )
}


export default Article