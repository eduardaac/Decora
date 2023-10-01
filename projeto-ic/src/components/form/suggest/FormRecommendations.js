// Em FormRecommendations.js
import React from 'react';

import '../Form.css';

const FormRecommendations = ({ recommendations }) => {
  console.log("FormRecommendations - Recomendações:", recommendations);

  if (!recommendations) {
    return null;
  }

  return (
    <div>
      <ul>
        {recommendations.styles.map((style, index) => (
          <li key={index}>{style}</li>
        ))}
      </ul>
      <ul>
        {recommendations.decisions.map((decision, index) => (
          <li key={index}>{decision}</li>
        ))}
      </ul>
      <ul>
        {recommendations.technologies.map((technology, index) => (
          <li key={index}>{technology}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormRecommendations;
