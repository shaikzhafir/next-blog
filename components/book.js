import styles from '../styles/Book.module.css'
import Image from 'next/image'


const Book = (props) => {
    return (
        <div className={styles.container}>
            <Image
                src="/images/master-and-margarita.PNG"
                width={200}
                height={200}
                objectFit='contain'

            />
            <div>
                <table className={styles.bookInformation}>
                    <tr>
                        <th colSpan={2}>Currently Reading</th>
                    </tr>
                    <tr >
                        <td >
                            Title:
                        </td>
                        <td >
                            {props.bookTitle}
                        </td>
                    </tr>
                    <tr >
                        <td >
                            Author:
                        </td>
                        <td >
                            {props.bookAuthor}
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.tdRightPadding}>
                            Progress:
                        </td>
                        <td><div className={styles.outerBar}>
                                <div style={{color : 'black',width : `${props.readPercentage}%`,height : '24px', backgroundColor:'grey'}}></div>
                            </div></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}


export default Book