import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import styles from "./Header.module.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className={styles.header}>
      <button className={styles.menuButton} onClick={toggleMenu}>
        ☰
      </button>

      <div className={styles.navHomeContainer}>
        <Link className={styles.navHome} to="/web">
          BarberZuk
        </Link>
      </div>

      {isMenuOpen && (
        <div className={styles.navLinks}>
          <Link className={styles.navAbout} to="/about">
            About
          </Link>
          <Link className={styles.navContact} to="/contact">
            Contact
          </Link>
          {user ? (
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link className={styles.navSignIn} to="/login">
                Sign In
              </Link>
              <Link className={styles.navRegister} to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
