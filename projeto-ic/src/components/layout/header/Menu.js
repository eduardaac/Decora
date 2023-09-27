import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';

import styles from './Header.module.css';

function Menu({ userId, typeUser }) {
  return (
    <nav className={styles.menu}>
      <div className={styles.logo}>
        <img src={logo} alt='' style={{ width: '8em' }} />
      </div>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to={`/user-profile/${userId}`} className={styles.link}>
            PERFIL
          </Link>
        </li>
        {typeUser === 'professor' && (
          <li className={styles.item}>
            <Link to={`/report-view/${userId}`} className={styles.link}>
              RELATÓRIO
            </Link>
          </li>
        )}
        <li className={styles.item}>
          <Link to="/login" className={styles.link}>
            SAIR
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
