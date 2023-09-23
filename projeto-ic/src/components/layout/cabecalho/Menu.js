import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.css';
import logo from '../../img/logo.png';

function Menu({ userId, typeUser }) {
  return (
    <nav className={styles.menu}>
      <div className={styles.logo}>
        <img src={logo} alt='' style={{ width: '8em' }} />
      </div>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to={`/perfil/${userId}`} className={styles.link}>
            PERFIL
          </Link>
        </li>
        {typeUser === 'professor' && (
          <li className={styles.item}>
            <Link to={`/exibir-relatorio/${userId}`} className={styles.link}>
              RELATÓRIO
            </Link>
          </li>
        )}
        <li className={styles.item}>
          <Link to="/" className={styles.link}>
            SAIR
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
