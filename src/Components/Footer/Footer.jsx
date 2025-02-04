import style from './Footer.module.css';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

function Footer() {
    return (
        <div className={style.footer}>
            <p>© 2025 All rights reserved.</p>
            <div className={style.socialIcons}>
                <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={24} />
                </a>
                <a href="https://www.facebook.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <FaFacebook size={24} />
                </a>
            </div>
        </div>
    );
}