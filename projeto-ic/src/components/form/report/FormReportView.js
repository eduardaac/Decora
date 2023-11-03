import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import '../Form.css'

const FormReportView = () => {
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

                <label>Código de Turma:</label>
                <input type='text' id='codigoTurma' value={userData.codigoTurma} readOnly />

                {userData.typeUser === 'professor' && (
                    <div>
                        <label>Total de Alunos:</label>
                        <input type='text' id='totalAlunos' value={userData.totalAlunos || 0} readOnly />

                        <label>Turma:</label>
                        {userData.emailAlunos && (
                            <div>
                                {userData.emailAlunos.map((nome, index) => (
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

export default FormReportView;
