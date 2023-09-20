import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaPlus } from 'react-icons/fa';

const API_BASE_URL = "http://localhost:3333";

function SistemaEdition() {
  let { userId, codigoTurma } = useParams();
  const professorId = userId;

  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    label: '',
    options: [],
    priority: 1,
    category: 'styles',
  });

  const [newOption, setNewOption] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [addingOption, setAddingOption] = useState(false);

  useEffect(() => {
    if (codigoTurma) {
      axios.get(`${API_BASE_URL}/questions/byclass/${codigoTurma}`)
        .then(response => {
          setQuestions(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar as perguntas:', error);
        });
    }
  }, [codigoTurma]);

  const handleDeleteQuestion = (questionId, indexToDelete) => {
    axios.delete(`${API_BASE_URL}/users/${professorId}/questions/${questionId}`)
      .then(response => {
        setQuestions(prevQuestions =>
          prevQuestions.filter((_, index) => index !== indexToDelete)
        );
      })
      .catch(error => {
        console.error('Erro ao excluir a pergunta:', error);
      });
  };

  const handleAddQuestion = () => {
    setAddingQuestion(true);
  };

  const handleCancelAddQuestion = () => {
    setAddingQuestion(false);
    setNewQuestion({
      label: '',
      options: [],
      priority: 1,
      category: 'styles',
    });
  };

  const handleAddOption = () => {
    setAddingOption(true);
  };

  const handleCancelAddOption = () => {
    setAddingOption(false);
    setNewOption('');
    setNewAnswer('');
  };

  const handleFinishAddOption = () => {
    if (newOption.trim() !== '') {
      const newOptionObject = {
        text: newOption,
        answers: newAnswer ? [newAnswer] : [], // Inclua a resposta se houver uma
      };

      setNewQuestion(prevQuestion => ({
        ...prevQuestion,
        options: [...prevQuestion.options, newOptionObject],
      }));

      setNewOption('');
      setNewAnswer('');
    }
  };

  const handleSaveQuestion = () => {
    if (newQuestion.label.trim() === '') {
      alert('Por favor, preencha o campo de label da pergunta.');
      return;
    }

    if (newQuestion.options.length === 0) {
      alert('Por favor, adicione pelo menos uma opção à pergunta.');
      return;
    }
    // Verifique se os dados da nova pergunta estão corretos antes de fazer a solicitação POST
    console.log('Nova pergunta a ser enviada:', newQuestion);
    console.log('ProfessorId', professorId);

    axios.post(`${API_BASE_URL}/questions`, newQuestion)
      .then(response => {
        // A resposta do servidor deve conter a nova pergunta criada
        const newQuestionFromServer = response.data;
        console.log('Resposta do servidor:', newQuestionFromServer); // Adicione este log para verificar a resposta do servidor
        // Atualizar o estado com a nova pergunta
        setQuestions(prevQuestions => [...prevQuestions, newQuestionFromServer]);
        setNewQuestion({
          label: '',
          options: [],
          priority: 1,
          category: 'styles',
        });
        setAddingOption(false);
        setNewOption('');
        setNewAnswer('');
      })
      .catch(error => {
        console.error('Erro ao criar a pergunta:', error);
      });
  };


  return (
    <div>
      {questions.map((question, index) => (
        <div key={question.label} className="questionContainer">
          <div className='deleteButtonContainer'>
            <button className='deleteButton' onClick={() => handleDeleteQuestion(question._id, index)}>
              <FaTrash />
            </button>
          </div>
          <div className="formGroup">
            <label>{question.label}</label>
            <select>
              <option value="">Selecione opção...</option>
              {question.options && question.options.map((option, optionIndex) => (
                <option key={optionIndex} value={optionIndex}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}

      {addingQuestion ? (
        <div className="formGroup">
          <label htmlFor="label">Label:</label>
          <input
            type="text"
            id="label"
            value={newQuestion.label}
            onChange={(e) => setNewQuestion({ ...newQuestion, label: e.target.value })}
          />
          <label htmlFor="priority">Priority:</label>
          <input
            type="number"
            id="priority"
            value={newQuestion.priority}
            onChange={(e) => setNewQuestion({ ...newQuestion, priority: e.target.value })}
          />
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={newQuestion.category}
            onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
          />
          {addingOption ? (
            <div className="addOptionForm">
              <label htmlFor="optionText">Option Text:</label>
              <input
                type="text"
                id="optionText"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
              />
              <label htmlFor="answerText">Answer Text:</label>
              <input
                type="text"
                id="answerText"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <button onClick={handleFinishAddOption}>Finalizar Resposta</button>
            </div>
          ) : null}
          {addingOption ? (
            <button onClick={handleCancelAddOption}>Cancelar Resposta</button>
          ) : (
            <button onClick={handleAddOption}>Adicionar Resposta</button>
          )}
          <button onClick={handleSaveQuestion}>Salvar Pergunta</button>
          <button onClick={handleCancelAddQuestion}>Cancelar Pergunta</button>
        </div>
      ) : (
        <div className='formGroup'>
          <button onClick={handleAddQuestion}>
            Adicionar Pergunta
          </button>
        </div>
      )}
    </div>
  );
}

export default SistemaEdition;
