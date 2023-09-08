import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaPlus } from 'react-icons/fa';

function SistemaEdition() {
  let { userId, codigoTurma } = useParams();
  const professorId = userId;

  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    label: '',
    options: [], // Agora options será um array de objetos com "text" e "answers"
    priority: 1,
    category: 'styles',
  });
  const [newOption, setNewOption] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [addingAnswer, setAddingAnswer] = useState(false);
  const [previousState, setPreviousState] = useState(null);
  const [isAddingOption, setIsAddingOption] = useState(false);

  useEffect(() => {
    if (codigoTurma) {
      axios
        .get(`http://localhost:3333/questions/byclass/${codigoTurma}`)
        .then((response) => {
          setQuestions(response.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar as perguntas:', error);
        });
    }
  }, [codigoTurma]);

  const handleDeleteQuestion = (questionId, indexToDelete) => {
    axios
      .delete(`http://localhost:3333/users/${professorId}/questions/${questionId}`)
      .then((response) => {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((_, index) => index !== indexToDelete)
        );
      })
      .catch((error) => {
        console.error('Erro ao excluir a pergunta:', error);
      });
  };

  const handleAddOption = () => {
    if (!isAddingOption) {
      setIsAddingOption(true);
      setNewOption('');
      console.log('Iniciando a adição de uma nova opção.');
    } else {
      if (newOption.trim() !== '') {
        if (addingAnswer) {
          // Se estivermos adicionando uma resposta, vincule-a à opção atual
          if (newAnswer.trim() !== '') {
            setNewQuestion((prevQuestion) => {
              const updatedOptions = [...prevQuestion.options];
              // Adicione a nova resposta à opção atual
              updatedOptions[updatedOptions.length - 1].answers.push(newAnswer);
              console.log('Adicionando resposta à opção atual:', newAnswer);
              return { ...prevQuestion, options: updatedOptions };
            });
          }
          setAddingAnswer(false);
          setNewAnswer('');
          console.log('Finalizando a adição da resposta.');
        } else {
          // Salve o estado atual antes de começar a adição de uma resposta
          setPreviousState({
            newQuestion,
            addingAnswer,
            newOption,
            newAnswer,
          });

          // Crie uma nova opção
          const newOptionObject = {
            text: newOption,
            answers: [], // Inicialize as respostas como um array vazio
          };

          setNewQuestion((prevQuestion) => {
            const updatedOptions = [...prevQuestion.options];
            updatedOptions.push(newOptionObject);
            console.log('Adicionando nova opção:', newOptionObject);
            return { ...prevQuestion, options: updatedOptions };
          });

          setNewOption('');
          setAddingAnswer(true);
        }
      }
      setIsAddingOption(false);
      console.log('Finalizando a adição da opção.');
      console.log('Novo estado da pergunta:', newQuestion);
    }
  };

  const handleToggleAddingAnswer = () => {
    if (addingAnswer) {
      setAddingAnswer(false);
      setNewAnswer('');
      console.log('Finalizando a adição da resposta.');
    } else {
      setAddingAnswer(true);
      console.log('Iniciando a adição de uma nova resposta.');
    }
  };

  const handleFinishOption = () => {
    setIsAddingOption(false);
    setAddingAnswer(false);
    setNewAnswer('');
    setNewOption('');
    console.log('Finalizando a adição da opção.');
  };

  const handleSaveQuestion = () => {
    if (newQuestion.priority < 1 || newQuestion.priority > 5) {
      alert('A prioridade deve estar entre 1 e 5.');
      return;
    }

    const validCategories = ['styles', 'decisions', 'technologies'];
    if (!validCategories.includes(newQuestion.category)) {
      alert('A categoria deve ser "styles", "decisions" ou "technologies".');
      return;
    }

    const newQuestionToSend = {
      label: newQuestion.label,
      priority: newQuestion.priority,
      category: newQuestion.category,
      options: newQuestion.options,
    };

    console.log('Nova pergunta a ser enviada:', newQuestionToSend);

    if (previousState) {
      setNewQuestion(previousState.newQuestion);
      setAddingAnswer(previousState.addingAnswer);
      setNewOption(previousState.newOption);
      setNewAnswer(previousState.newAnswer);
      setPreviousState(null);
    } else {
      setNewQuestion({
        label: '',
        options: [],
        priority: 1,
        category: 'styles',
      });
      setAddingAnswer(false);
      setNewOption('');
      setNewAnswer('');
    }
  };

  return (
    <div>
      <ul>
        {questions.map((question, index) => (
          <div className="formGroup" key={question.label}>
            <label>{question.label}</label>
            <select key={question.label}>
              <option value="">Selecione opção...</option>
              {question.options &&
                question.options.map((option, optionIndex) => (
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
        {isAddingOption ? (
          <>
            <button onClick={handleToggleAddingAnswer}>
              <FaPlus /> Adicionar Resposta
            </button>
            <button onClick={handleFinishOption}>Finalizar Opção</button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
            />
            <button onClick={handleAddOption}>
              {addingAnswer ? 'Finalizar Opção' : <FaPlus />}
            </button>
          </>
        )}
      </div>

      {addingAnswer && (
        <div className="formGroup">
          <label>Respostas:</label>
          <input
            type="text"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button onClick={handleToggleAddingAnswer}>
            <FaPlus /> Adicionar Resposta
          </button>
        </div>
      )}

      <div className="formGroup">
        <label>Prioridade:</label>
        <input
          type="number"
          value={newQuestion.priority}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, priority: parseInt(e.target.value) })
          }
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
