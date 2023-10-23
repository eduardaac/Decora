import React from 'react';
import logo from '../../components/img/logo.png';
import FormRegistrationProfessionalProfile from '../../components/form/registration/FormRegistrationProfessionalProfile'
import Navigation from '../../components/layout/header/Navigation';

import styles from '../login/Pages.module.css';

function RegistrationProfessionalProfile() {
  return (
    <div className={styles.container}>
      <div className={styles.loginAside}>
        <img src={logo} alt='' style={{ height: '55%', width: '90%' }}></img>
        <h1>Um sistema de apoio ao ensino de <span className={styles.cor}>dec
        </span>isões de pr<span className={styles.cor}>o</span>jeto arquitetu<span className={styles.cor}>ra</span>l</h1>
      </div>
      <div className={styles.form}>
        <Navigation
          rota="/registration-access-information"
          title="DADOS PESSOAIS"
        />
        <FormRegistrationProfessionalProfile />
      </div>
    </div>
  )
}
export default RegistrationProfessionalProfile;