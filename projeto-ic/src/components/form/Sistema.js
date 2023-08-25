import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import { useForm } from 'react-hook-form';

const API_BASE_URL = "http://localhost:3333";

const Sistema = () => {
    const [questions, setQuestions] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const location = useLocation();
    const codigoTurma = location.state.codigoTurma;
    console.log(codigoTurma);

    useEffect(() => {
        console.log("Código da Turma:", codigoTurma);

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

    // Dentro de onSubmit em Sistema.js
    const onSubmit = (data) => {
        console.log("Dados do Formulário Submetidos:", data); // Verifique os dados do formulário submetidos
    };


    return (
        <div className="form">
            {questions.map((question, index) => (
                <div className="formGroup" key={index}>
                    <label>{question.label}</label>
                    <select
                        className={errors?.[question.fieldName] && "input-error"}
                        defaultValue="0"
                        {...register(question.fieldName, { validate: (value) => value !== "0" })}
                    >
                        <option value="0">Selecione opção...</option>
                        {question.options.map(option => (
                            <option key={option.text} value={option.text}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                    {errors?.[question.fieldName]?.type === "validate" && (
                        <p className="error-message">Campo obrigatório.</p>
                    )}
                </div>
            ))}
            <div className="formGroup">
                <button onClick={handleSubmit(onSubmit)}>SUBMETER</button>
            </div>
        </div>
    );
};

export default Sistema;
