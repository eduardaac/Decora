import React from 'react';
import styles from './index.module.css'
import Menu from '../../layout/cabecalho/Menu';
import Sistema from '../../form/Sistema';

function SistRecAluno() {
  return (
    <dev className={styles.page}>
      <Menu />
      <dev className={styles.container}>
        <dev className={styles.containerForm}>
          <h1>SISTEMA DE RECOMENDAÇÃO</h1>
          <Sistema/>

        </dev>
      </dev>
    </dev >
  )
}
export default SistRecAluno; 