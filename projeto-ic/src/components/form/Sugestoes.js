import React from 'react';

const Sugestoes = ({ recommendations }) => {
  return (
    <div>
      <h2>Sugestões</h2>
      <div>
        <h3>Estilos:</h3>
        <ul>
          {recommendations.styles.map((style, index) => (
            <li key={index}>{style}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Decisões:</h3>
        <ul>
          {recommendations.decisions.map((decision, index) => (
            <li key={index}>{decision}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Tecnologias:</h3>
        <ul>
          {recommendations.technologies.map((technology, index) => (
            <li key={index}>{technology}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sugestoes;
