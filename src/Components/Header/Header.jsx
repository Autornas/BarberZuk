import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}></div>
      <div className={styles.nav}>
        <Link className={styles.navHome} to="/web">Home</Link>
        <Link className={styles.navAbout} to="/about">About</Link>
        <Link className={styles.navContact} to="/contact">Contact</Link>
      </div>
    </div>
  );
}

export default Header;