import React from 'react';
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import styles from './Menu.module.css';
import logo from '../../img/logo.png'

function Menu() {
    return (
        <nav className={styles.menu}>
            <dev className={styles.logo}>
                <img src={logo} style={{ width: "8em" }}></img>
            </dev>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to="/iniciar-sistema-recomendacoes">SISTEMA DE RECOMENDAÇÃO</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/">PERFIL</Link>
                </li>
                <li className={styles.item}>
                    <Link to="/">SAIR</Link>
                </li>
            </ul>
        </nav>
    )
}
export default Menu;
