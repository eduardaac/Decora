import React from 'react';
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

function Navigation({ rota, title }) {
  return (

    <div className={styles.topo}>
      <Link to={rota} className={styles.icons}><BsArrowLeftSquareFill /></Link>
      <h2>{title}</h2>
    </div>

  )
}
export default Navigation;