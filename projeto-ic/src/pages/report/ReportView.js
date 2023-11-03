import React from 'react';
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import FormReportView from '../../components/form/report/FormReportView';

import styles from './ReportView.module.css';

function ReportView() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };
    return (

        <div className={styles.container}>
            <div className={styles.form}>
                <button onClick={handleGoBack} className={styles.icons}><BsArrowLeftSquareFill /></button>
                <h1>DADOS DA TURMA</h1>
                <FormReportView />

            </div>
        </div>
    )
}

export default ReportView;
