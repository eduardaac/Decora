import React from 'react';
import './style.css';
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const CadastroP = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [sucesso, setSucesso] = useState(false);
    
    const onSubmit = (data) => {
        setSucesso(true);
        // Renomeie a função abaixo para evitar a recursão infinita
        submitForm(data);
    };
    
    const submitForm = (data) => {
        // Lógica adicional do envio do formulário
    };
    
    if (sucesso) {
        return <Navigate to="/Cadastro2" />;
    }
    
    console.log("RENDER");

    return (
        <div className="form">
            <div className="formGroup">
                <label>Nome</label>
                <input
                    className={errors?.nome && "input-error"}
                    type="nome"
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
