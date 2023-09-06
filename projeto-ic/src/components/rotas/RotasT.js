import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import LoginComplementar from '../pages/login/LoginComplementar';
import Cadastro from '../pages/cadastro/Cadastro';
import CadastroDP from '../pages/cadastro/CadastroDP';
import CadastroAD from '../pages/cadastro/CadastroAD';
import IniciarRecomendacoes from '../pages/formulario/IniciarRecomendacoes'
import SistRecAluno from '../pages/formulario/SistRecAluno';
import SistRecProfessor from '../pages/formulario/SistRecProfessor';
import SistEdit from '../pages/formulario/SistEdit';
import SistemaEdition from '../form/SistemaEdition';
import Perfil from '../form/Perfil';

function RoutasT() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/LoginComplementar' element={<LoginComplementar />} />
        <Route exact path='/Cadastro1' element={<Cadastro />} />
        <Route exact path='/Cadastro2' element={<CadastroDP />} />
        <Route exact path='/Cadastro3' element={<CadastroAD />} />
        <Route exact path='/iniciar-sistema-recomendacoes' element={<IniciarRecomendacoes />} />
        <Route exact path='/sistema-recomendacoes-a' element={<SistRecAluno />} />
        <Route exact path='/sistema-recomendacoes-p' element={<SistRecProfessor />} />
        <Route path="/perfil/:userId" element={<Perfil />} />
        <Route path="/edition/:codigoTurma" component={<SistemaEdition/>} />
      </Routes>
    </Router>
  )
}

export default RoutasT;