import React from 'react';
import { useParams } from 'react-router-dom';

function SistemaEdition() {
  // Obtenha o parâmetro codigoTurma da URL
  let { codigoTurma } = useParams();

  return (
    <div>
      <h2>Código da Turma: {codigoTurma}</h2>
      {/* Resto do conteúdo do componente de edição */}
    </div>
  );
}

export default SistemaEdition;
