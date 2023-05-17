import React from 'react';
import styles from '../index.module.css';
import Top from '../../layout/cabecalho/Top';
import LoginS from '../../form/LoginS';
import logo from '../../img/logo.png';


function LoginComplementar() {

  return (
    <dev className={styles.container}>
      <dev className={styles.loginAside} >
        <img src={logo} style={{ height: "300px", width: '100%' }}></img>
        <h1>Um sistema de recomendações de DECisões de prOjeto arquitetuRAl</h1>
      </dev>
      <dev className={styles.containerForm}>
        <Top
          rota='/'
          title="DADOS PESSOAIS"
        />
        <LoginS />
      </dev>
    </dev>
  )
}
export default LoginComplementar;