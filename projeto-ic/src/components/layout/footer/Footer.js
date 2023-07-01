import React from 'react';
import styles from './Footer.module.css'
import LoginGoogle from '../../form/LoginGoogle';
import { Link } from 'react-router-dom';

function Footer({ frase, rota }) {
    return (
        <div className={styles.formField}>
            <center>
                <div className={styles.line}></div>
                <span className={styles.text}>ou</span>
                <div className={styles.line}></div>
                <br/><br/>
                <LoginGoogle />
                <br/>
                <Link to={rota}><a className={styles.link} href={rota}>{frase}</a></Link>
            </center>
        </div>
    )
}

export default Footer;
