import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    const codigoTurma = location.state.novoCodigoTurma; 
    console.log("Codigo da turma: ", codigoTurma)

    useEffect(() => {
        if (codigoTurma) {
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

    const onSubmit = (data) => {
        console.log("Dados do Formulário Submetidos:", data);
    };

    return (
        <div className="form">
            {questions.map((question) => (
                <div className="formGroup" key={question._id}>
                    <label>{question.label}</label>
                    <select
                        key={question._id}
                        className={errors?.[question.fieldName] ? "input-error" : ""}
                        defaultValue="0"
                        {...register(question.fieldName, { validate: (value) => value !== "0" })}
                    >
                        <option value="0">Selecione opção...</option>
                        {question.options.map(option => (
                            <option key={option._id} value={option.type}>
                                {option.type}
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

