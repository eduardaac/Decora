import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaPlus } from "react-icons/fa"; // Importe os ícones

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
  const [addingAnswer, setAddingAnswer] = useState(false); // Estado para rastrear se estamos adicionando uma resposta

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
        setQuestions(prevQuestions =>
          prevQuestions.filter((_, index) => index !== indexToDelete)
        );
      })
      .catch(error => {
        console.error('Erro ao excluir a pergunta:', error);
      });
  };

  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      if (addingAnswer) {
        // Se estivermos adicionando uma resposta, vincule-a à opção atual
        if (newAnswer.trim() !== '') {
          setNewQuestion(prevQuestion => {
            const updatedOptions = [...prevQuestion.options];
            updatedOptions[updatedOptions.length - 1].answers.push(newAnswer);
            return { ...prevQuestion, options: updatedOptions };
          });
        }
        setAddingAnswer(false); // Finalize a adição da resposta
        setNewAnswer(''); // Limpe o campo de resposta
      } else {
        // Se não estivermos adicionando uma resposta, crie uma nova opção
        setNewQuestion(prevQuestion => ({
          ...prevQuestion,
          options: [...prevQuestion.options, { text: newOption, answers: [] }],
        }));
        setNewOption('');
        setAddingAnswer(true); // Comece a adicionar uma resposta
      }
    }
  };

  const handleSaveQuestion = () => {
    // Verifique a validade da prioridade (1 a 5)
    if (newQuestion.priority < 1 || newQuestion.priority > 5) {
      alert('A prioridade deve estar entre 1 e 5.');
      return;
    }

    // Verifique a validade da categoria (styles, decisions, technologies)
    const validCategories = ['styles', 'decisions', 'technologies'];
    if (!validCategories.includes(newQuestion.category)) {
      alert('A categoria deve ser "styles", "decisions" ou "technologies".');
      return;
    }

    // Envie a nova pergunta para o servidor aqui
    // Certifique-se de ajustar a lógica de envio de acordo com a estrutura esperada pelo servidor
    console.log("Nova pergunta a ser enviada:", newQuestion);
    // Aqui você pode fazer a solicitação POST para adicionar a pergunta

    // Limpe o estado para preparar uma nova pergunta
    setNewQuestion({
      label: '',
      options: [],
      priority: 1,
      category: 'styles',
    });
    setAddingAnswer(false);
    setNewOption('');
    setNewAnswer('');
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

      <div className="formGroup">
        <label>Label da Pergunta:</label>
        <input
          type="text"
          value={newQuestion.label}
          onChange={(e) => setNewQuestion({ ...newQuestion, label: e.target.value })}
        />
      </div>

      <div className="formGroup">
        <label>Opções:</label>
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
        />
        <button onClick={handleAddOption}>
          {addingAnswer ? "Finalizar Opção" : <FaPlus />} 
        </button>
      </div>

      {addingAnswer && (
        <div className="formGroup">
          <label>Respostas:</label>
          <input
            type="text"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button onClick={handleAddOption}>
            <FaPlus /> Adicionar Resposta
          </button>
        </div>
      )}

      <div className="formGroup">
        <label>Prioridade:</label>
        <input
          type="number"
          value={newQuestion.priority}
          onChange={(e) => setNewQuestion({ ...newQuestion, priority: parseInt(e.target.value) })}
        />
      </div>

      <div className="formGroup">
        <label>Categoria:</label>
        <select
          value={newQuestion.category}
          onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
        >
          <option value="styles">Styles</option>
          <option value="decisions">Decisions</option>
          <option value="technologies">Technologies</option>
        </select>
      </div>

      <button onClick={handleSaveQuestion}>Salvar Pergunta</button>
    </div>
  );
}

export default SistemaEdition;
