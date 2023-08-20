import React from 'react';
import './style.css';
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const API_BASE_URL = "http://localhost:3333";

const CadastroP = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [sucesso, setSucesso] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setSucesso(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/users`, data);
            const userId = response.data.id; // Supondo que a resposta contém o ID do usuário
            navigate('/Cadastro2', { state: { userId } }); // Passando o ID do usuário para a próxima etapa
        } catch (error) {
            console.log(error);
        }
    };


    console.log("RENDER");

    return (
        <div className="form">
            <div className="formGroup">
                <label>Nome</label>
                <input
                    className={errors?.nome && "input-error"}
                    type="text" // Corrigido de "nome" para "text"
                    placeholder="Insira seu nome"
                    {...register("nome", {
                        required: true,
                    })}
                />

                {errors?.nome?.type === "required" && (
                    <p className="error-message">O nome é necessário.</p>
                )}
            </div>

            <div className="formGroup">
                <label>E-mail</label>
                <input
                    className={errors?.email && "input-error"}
                    type="email"
                    placeholder="Insira seu e-mail"
                    {...register("email", {
                        required: true,
                        validate: (value) => isEmail(value),
                    })}
                />
                {errors?.email?.type === "required" && (
                    <p className="error-message">O e-mail é necessário.</p>
                )}

                {errors?.email?.type === "validate" && (
                    <p className="error-message">O e-mail é inválido.</p>
                )}
            </div>

            <div className="formGroup">
                <button onClick={handleSubmit(onSubmit)}>PRÓXIMO</button>
            </div>
        </div>
    );
};

export default CadastroP;
