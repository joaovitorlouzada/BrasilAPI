import React from "react";
import { Link, Routes, Route, useLocation, useParams } from "react-router-dom";
import BrokerCatalog from "./components/BrokerCatalog";
import ZipCodeSearcher from "./components/ZipCodeSearcher";
import "./App.css";

// Wrapper para a rota /cep/:cep (Option 1)
function ZipCodeRouteWrapper() {
  const { cep } = useParams();
  return <ZipCodeSearcher isRouteMode={true} routeCep={cep} />;
}

function App() {
  const location = useLocation();

  // Botão ativo baseado APENAS na URL
  const isCepRoute = location.pathname.startsWith("/cep");

  return (
    <div className="App">
      {/* HERO FIXO PARA TODAS AS ROTAS */}
      <section className="hero" id="inicio">
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">Projeto Brasil API</h1>
            <p className="hero-subtitle">
              Um projeto utilizando a Brasil API para exibir informações
            </p>
          </div>

          <div className="hero-media">
            <img
              src="/BrasilAPI-logo.png"
              alt="Imagem de fundo Brasil"
              className="hero-image"
            />
          </div>

          <div className="hero-content-button">
            <Link to="/">
              <button className={!isCepRoute ? "active" : ""}>
                Catálogo de Corretoras
              </button>
            </Link>

            <Link to="/cep">
              <button className={isCepRoute ? "active" : ""}>
                Buscador de CEP
              </button>
            </Link>
          </div>
        </div>

        {/* Wave permanece igual, o CSS controla o efeito visual */}
        <div className="hero-wave"></div>
      </section>

      {/* CONTEÚDO VARIÁVEL CONTROLADO SÓ PELO ROUTER */}
      <div className="main-content-wrapper">
        <hr />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<BrokerCatalog />} />
            {/* Option 2 – CEP via input */}
            <Route
              path="/cep"
              element={<ZipCodeSearcher isRouteMode={false} routeCep={null} />}
            />
            {/* Option 1 – CEP via parâmetro de rota */}
            <Route path="/cep/:cep" element={<ZipCodeRouteWrapper />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
