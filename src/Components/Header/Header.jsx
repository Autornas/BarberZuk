import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={styles.header}>
      {/* Hamburger Menu Button */}
      <button className={styles.menuButton} onClick={toggleMenu}>
        ☰
      </button>

      {/* BarberZuk - Centered */}
      <div className={styles.navHomeContainer}>
        <Link className={styles.navHome} to="/web">BarberZuk</Link>
      </div>

      {/* Navigation Links - Pop under the hamburger menu */}
      {isMenuOpen && (
        <div className={styles.navLinks}>
          <Link className={styles.navAbout} to="/about">About</Link>
          <Link className={styles.navContact} to="/contact">Contact</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
