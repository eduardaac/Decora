import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './style.css';
import Sugestoes from './Sugestoes'; // Importe o componente Sugestoes

const API_BASE_URL = "http://localhost:3333";

const Sistema = ({ codigoTurma }) => { // Receba codigoTurma como uma propriedade
    const [questions, setQuestions] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [recommendations, setRecommendations] = useState({});
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (codigoTurma) { // Verifique se o codigoTurma está disponível
            console.log("Codigo de turma do sistema: ", codigoTurma);
            axios.get(`${API_BASE_URL}/questions/byclass/${codigoTurma}`)
                .then(response => {
                    console.log("Dados das perguntas obtidos da API:", response.data);
                    setQuestions(response.data);
                })
                .catch(error => {
                    console.error('Erro ao buscar as perguntas:', error);
                });
        }
    }, [codigoTurma]);

  const onSubmit = async (data) => {
    try {
      const userResponses = {};
      questions.forEach((question, index) => {
        const fieldName = `question_${index}`;
        if (data[fieldName] !== "") {
          userResponses[question._id] = parseInt(data[fieldName]);
        }
      });

      console.log("Respostas do usuário:", userResponses);

      const response = await axios.post(`${API_BASE_URL}/responses`, {
        classCode: codigoTurma,
        userResponses: userResponses,
      });

      if (response.data.recommendations) {
        console.log("Recomendações:", response.data.recommendations);
        setRecommendations(response.data.recommendations); // Atualize as recomendações no estado
        setShowRecommendations(true); // Mostra as sugestões após a submissão
      }
    } catch (error) {
      console.error('Erro ao salvar a resposta:', error);
    }
  };

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {questions.map((question, index) => (
            <div className="formGroup" key={question.label}>
              <label>{question.label}</label>
              <select
                key={question.label}
                className={errors?.[`question_${index}`] ? "input-error" : ""}
                defaultValue=""
                {...register(`question_${index}`, {
                  validate: (value) => value !== "",
                })}
              >
                <option value="">Selecione opção...</option>
                {question.options && question.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={optionIndex}>
                    {option.text}
                  </option>
                ))}
              </select>

              {errors?.[`question_${index}`]?.type === "validate" && (
                <p className="error-message">Campo obrigatório.</p>
              )}

            </div>
          ))}
          <div className="formGroup">
            <button type="submit">SUBMETER</button>
          </div>
        </form>
      </div>

      {/* Renderize o componente de Sugestoes após a submissão */}
      {showRecommendations && <Sugestoes recommendations={recommendations} />}
    </>
  );
};

export default Sistema;
