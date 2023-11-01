import React, { useEffect, useState } from 'react';
import { BsArrowLeftSquareFill } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Recommendation.module.css';

function Recommendation() {
    const navigate = useNavigate();
    const location = useLocation();
    const { recommendations } = location.state || {};
    const [recommendationsWithMotivations, setRecommendationsWithMotivations] = useState([]);

    const API_BASE_URL = "https://decora-back.vercel.app";

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (recommendations) {
            const categories = ['styles', 'decisions', 'technologies'];

            const fetchMotivations = async () => {
                const recommendationsData = [];

                for (const category of categories) {
                    for (const recommendation of recommendations[category]) {
                        const answer = recommendation.answer;

                        try {
                            const response = await fetch(`${API_BASE_URL}/motivations/getMotivationsByAnswer/${answer}`);
                            const motivationData = await response.json();

                            recommendationsData.push({
                                recommendation,
                                motivation: motivationData,
                            });
                        } catch (error) {
                            console.error('Error fetching motivations:', error);
                        }
                    }
                }

                setRecommendationsWithMotivations(recommendationsData);
            };

            fetchMotivations();
        }
    }, [recommendations]);

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <button onClick={handleGoBack} className={styles.icons}>
                    <BsArrowLeftSquareFill />
                </button>
                <h1>RECOMENDAÇÕES</h1>
                {recommendationsWithMotivations.length > 0 ? (
                    <div>
                        {recommendationsWithMotivations.map((data, index) => (
                            <div key={index}>
                                <p title={data.recommendation.question}>{data.recommendation.answer}</p>
                                <p>{data.motivation.explanation}</p>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Recommendation;
