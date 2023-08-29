import React from 'react';
import './style.css';
import { useForm } from 'react-hook-form';
import { isEmail } from 'validator';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3333';

const LoginP = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, data); // Corrija a URL da API
            console.log('Resposta do servidor:', response.data);

        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="form">
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
                <label>Senha</label>
                <input
                    className={errors?.password && "input-error"}
                    type="password"
                    placeholder="Insira sua senha"
                    {...register("password", { required: true, minLength: 7 })}
                />

                {errors?.password?.type === "required" && (
                    <p className="error-message">A senha é necessária.</p>
                )}

                {errors?.password?.type === "minLength" && (
                    <p className="error-message">
                        A senha precisa ter pelo menos 7 caracteres.
                    </p>
                )}
            </div>

            <div className="formField">
                <input
                    type="checkbox"
                    name="checkbox"
                />
                <label htmlFor="textbox">Lembrar-me</label>
                <a href=' '>Esqueceu sua senha?</a>
            </div>

            <div className="formGroup">
                <button onClick={handleSubmit(onSubmit)}>ENTRAR</button>
            </div>
        </div>
    );
};

export default LoginP;
