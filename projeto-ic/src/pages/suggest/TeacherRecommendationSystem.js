import React from 'react';
import Menu from '../../components/layout/header/Menu';
import FormSystem from '../../components/form/suggest/FormSystem';
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import styles from './Suggest.module.css';

function TeacherRecommendationSystem() {
    console.log("SistRecProfessor renderizado");
    const location = useLocation();
    const userId = location.state ? location.state.userId : null;
    const codigoTurma = location.state ? location.state.novoCodigoTurma : null;
    const typeUser = location.state ? location.state.typeUser : null;
    console.log("Codigo de turma na pagina renderizada: ", codigoTurma);
    return (
        <div>
            <Menu userId={userId} typeUser={typeUser} />
            <div className={styles.container}>
                <div className={styles.form}>
                    <Link to={`/editing-system/${userId}/${codigoTurma}`} className={styles.icons}><FaEdit /></Link>
                    <h1>SISTEMA DE RECOMENDAÇÕES</h1>
                    <FormSystem codigoTurma={codigoTurma} />
                </div>
            </div>
        </div>
    );
}
export default TeacherRecommendationSystem;
