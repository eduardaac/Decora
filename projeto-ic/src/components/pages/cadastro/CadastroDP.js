import React from 'react';
import styles from '../index.module.css';
import CadastroS from '../../form/CadastroS';
import Top from '../../layout/cabecalho/Top';
import logo from '../../img/logo.png'

function CadastroDP() {
  return (
    <dev className={styles.container}>
      <dev className={styles.loginAside}>
        <img src={logo} style={{ height: "300px", width: '100%' }}></img>
        <h1>Um sistema de recomendações de DECisões de prOjeto arquitetuRAl</h1>
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