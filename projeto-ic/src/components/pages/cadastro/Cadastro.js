import React from 'react';
import styles from '../index.module.css';
import CadastroP from '../../form/CadastroP';
import Footer from '../../layout/footer/Footer';
import logo from '../../img/logo.png'

function Cadastro() {
  return (
    <dev className={styles.container}>
      <dev className={styles.loginAside}>
        <img src={logo} style={{ height: "55%", width: '90%' }}></img>
        <h1>Um sistema de recomendações de <span className={styles.cor}>dec
        </span>isões de pr<span className={styles.cor}>o</span>jeto arquitetu<span className={styles.cor}>ra</span>l</h1>
      </dev>
      <dev className={styles.containerForm}>
        <h1>CADASTRO</h1>
        <CadastroP />

        <Footer
          frase="Já possui cadastro? Entre"
          rota="/"
        />

      </dev>
    </dev>
  )
}
export default Cadastro;