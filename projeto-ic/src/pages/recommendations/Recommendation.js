import React from 'react';
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate, useLocation } from 'react-router-dom'; // Importe useLocation

import styles from './Recommendation.module.css';
import FormRecommendations from '../../components/form/suggest/FormRecommendations';

function Recommendation() {
    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation para acessar a localização da rota
    const { recommendations } = location.state || {}; // Acesse as recomendações a partir da localização
    console.log("Recommendation - Recomendações:", recommendations);

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <button onClick={handleGoBack} className={styles.icons}><BsArrowLeftSquareFill /></button>
                <h1>RECOMENDAÇÕES</h1>
                {recommendations ? <FormRecommendations recommendations={recommendations} /> : null}
            </div>
        </div>
    )
}

export default Recommendation;
