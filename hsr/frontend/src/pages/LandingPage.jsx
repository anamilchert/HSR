import React from 'react';
import '../styles/LandingPage.css';
import Header from '../components/header';
import Footer from '../components/footer';
import minhaImagem from '../assets/header-hsr.png';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div>
    <Header />
    <main>
      <div className="image-placeholder">
        <img src={minhaImagem}/>
      </div>
      <h2>Ferramenta de Geração de Contratos!</h2>
    </main>
    <Footer />
  </div>
);

export default LandingPage;