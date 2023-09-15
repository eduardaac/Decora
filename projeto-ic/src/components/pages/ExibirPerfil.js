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
            <div className={styles.container}>
                <div className={styles.form}>
                    <button onClick={handleGoBack} className={styles.icons}><BsArrowLeftSquareFill /></button>
                    <h1>Perfil</h1>
                    <Perfil />
                </div>
            </div>
        </div>
    )
}

export default ExibirPerfil;
