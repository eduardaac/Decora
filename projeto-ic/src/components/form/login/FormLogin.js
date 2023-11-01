import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isEmail } from 'validator';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../Form.css'

const API_BASE_URL = 'https://decora-back.vercel.app';

const FormLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState('');

  const clearLoginError = () => {
    setLoginError('');
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, data);

      if (response.status === 200) {
        const { typeUser } = response.data;
        const novoCodigoTurma = response.data.codigoTurma;
        const userId = response.data.userId;

        if (typeUser === 'aluno') {
          navigate(`/student-recommendation`, { state: { novoCodigoTurma, userId, typeUser } });
        } else if (typeUser === 'professor') {
          navigate(`/teacher-recommendation`, { state: { novoCodigoTurma, userId, typeUser } });
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError('Credenciais inválidas.');
      } else {
        console.error('Erro ao fazer login:', error);
      }
    }
  };

  return (
    <div className="form">
      <div className="formGroup">
        <label>E-mail</label>
        <input
          className={errors?.email && 'input-error'}
          type="email"
          placeholder="Insira seu e-mail"
          {...register('email', {
            required: true,
            validate: (value) => isEmail(value),
          })}
          onFocus={clearLoginError} // Limpar a mensagem de erro ao focar no campo de email
        />
        {errors?.email?.type === 'required' && (
          <p className="error-message">O e-mail é necessário.</p>
        )}

        {errors?.email?.type === 'validate' && (
          <p className="error-message">O e-mail é inválido.</p>
        )}
      </div>

      <div className="formGroup">
        <label>Senha</label>
        <input
          className={errors?.senha && 'input-error'}
          type="password"
          placeholder="Insira sua senha"
          {...register('senha', { required: true, minLength: 7 })}
          onFocus={clearLoginError} // Limpar a mensagem de erro ao focar no campo de senha
        />

        {errors?.senha?.type === 'required' && (
          <p className="error-message">A senha é necessária.</p>
        )}

        {errors?.senha?.type === 'minLength' && (
          <p className="error-message">
            A senha precisa ter pelo menos 7 caracteres.
          </p>


        )}
        {loginError && <p className="error-message">{loginError}</p>}
      </div>


      <div className="formField">
        <input type="checkbox" name="checkbox" id="checkbox" />
        <label htmlFor="checkbox">Lembrar-me</label>
        <a href=" ">Esqueceu sua senha?</a>
      </div>

      <div className="formGroup">
        <button onClick={handleSubmit(onSubmit)}>ENTRAR</button>
      </div>
    </div>
  );
};

export default FormLogin;
