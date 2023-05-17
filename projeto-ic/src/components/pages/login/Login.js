import React from 'react';
import styles from '../index.module.css';
import LoginP from '../../form/LoginP';
import Footer from '../../layout/footer/Footer';
import logo from '../../img/logo.png'

function Login() {
  return (
    <dev className={styles.container}>
      <dev className={styles.loginAside}>
        <img src={logo} style={{ height: "300px", width: '100%' }}></img>
        <h1>Um sistema de recomendações de DECisões de prOjeto arquitetuRAl</h1>
      </dev>
      <dev className={styles.containerForm}>
        <h1>LOGIN</h1>
        <LoginP />
        <Footer
          frase="Não possui cadastro? Cadastra-se"
          rota="/Cadastro1"
        />
      </dev>
    </dev>
  )
}
export default Login;