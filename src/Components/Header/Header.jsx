import styles from './Header.module.css';
import Button from "../UI/Button";

function Header() {   
    return (
        <div className={styles.header}>
            <div className={styles.logo}></div>
            <div className={styles.nav}>
                <a className={styles.navHome} href="#">Home</a>
                <a className={styles.navAbout} href="#">About</a>
                <a className={styles.navContact} href="#">Contact</a>
            </div>
        </div>
    );
}

export default Header;
