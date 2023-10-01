import React from 'react';
import Menu from '../../components/layout/header/Menu';
import FormSystem from '../../components/form/suggest/FormSystem';
import { useLocation } from 'react-router-dom';

import styles from './Suggest.module.css';

function StudentRecommendationSystem() {
    const location = useLocation();
    const userId = location.state ? location.state.userId : null;
    const codigoTurma = location.state ? location.state.novoCodigoTurma : null;
    console.log("Codigo de turma na pagina renderizada: ", codigoTurma);
    console.log("UserId na pagina renderizada: ", userId);
    return (
        <div>
            <Menu userId={userId} />
            <div className={styles.container}>
                <div className={styles.form}>
                    <h1>SISTEMA DE RECOMENDAÇÃO</h1>
                    <FormSystem codigoTurma={codigoTurma} />
                </div>
            </div>
        </div>
    );
}
export default StudentRecommendationSystem;
