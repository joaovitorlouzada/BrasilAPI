import React, { useState } from "react";
import BrokerCatalog from "./components/BrokerCatalog";
import ZipCodeSearcher from "./components/ZipCodeSearcher";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState("brokers"); // Inicia com Corretoras

  const renderView = () => {
    switch (activeView) {
      case "brokers":
        return <BrokerCatalog />;
      case "cep":
        return <ZipCodeSearcher />;
      default:
        return <h2>Selecione uma opção acima.</h2>;
    }
  };

  return (
    <div className="App">
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
              src="BrasilAPI-logo.png"
              alt="Imagem de fundo Brasil"
              className="hero-image"
            />
          </div>
          <div className="hero-content-button">
            <button
              onClick={() => setActiveView("brokers")}
              className={activeView === "brokers" ? "active" : ""}
            >
              Catálogo de Corretoras
            </button>

            <button
              onClick={() => setActiveView("cep")}
              className={activeView === "cep" ? "active" : ""}
            >
              Buscador de CEP
            </button>
          </div>
        </div>
        <div className="hero-wave"></div> {/* Wave */}
      </section>

      <div className="main-content-wrapper">
        <hr />
        <div className="content-container">{renderView()}</div>
      </div>
    </div>
  );
}

export default App;
