import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = "http://localhost:3333";

function UserProfile() {
    const location = useLocation();
    const { userId } = location.state;
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Obtenha informações do usuário com base no userId
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Erro ao obter informações do usuário:', error);
            }
        };

        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

    return (
        <div>
            <h1>Perfil do Usuário</h1>
            {user && (
                <div>
                    <p>Nome: {user.nome}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
