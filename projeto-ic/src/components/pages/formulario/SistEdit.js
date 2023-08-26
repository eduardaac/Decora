import React from 'react';
import styles from './index.module.css'
import Menu from '../../layout/cabecalho/Menu';
import Edition from '../../formEdition/Edition';

function SistEdit() {
    return (
        <div className={styles.page}>
            <Menu />
            <div className={styles.container}>
                <div className={styles.containerForm}>
                    <h1>SISTEMA DE RECOMENDAÇÃO</h1>
                    <Edition/>
                </div>
            </div>
        </div >
    )
}
export default SistEdit; 