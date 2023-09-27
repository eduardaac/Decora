import React from 'react';
import FormUserProfile from '../../components/form/profile/FormUserProfile';
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

import styles from './UserProfile.module.css';

function UserProfile() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <button onClick={handleGoBack} className={styles.icons}><BsArrowLeftSquareFill /></button>
                <h1>PERFIL</h1>
                <FormUserProfile />
            </div>
        </div>
    )
}

export default UserProfile;
