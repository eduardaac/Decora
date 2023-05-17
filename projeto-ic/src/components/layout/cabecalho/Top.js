import React from 'react';
import styles from './Top.module.css';
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

function Top({ rota, title }) {
  return (

    <div className={styles.topo}>
      <Link to={rota} className={styles.icons}><BsArrowLeftSquareFill /></Link>
      <h2>{title}</h2>
    </div>

  )
}
export default Top;