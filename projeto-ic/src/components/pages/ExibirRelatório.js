import React from 'react';
import styles from './index.module.css';
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Relatorio from '../form/Relatorio';
function ExibirRelatorio() {
    const navigate = useNavigate(); 
    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <div className={styles.page}>
            <div className={styles.containerE}>
                <div className={styles.formE}>
                    <button onClick={handleGoBack} className={styles.icons}><BsArrowLeftSquareFill /></button>
                    <h1>RELATÓRIO</h1>

                    <Relatorio />

                </div>
            </div>
        </div>
    )
}

export default ExibirRelatorio;
