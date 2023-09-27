import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

import '../Form.css'

const API_BASE_URL = "http://localhost:3333";

function FormEditingSystem() {
  const { userId, codigoTurma } = useParams();
  const professorId = userId;
  console.log("ID DO PROFESSOR: ", professorId);

  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    label: '',
    options: [],
    priority: 1,
    category: 'styles',
    professorId,
  });

  const [newOption, setNewOption] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [addingQuestion, setAddingQuestion] = useState(false);

  const allowedCategories = ["styles", "technologies", "decisions"]; // Categorias permitidas

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
      professorId,
    });
  };

  const handleFinishAddOption = () => {
    if (newOption.trim() !== '') {
      const newOptionObject = {
        text: newOption,
        answers: newAnswer ? [{ answer: newAnswer }] : [], // Estrutura correta para respostas
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

    if (!allowedCategories.includes(newQuestion.category)) {
      alert('Categoria inválida. Use "styles," "technologies" ou "decisions".');
      return;
    }

    console.log("Questão a ser enviada para o banco", newQuestion)
    axios
      .post(`${API_BASE_URL}/questions`, newQuestion) // Verifique a estrutura de newQuestion
      .then(response => {
        const newQuestionFromServer = response.data;
        setQuestions(prevQuestions => [...prevQuestions, newQuestionFromServer]);
        setNewQuestion({
          label: '',
          options: [],
          priority: 1,
          category: 'styles',
          professorId,
        });
        setAddingQuestion(false);
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
        <div key={question._id} className="questionContainer"> {/* Modified key */}
          <div className='deleteButtonContainer'>
            <button className='deleteButton' onClick={() => handleDeleteQuestion(question._id, index)}> {/* Modified onClick */}
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
        <div className="formBorder">

          <p>ADICIONAR PERGUNTA</p>

          <label htmlFor="label">Título</label>
          <input
            type="text"
            id="label"
            value={newQuestion.label}
            onChange={(e) => setNewQuestion({ ...newQuestion, label: e.target.value })}
          />
          <label htmlFor="priority">Prioridade</label>
          <input
            type="number"
            id="priority"
            value={newQuestion.priority}
            onChange={(e) => setNewQuestion({ ...newQuestion, priority: e.target.value })}
          />
          <label htmlFor="category">Categoria</label>
          <input
            type="text"
            id="category"
            value={newQuestion.category}
            onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
          />

          <label htmlFor="optionText">Opção</label>
          <input
            type="text"
            id="optionText"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />
          <label htmlFor="answerText">Resposta</label>
          <input
            type="text"
            id="answerText"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button onClick={handleFinishAddOption}>ADICIONAR OPÇÃO</button>

          <div className="horizontalAlign">
            <button onClick={handleSaveQuestion} className="saveButton">SALVAR</button>
            <button onClick={handleCancelAddQuestion} className="cancelButton">CANCELAR</button>
          </div>
        </div>
      ) : (
        <div className='formGroup'>
          <button onClick={handleAddQuestion}>
            ADICIONAR PERGUNTA
          </button>
        </div>
      )}
    </div>
  );
}

export default FormEditingSystem;
