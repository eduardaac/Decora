import React from 'react';
import styles from './index.module.css'
import Menu from '../layout/cabecalho/Menu';
import UserProfile from '../form/Perfil';

function Perfil() {
  return (
    <div className={styles.page}>
      <Menu />
      <div className={styles.container}>
        <div className={styles.containerForm}>
          <UserProfile />
        </div>
      </div>
    </div >
  )
}
export default Perfil; 