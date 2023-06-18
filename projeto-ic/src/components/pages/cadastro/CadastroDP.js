import React from 'react';
import styles from '../index.module.css';
import CadastroS from '../../form/CadastroS';
import Top from '../../layout/cabecalho/Top';
import logo from '../../img/logo.png'

function CadastroDP() {
  return (
    <dev className={styles.container}>
      <dev className={styles.loginAside}>
        <img src={logo} alt='' style={{ height: '55%', width: '90%' }}></img>
        <h1>Um sistema de recomendações de <span className={styles.cor}>dec
        </span>isões de pr<span className={styles.cor}>o</span>jeto arquitetu<span className= {styles.cor}>ra</span>l</h1>
      </dev>
      <dev className={styles.containerForm}>
        <Top
          rota="/Cadastro1"
          title="DADOS PESSOAIS" />
        <CadastroS />
      </dev>
    </dev>
  )
}
export default CadastroDP;