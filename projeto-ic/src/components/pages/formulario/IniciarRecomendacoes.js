import React from 'react';
import styles from './IniciarRecomendacoes.module.css'
import Menu from '../../layout/cabecalho/Menu';
import { Link } from 'react-router-dom';
import engrenagem from '../../img/engrenagem.png'

function IniciarRecomendacoes() {
    return (
        <dev className={styles.page}>
            <Menu />
            <dev className={styles.container}>
                <dev className={styles.containerForm}>
                    <h1>SISTEMA DE RECOMENDAÇÃO</h1>
                    <p>Olá, neste painel vamos sugerir um conjunto de alternativas arquitetônicas para o seu projeto.
                        Responda as seguintes perguntas, ao final daremos nossa sugestão.</p>
                    <center><img src={engrenagem} style={{ width: "15em" }}></img></center>
                    <dev className="formGroup">
                        <Link to="/sistema-recomendacoes-a"><button>INICIAR</button></Link>
                    </dev>
                </dev>
            </dev>
        </dev >
    )
}
export default IniciarRecomendacoes; 