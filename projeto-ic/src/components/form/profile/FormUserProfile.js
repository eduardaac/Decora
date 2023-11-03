import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import '../Form.css';

const FormUserProfile = () => {
  const { userId } = useParams();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://decora-back.vercel.app/users/${userId}`)
        .then((response) => {
          setUserData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Erro ao obter dados do usuário:', error);
        });
    }
  }, [userId]);

  function formatDataNascimento(dataNascimento) {
    if (!dataNascimento) return '';

    const date = new Date(dataNascimento);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <div className='form'>
      <div className='formGroup'>
        <label>Nome:</label>
        <input type='text' id='nome' value={userData.nome} readOnly />

        <label>Email:</label>
        <input type='email' id='email' value={userData.email} readOnly />

        <label>Data de Nascimento:</label>
        <input
          type='text'
          id='dataNascimento'
          value={formatDataNascimento(userData.dataNascimento)}
          readOnly
        />

        <label>Atuação:</label>
        <input type='text' id='atuacao' value={userData.atuacao} readOnly />

        <label>Escolaridade:</label>
        <input type='text' id='escolaridade' value={userData.escolaridade} readOnly />

        <label>Tipo de Usuário:</label>
        <input
          type='text'
          id='typeUser'
          value={userData.typeUser ? userData.typeUser.charAt(0).toUpperCase() + userData.typeUser.slice(1) : ''}
          readOnly
        />

        <label>Código de Turma:</label>
        <input type='text' id='codigoTurma' value={userData.codigoTurma} readOnly />
      </div>
    </div>
  );
};

export default FormUserProfile;
