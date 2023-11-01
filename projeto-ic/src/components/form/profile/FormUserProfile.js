import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import '../Form.css'

const FormUserProfile = () => {
  const { userId } = useParams();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (userId) {
      axios.get(`https://decora-back.vercel.app/users/${userId}`)
        .then(response => {
          setUserData(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Erro ao obter dados do usuário:', error);
        });
    }
  }, [userId]);

  return (
    <div className='form'>
      <div className='formGroup'>
        <label htmlFor='nome'>Nome:</label>
        <input type='text' id='nome' value={userData.nome} readOnly />

        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' value={userData.email} readOnly />

        <label htmlFor='dataNascimento'>Data de Nascimento:</label>
        <input type='text' id='dataNascimento' value={userData.dataNascimento} readOnly />

        <label htmlFor='atuacao'>Atuação:</label>
        <input type='text' id='atuacao' value={userData.atuacao} readOnly />

        <label htmlFor='escolaridade'>Escolaridade:</label>
        <input type='text' id='escolaridade' value={userData.escolaridade} readOnly />

        <label htmlFor='typeUser'>Tipo de Usuário:</label>
        <input
          type='text'
          id='typeUser'
          value={userData.typeUser ? userData.typeUser.charAt(0).toUpperCase() + userData.typeUser.slice(1) : ''}
          readOnly
        />

        <label htmlFor='codigoTurma'>Código de Turma:</label>
        <input type='text' id='codigoTurma' value={userData.codigoTurma} readOnly />
      </div>
    </div>
  );
};

export default FormUserProfile;
