import React from 'react';
import styles from './index.module.css'
import Menu from '../../layout/cabecalho/Menu';
import Sistema from '../../form/Sistema';
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

function SistRecProfessor() {
    return (
        <dev className={styles.page}>
            <Menu />
            <dev className={styles.container}>
                <dev className={styles.containerForm}>
                    <Link to='/' className={styles.icons}><FaEdit /></Link>
                    <h1>SISTEMA DE RECOMENDAÇÃO</h1>
                    <Sistema />
                </dev>
            </dev>
        </dev >
    )
}
export default SistRecProfessor; 