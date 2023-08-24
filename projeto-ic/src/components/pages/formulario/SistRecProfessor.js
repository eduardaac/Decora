import React from 'react';
import styles from './index.module.css'
import Menu from '../../layout/cabecalho/Menu';
import Sistema from '../../form/Sistema';
import { FaEdit } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

function SistRecProfessor() {
    const location = useLocation();
    const perguntas = location.state?.perguntas || {}; // Defina um valor padrão ou lógica de tratamento

    return (
        <div className={styles.page}>
            <Menu />
            <div className={styles.container}>
                <div className={styles.containerForm}>
                    <Link to='/edition' className={styles.icons}><FaEdit /></Link>
                    <h1>SISTEMA DE RECOMENDAÇÃO</h1>
                    <Sistema codigoTurma={perguntas.codigoTurma} />
                </div>
            </div>
        </div>
    )
}

export default SistRecProfessor;
