
import styles from '../styles/layout.module.css'

//children is to wrap whatever is placed inside this component
const Layout = ({ children }) => {
    return (
        <div className="my-10 px-2 sm:px-10 max-w-xs sm:max-w-5xl mx-auto">
            {children}
        </div>
    )
}


export default Layout