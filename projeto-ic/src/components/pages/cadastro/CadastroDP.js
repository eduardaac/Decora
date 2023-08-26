import React from 'react';
import styles from '../index.module.css';
import Top from '../../layout/cabecalho/Top';
import logo from '../../img/logo.png'
import Cadastro2 from '../../form/Cadastro2';

function CadastroDP() {
  return (
    <div className={styles.container}>
      <div className={styles.loginAside}>
        <img src={logo} alt='' style={{ height: '55%', width: '90%' }}></img>
        <h1>Um sistema de recomendações de <span className={styles.cor}>dec
        </span>isões de pr<span className={styles.cor}>o</span>jeto arquitetu<span className= {styles.cor}>ra</span>l</h1>
      </div>
      <div className={styles.containerForm}>
        <Top
          rota="/Cadastro1"
          title="DADOS PESSOAIS" />
        <Cadastro2 />
      </div>
    </div>
  )
}
export default CadastroDP;