import React from 'react';
import Navigation from '../../components/layout/header/Navigation'
import logo from '../../components/img/logo.png';
import FormRegistrationAccessInformation from '../../components/form/registration/FormRegistrationAccessInformation'

import styles from '../login/Pages.module.css';

function RegistrationAccessInformation() {
  return (
    <div className={styles.container}>
      <div className={styles.loginAside}>
        <img src={logo} alt='' style={{ height: '55%', width: '90%' }}></img>
        <h1>Um sistema de recomendações de <span className={styles.cor}>dec
        </span>isões de pr<span className={styles.cor}>o</span>jeto arquitetu<span className={styles.cor}>ra</span>l</h1>
      </div>
      <div className={styles.form}>
        <Navigation
          rota="/registration-personal-information"
          title="DADOS PESSOAIS" />
        <FormRegistrationAccessInformation />
      </div>
    </div>
  )
}
export default RegistrationAccessInformation;