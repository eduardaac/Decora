import React from 'react';
import styles from '../index.module.css';
import LoginS from '../../form/LoginS';
import Top from '../../layout/cabecalho/Top';
import logo from '../../img/logo.png'

function CadastroaAD() {
  return (
    <dev className={styles.container}>
      <dev className={styles.loginAside}>
        <img src={logo} style={{ height: "300px", width: '100%' }}></img>
        <h1>Um sistema de recomendações de <span className={styles.cor}>dec
        </span>isões de pr<span className={styles.cor}>o</span>jeto arquitetu<span className= {styles.cor}>ra</span>l</h1>
      </dev>
      <dev className={styles.containerForm}>
        <Top
          rota="/Cadastro2"
          title="DADOS PESSOAIS"
        />
        <LoginS />
      </dev>
    </dev>
  )
}
export default CadastroaAD;