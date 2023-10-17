import React from 'react';
import '../Form.css';

const FormRecommendations = ({ recommendations }) => {
  console.log("FormRecommendations - Recomendações:", recommendations);

  if (!recommendations) {
    return null;
  }

  return (
    <div>
      {Object.keys(recommendations).map((category, index) => (
        <div key={index}>
          <ul>
            {recommendations[category].map((recommendation, index) => (
              <li key={index} title={`Pergunta: ${recommendation.question}`}>
                {recommendation.answer}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FormRecommendations;
