import React from 'react';
import styles from '../index.module.css';
import Menu from '../../layout/cabecalho/Menu';
import SistemaEdition from '../../form/SistemaEdition';
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

function SistEdit() {
    return (
        <div className={styles.page}>
            <Menu />
            <div className={styles.container}>
                <div className={styles.form}>
                    <Link to="/sistema-recomendacoes-p" className={styles.icons}><BsArrowLeftSquareFill /></Link>
                    <h1>SISTEMA DE RECOMENDAÇÃO</h1>
                    <SistemaEdition />
                </div>
            </div>
        </div >
    )
}
export default SistEdit; 