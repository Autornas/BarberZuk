import style from './Footer.module.css';
import { FiInstagram, FiFacebook } from "react-icons/fi";

function Footer() {
    return (
        <div className={style.footer}>
            <p>© 2025</p>
            <div className={style.socialIcons}>
                <a href="https://www.instagram.com/lzukausk/" target="_blank" rel="noopener noreferrer">
                    <FiInstagram size={24} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100012591094983" target="_blank" rel="noopener noreferrer">
                    <FiFacebook size={24} />
                </a>
            </div>
        </div>
    );
}
    export default Footer;          