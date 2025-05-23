import { Link } from 'react-router-dom';
import '../styles/Header.css'; 

const Header = () => (
  <header>
    <nav>
      <Link to="/login">Entrar</Link>
      <Link to="/register">Cadastrar</Link>
    </nav>
  </header>
);

export default Header;