import React from 'react';
import './style.css';
import { useForm } from "react-hook-form";
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
const LoginS = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [sucesso, setSucesso] = useState(false);
    const onSubmit = (data) => {
      setSucesso(true);
      console.log(data);
    };
    if (sucesso) {
      return <Navigate to="/iniciar-sistema-recomendacoes" />;
    }
    console.log("RENDER");
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
                <label>Nível de Experiência na Área</label>
                <select
                    className={errors?.experiencia && "input-error"}
                    defaultValue="0"
                    {...register("experiencia", { validate: (value) => value !== "0" })}
                >
                    <option value="0">Selecione o seu nível de experiencia na área...</option>
                    <option value="0a2">0 a 2 anos</option>
                    <option value="3a5">3 a 5 anos</option>
                    <option value="6a9">6 a 9 anos</option>
                    <option value="mais10">Mais de 10 anos</option>
                </select>

                {errors?.experiencia?.type === "validate" && (
                    <p className="error-message">Nível de experiencia na área é necessária.</p>
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

            <div className="formGroup">
                <button onClick={() => handleSubmit(onSubmit)()}>ENTRAR</button>
            </div>

        </div>

    );
};

export default LoginS;