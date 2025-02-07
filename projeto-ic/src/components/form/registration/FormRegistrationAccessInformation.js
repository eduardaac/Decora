import React from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import '../Form.css'

const API_BASE_URL = "https://decora-back.vercel.app"; 

const FormRegistrationAccessInformation = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();
  const watchPassword = watch("password");

  const location = useLocation();
  const userId = location.state.userId;

  const onSubmit = async (data) => {
    setSucesso(true);

    try {
      await axios.put(`${API_BASE_URL}/users/${userId}`, {
        dataNascimento: data.data,
        senha: data.password,
      });

      navigate('/registration-professional-profile', { state: { userId } });
    } catch (error) {
      console.log("Erro ao atualizar usuário:", error);
    }
  };

  console.log("RENDER");

  return (
    <div className="form">
      <div className="formGroup">
        <label>Data de Nascimento</label>
        <input
          className={errors?.data && "input-error"}
          type="date"
          {...register("data", {
            required: true,
          })}
        />

        {errors?.data?.type === "required" && (
          <p className="error-message">A data de nascimento é necessária.</p>
        )}
      </div>

      <div className="formGroup">
        <label>Senha</label>
        <input
          className={errors?.senha && "input-error"}
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

      <div className="formGroup">
        <label>Confirmação de senha</label>
        <input
          className={errors?.passwordConfirmation && "input-error"}
          type="password"
          placeholder="Insira sua senha novamente"
          {...register("passwordConfirmation", {
            required: true,
            validate: (value) => value === watchPassword,
          })}
        />
        {errors?.passwordConfirmation?.type === "required" && (
          <p className="error-message">A confirmação de senha é necessária.</p>
        )}

        {errors?.passwordConfirmation?.type === "validate" && (
          <p className="error-message">As senhas não correspondem.</p>
        )}
      </div>

      <div className="formGroup">
        <button onClick={handleSubmit(onSubmit)}>PRÓXIMO</button>
      </div>
    </div>
  );
};

export default FormRegistrationAccessInformation;
