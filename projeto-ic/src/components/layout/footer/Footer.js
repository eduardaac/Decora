import React from 'react';
import styles from './Footer.module.css'
import LoginGoogle from '../../form/LoginGoogle';
import { Link } from 'react-router-dom';

function Footer({ frase, rota }) {
    return (
        <div className={styles.formField}>
            <center>
                <p>ou</p>
                <LoginGoogle />
                <br />
                <Link to={rota}><a href={rota}>{frase}</a></Link>
            </center>
        </div>

    )
}
export default Footer;