import React from 'react';
import styles from '../styles/Footer.module.scss';

function Footer() {
  let year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>{year} All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
