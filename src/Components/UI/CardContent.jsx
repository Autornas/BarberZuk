import React from 'react';
import styles from './Card.module.css'; 

function CardContent({ children }) {
  return <div className={styles.cardContent}>{children}</div>;
}

export default CardContent;
