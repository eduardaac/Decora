import React from 'react';
import './style.css';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:3333"; // Atualize para a URL correta

const LoginS = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [sucesso, setSucesso] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state.userId; // Recebendo o userId do estado
    const typeUser = watch("typeUser");


    const onSubmit = async (data) => {
        setSucesso(true);

        try {
            const response = await axios.put(`${API_BASE_URL}/users/${userId}`, data);

            // Se a atualização do usuário foi bem-sucedida, você pode acessar o código de turma gerado
            if (response.status === 200) {
                const novoCodigoTurma = response.data.codigoTurma; // Supondo que o código de turma esteja no corpo da resposta
                console.log(novoCodigoTurma);
                // Navegar para a próxima página, dependendo do tipo de usuário
                if (typeUser === "aluno") {
                    navigate(`/sistema-recomendacoes-a`, { state: { novoCodigoTurma} });
                } else if (typeUser === "professor") {
                    navigate(`/sistema-recomendacoes-p`, { state: { novoCodigoTurma} });
                }
                

            }
        } catch (error) {
            console.log("Erro ao atualizar usuário:", error);
        }
    };

    return (

        <div className="form">

            <div className="formGroup">
                <label>Área de Atuação</label>
                <select
                    className={errors?.atuacao && "input-error"}
                    defaultValue="0"
                    {...register("atuacao", { validate: (value) => value !== "0" })}
                >
                    <option value="0">Selecione sua área de atuação...</option>
                    <option value="mercadoTrabalho">Mercado de trabalho</option>
                    <option value="academica">Acadêmica</option>
                </select>

                {errors?.atuacao?.type === "validate" && (
                    <p className="error-message">Área de atuação é necessária.</p>
                )}
            </div>

            <div className="formGroup">
                <label>Nível de Escolaridade</label>
                <select
                    className={errors?.escolaridade && "input-error"}
                    defaultValue="0"
                    {...register("escolaridade", { validate: (value) => value !== "0" })}
                >
                    <option value="0">Selecione o seu nível de escolaridade...</option>
                    <option value="superiorIncompleto">Ensino superior incompleto</option>
                    <option value="superiorCompleto">Ensino superior completo</option>
                    <option value="Mestrado">Mestrado</option>
                    <option value="Doutorado">Doutorado</option>
                </select>

                {errors?.escolaridade?.type === "validate" && (
                    <p className="error-message">Nível de escolaridade é necessário.</p>
                )}
            </div>

            <div className="formGroup">
                <label>Tipo de usuário</label>
                <select
                    className={errors?.typeUser && "input-error"}
                    defaultValue="0"
                    {...register("typeUser", { validate: (value) => value !== "0" })}
                >
                    <option value="0">Selecione seu tipo de usuário</option>
                    <option value="professor">Professor</option>
                    <option value="aluno">Aluno</option>
                </select>

                {errors?.typeUser?.type === "validate" && (
                    <p className="error-message">Tipo de usuário é necessário.</p>
                )}
            </div>

            {typeUser === "aluno" && (
                <div className="formGroup">
                    <label>Código da turma</label>
                    <input
                        type="text"
                        {...register("codigoTurma", {
                            required: "Código da turma é necessário."
                        })}
                        className={errors?.codigoAluno && "input-error"}
                    />
                    {errors?.codigoTurma && (
                        <p className="error-message">{errors.codigoTurma.message}</p>
                    )}
                </div>
            )}

            <div className="formGroup">
                <button onClick={() => handleSubmit(onSubmit)()}>ENTRAR</button>
            </div>

        </div>

    );
};

export default LoginS;