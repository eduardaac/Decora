import React, { useState } from 'react';
import './style.css';
import { useForm } from 'react-hook-form';
import { isEmail } from 'validator';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3333';

const Cadastro1 = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [emailEmUso, setEmailEmUso] = useState(false);

    const clearEmailEmUso = () => {
        setEmailEmUso(false);
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users`, data);
            const userId = response.data._id;

            navigate('/Cadastro2', { state: { userId } });
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 400) {
                setEmailEmUso(true);
            }
        }
    };

    return (
        <div className="form">

            <div className="formGroup">
                <label>Nome</label>
                <input
                    className={errors?.nome && 'input-error'}
                    type="text"
                    placeholder="Insira seu nome"
                    {...register('nome', {
                        required: true,
                    })}
                />
                {errors?.nome?.type === 'required' && (
                    <p className="error-message">O nome é necessário.</p>
                )}
            </div>

            <div className="formGroup">
                <label>E-mail</label>
                <input
                    className={(errors?.email || emailEmUso) && 'input-error'} // Adicione uma classe de erro se houver um erro no email ou se o email estiver em uso
                    type="email"
                    placeholder="Insira seu e-mail"
                    {...register('email', {
                        required: true,
                        validate: (value) => isEmail(value),
                    })}
                    onFocus={clearEmailEmUso} // Limpar a mensagem de erro ao focar no campo de email
                />
                {errors?.email?.type === 'required' && (
                    <p className="error-message">O e-mail é necessário.</p>
                )}

                {errors?.email?.type === 'validate' && (
                    <p className="error-message">O e-mail é inválido.</p>
                )}
                {emailEmUso && (
                    <p className="error-message">O e-mail já está em uso. Por favor, escolha outro.</p>
                )}
            </div>

            <div className="formGroup">
                <button onClick={handleSubmit(onSubmit)}>PRÓXIMO</button>
            </div>
        </div>
    );
};

export default Cadastro1;
