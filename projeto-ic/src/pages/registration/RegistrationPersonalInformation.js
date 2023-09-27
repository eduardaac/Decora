import React from 'react';
import Footer from '../../components/layout/footer/Footer';
import logo from '../../components/img/logo.png';
import FormRegistrationPersonalInformation from '../../components/form/registration/FormRegistrationPersonalInformation'

import styles from '../login/Pages.module.css';

function RegistrationPersonalInformation() {
  return (
    <div className={styles.container}>
      <div className={styles.loginAside}>
        <img src={logo} alt='' style={{ height: "55%", width: '90%' }}></img>
        <h1>Um sistema de recomendações de <span className={styles.cor}>dec
        </span>isões de pr<span className={styles.cor}>o</span>jeto arquitetu<span className={styles.cor}>ra</span>l</h1>
      </div>
      <div className={styles.form}>
        <h1>CADASTRO</h1>
        <FormRegistrationPersonalInformation />
        <Footer
          frase="Já possui cadastro? Entre"
          rota="/login"
        />
      </div>
    </div>
  )
}
export default RegistrationPersonalInformation;