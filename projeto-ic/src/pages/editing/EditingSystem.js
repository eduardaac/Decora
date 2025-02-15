import React from 'react';
import FormEditingSystem from '../../components/form/suggest/FormEditingSystem'
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import styles from './Editing.module.css';

function EditingSystem() {
    const location = useLocation();
    const userId = location.state ? location.state.userId : null;
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    console.log("id do usuário", userId);
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.form}>
                    <button onClick={handleGoBack} className={styles.icons}><BsArrowLeftSquareFill /></button>
                    <h1>SISTEMA DE RECOMENDAÇÕES</h1>
                    <FormEditingSystem />
                </div>
            </div>
        </div >
    )
}
export default EditingSystem;
