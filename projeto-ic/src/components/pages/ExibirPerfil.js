import React from 'react';
import styles from './index.module.css';
import Perfil from '../form/Perfil';
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
function ExibirPerfil() {
    const navigate = useNavigate(); // Defina navigate usando useNavigate
    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <div className={styles.page}>
            <div className={styles.containerE}>
                <div className={styles.formE}>
                    <button onClick={handleGoBack} className={styles.icons}><BsArrowLeftSquareFill /></button>
                    <h1>PERFIL</h1>

                    <Perfil />

                </div>
            </div>
        </div>
    )
}

export default ExibirPerfil;
