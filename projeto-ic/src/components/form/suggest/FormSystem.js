import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

import '../Form.css';

const API_BASE_URL = "https://decora-back.vercel.app";

const FormSystem = ({ codigoTurma }) => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (codigoTurma) {
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
        navigate('/recommendation', {
          state: { recommendations: response.data.recommendations },
        });
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
    </>
  );
};

export default FormSystem;
