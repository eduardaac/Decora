import React from 'react';
import styles from './index.module.css'
import Perfil from '../form/Perfil';
import Top from '../layout/cabecalho/Top';


function ExibirPerfil() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.form}>
                    <Top
                        rota="/sistema-recomendacoes-p"
                        title="PERFIL"
                    />
                    <Perfil />
                </div>
            </div>
        </div >
    )
}
export default ExibirPerfil; 