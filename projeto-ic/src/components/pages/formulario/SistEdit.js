import React from 'react';
import styles from '../index.module.css';
import Menu from '../../layout/cabecalho/Menu';
import SistemaEdition from '../../form/SistemaEdition';
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom'; // Importe useNavigate em vez de useHistory
import { useLocation } from 'react-router-dom'; 

function SistEdit() {
    const location = useLocation();
    const userId = location.state ? location.state.userId : null;
    const codigoTurma = location.state ? location.state.novoCodigoTurma : null;

    const navigate = useNavigate(); // Use useNavigate em vez de useHistory

    const handleGoBack = () => {
        // Use navigate(-1) para voltar para a página anterior
        navigate(-1);
    };

    console.log("id do usuário", userId);
    return (
        <div className={styles.page}>
            <Menu userId={userId} />
            <div className={styles.container}>
                <div className={styles.form}>
                    <button onClick={handleGoBack} className={styles.icons}><BsArrowLeftSquareFill /></button>
                    <h1>SISTEMA DE RECOMENDAÇÃO</h1>
                    <SistemaEdition />
                </div>
            </div>
        </div >
    )
}
export default SistEdit;
