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
        <div className={styles.page}>
            <div className={styles.containerE}>
                <div className={styles.formE}>
                    <button onClick={handleGoBack} className={styles.icons}><BsArrowLeftSquareFill /></button>
                    <h1>RELATÓRIO</h1>
                    <FormReportView />
                </div>
            </div>
        </div>
    )
}

export default ReportView;
