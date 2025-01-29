import React from 'react';
import styles from './Button.module.css'; 
function Button({ onClick, children, className = "" }) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
