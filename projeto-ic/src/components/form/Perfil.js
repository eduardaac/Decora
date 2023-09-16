import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Perfil = () => {
  const { userId } = useParams();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3333/users/${userId}`)
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
      <div className='formE'>
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

        {userData.typeUser === 'professor' && (
          <div>
            <label htmlFor='totalAlunos'>Total de Alunos:</label>
            <input type='text' id='totalAlunos' value={userData.totalAlunos || 0} readOnly />

            <label htmlFor='nomesAlunos'>Nomes dos Alunos:</label>
            {userData.nomesAlunos && (
              <div>
                {userData.nomesAlunos.map((nome, index) => (
                  <input type='text' id={`aluno-${index}`} value={nome} readOnly key={index} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
