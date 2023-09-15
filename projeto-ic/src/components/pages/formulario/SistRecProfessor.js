import React from 'react';
import styles from '../index.module.css';
import Menu from '../../layout/cabecalho/Menu';
import Sistema from '../../form/Sistema';
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 

function SistRecProfessor() {
    console.log("SistRecProfessor renderizado");
    const location = useLocation();
    const userId = location.state ? location.state.userId : null;
    const codigoTurma = location.state ? location.state.novoCodigoTurma : null;
    console.log("Codigo de turma na pagina renderizada: ", codigoTurma);
    return (
        <div className={styles.page}>
            <Menu userId={userId} />
            <div className={styles.containeSist}>
                <div className={styles.formSist}>
                    <Link to={`/edition/${userId}/${codigoTurma}`} className={styles.icons}><FaEdit /></Link>
                    <h1>SISTEMA DE RECOMENDAÇÃO</h1>
                    <Sistema codigoTurma={codigoTurma} />
                </div>
            </div>
        </div>
    );
}
export default SistRecProfessor;
