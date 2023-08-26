import React from 'react';
import styles from '../index.module.css';
import Top from '../../layout/cabecalho/Top';
import logo from '../../img/logo.png';
import Cadastro3 from '../../form/Cadastro3';


function LoginComplementar() {

  return (
    <div className={styles.container}>
      <div className={styles.loginAside} >
        <img src={logo} alt='' style={{ height: "55%", width: '90%' }}></img>
        <h1>Um sistema de recomendações de <span className={styles.cor}>dec
        </span>isões de pr<span className={styles.cor}>o</span>jeto arquitetu<span className={styles.cor}>ra</span>l</h1>
      </div>
      <div className={styles.containerForm}>
        <Top
          rota='/'
          title="DADOS PESSOAIS"
        />
        <Cadastro3 />
      </div>
    </div>
  )
}
export default LoginComplementar;