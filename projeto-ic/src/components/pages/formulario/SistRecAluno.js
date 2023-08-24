import React from 'react';
import styles from './index.module.css'
import Menu from '../../layout/cabecalho/Menu';
import Sistema from '../../form/Sistema';
import { useLocation} from 'react-router-dom';

function SistRecAluno() {
  const location = useLocation();
  const perguntas = location.state?.perguntas || {};
  return (
    <div className={styles.page}>
      <Menu />
      <div className={styles.container}>
        <div className={styles.containerForm}>
          <h1>SISTEMA DE RECOMENDAÇÃO</h1>
          <Sistema codigoTurma={perguntas.codigoTurma} /> 
        </div>
      </div>
    </div>
  );
}

export default SistRecAluno;
