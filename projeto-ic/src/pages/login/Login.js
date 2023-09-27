import React from 'react';
import FormLogin from  '../../components/form/login/FormLogin';
import Footer from '../../components/layout/footer/Footer';
import logo from '../../components/img/logo.png';

import styles from './Pages.module.css';

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.loginAside}>
        <img src={logo} alt=' ' style={{ height: "55%", width: '90%' }}></img>
        <h1>Um sistema de recomendações de <span className={styles.cor}>dec
        </span>isões de pr<span className={styles.cor}>o</span>jeto arquitetu<span className={styles.cor}>ra</span>l</h1>
      </div>
      <div className={styles.form}>
        <h1>LOGIN</h1>
        <FormLogin />
        <Footer
          frase="Não possui cadastro? Cadastra-se"
          rota="/registration-personal-information"
        />
      </div>
    </div>
  )
}
export default Login;