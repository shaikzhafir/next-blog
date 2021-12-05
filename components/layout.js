
import styles from '../styles/layout.module.css'

//children is to wrap whatever is placed inside this component
const Layout = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}


export default Layout