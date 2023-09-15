import React from 'react';
import styles from './Footer.module.css';
import LoginGoogle from '../../form/LoginGoogle';
import { Link } from 'react-router-dom';

function Footer({ frase, rota }) {
  return (
    <div className={styles.formField}>
      <div className={styles.horizontalLine}></div>
      <span className={styles.text}>ou</span>
      <div className={styles.horizontalLine}></div>
      <br />
      <br />
      <br />
      <Link to={rota}>
        <a className={styles.link} href={rota}>
          {frase}
        </a>
      </Link>
    </div>
  );
}

export default Footer;
