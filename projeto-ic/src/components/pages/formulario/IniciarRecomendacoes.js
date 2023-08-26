import React from 'react';
import styles from './IniciarRecomendacoes.module.css'
import Menu from '../../layout/cabecalho/Menu';
import { Link } from 'react-router-dom';
import engrenagem from '../../img/engrenagem.png'

function IniciarRecomendacoes() {
    return (
        <div className={styles.page}>
            <Menu />
            <div className={styles.container}>
                <div className={styles.containerForm}>
                    <h1>SISTEMA DE RECOMENDAÇÃO</h1>
                    <p>Olá, neste painel vamos sugerir um conjunto de alternativas arquitetônicas para o seu projeto.
                        Responda as seguintes perguntas, ao final daremos nossa sugestão.</p>
                    <center><img src={engrenagem} alt='' style={{ width: "15em" }}></img></center>
                    <div className="formGroup">
                        <Link to="/sistema-recomendacoes-p"><button>INICIAR</button></Link>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default IniciarRecomendacoes; 