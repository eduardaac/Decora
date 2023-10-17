import React from 'react';
import Menu from '../../components/layout/header/Menu';
import FormEditingSystem from '../../components/form/suggest/FormEditingSystem'
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import styles from './Suggest.module.css';

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
            <Menu userId={userId} />
            <div className={styles.container}>
                <div className={styles.form}>
                    <button onClick={handleGoBack} className={styles.icons}><BsArrowLeftSquareFill /></button>
                    <h1>SISTEMA DE SUGESTÕES</h1>
                    <FormEditingSystem />
                </div>
            </div>
        </div >
    )
}
export default EditingSystem;
