import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './HomeScreen.module.css'; 

function HomeScreen() {
  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to BarberZuk!</h1>
      <div className={styles.buttonContainer}>
        <Link to="/login">
          <button className={styles.homeButton}>Login</button>
        </Link>
        <Link to="/register">
          <button className={styles.homeButton}>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default HomeScreen;
