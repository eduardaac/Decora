import React from 'react';
import styles from './index.module.css'
import Menu from '../../layout/cabecalho/Menu';
import Sistema from '../../form/Sistema';
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

function SistRecProfessor() {
    console.log("SistRecProfessor renderizado");
    return (
        <div className={styles.page}>
            <Menu />
            <div className={styles.container}>
                <div className={styles.containerForm}>
                    <Link to='/edition' className={styles.icons}><FaEdit /></Link>
                    <h1>SISTEMA DE RECOMENDAÇÃO</h1>
                    <Sistema/>
                </div>
            </div>
        </div>
    )
}

export default SistRecProfessor;
