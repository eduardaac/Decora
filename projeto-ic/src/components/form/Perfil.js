import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Perfil = ({ userId }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Faça uma chamada à API para obter os dados do usuário com base no ID
    axios.get(`http://localhost:3333/users/${userId}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter dados do usuário:', error);
      });
  }, [userId]);

  return (
    <div>
      <h2>Perfil do Usuário</h2>
      <p><strong>Nome:</strong> {userData.nome}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Data de Nascimento:</strong> {userData.dataNascimento}</p>
      <p><strong>Atuação:</strong> {userData.atuacao}</p>
      <p><strong>Escolaridade:</strong> {userData.escolaridade}</p>
      <p><strong>Tipo de Usuário:</strong> {userData.typeUser}</p>
      <p><strong>Código de Turma:</strong> {userData.codigoTurma}</p>
    </div>
  );
};

export default Perfil;
