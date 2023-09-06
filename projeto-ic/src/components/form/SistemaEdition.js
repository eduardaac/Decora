import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from "react-icons/fa"; // Importe o ícone de exclusão

function SistemaEdition() {
  let { userId, codigoTurma } = useParams();
  const professorId = userId;

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (codigoTurma) {
      axios.get(`http://localhost:3333/questions/byclass/${codigoTurma}`)
        .then(response => {
          setQuestions(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar as perguntas:', error);
        });
    }
  }, [codigoTurma]);

  const handleDeleteQuestion = (questionId, indexToDelete) => {
    axios.delete(`http://localhost:3333/users/${professorId}/questions/${questionId}`)

      .then(response => {
        // Remova a questão da lista após a exclusão bem-sucedida
        setQuestions(prevQuestions =>
          prevQuestions.filter((_, index) => index !== indexToDelete)
        );
      })
      .catch(error => {
        console.error('Erro ao excluir a pergunta:', error);
      });
  };

  return (
    <div>
      <ul>
        {questions.map((question, index) => (
          <div className="formGroup" key={question.label}>
            <label>{question.label}</label>
            <select
              key={question.label}
            
            >
              <option value="">Selecione opção...</option>
              {question.options && question.options.map((option, optionIndex) => (
                <option key={optionIndex} value={optionIndex}>
                  {option.text}
                </option>
              ))}
            </select>

            <button onClick={() => handleDeleteQuestion(question._id, index)}>
              <FaTrash />
            </button>

          </div>
        ))}
      </ul>
    </div>
  );
}

export default SistemaEdition;
