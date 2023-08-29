import React from 'react';
import styles from './index.module.css'
import Menu from '../../layout/cabecalho/Menu';
import Sistema from '../../form/Sistema';

function SistRecAluno() {
  return (
    <div className={styles.page}>
      <Menu />
      <div className={styles.container}>
        <div className={styles.containerForm}>
          <h1>SISTEMA DE RECOMENDAÇÃO</h1>
          <Sistema />
        </div>
      </div>
    </div>
  );
}

export default SistRecAluno;
