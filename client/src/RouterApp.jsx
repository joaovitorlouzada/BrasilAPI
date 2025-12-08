import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import ZipCodeSearcher from './components/ZipCodeSearcher';

// Componente Wrapper para lidar com a rota Option 1
const CepRouteWrapper = () => {
    // Renderiza o ZipCodeSearcher com o parâmetro de rota
    return <ZipCodeSearcher isRouteMode={true} />; 
};

function RouterApp() {
    return (
        <Routes>
            <Route path="/" element={<App />} /> 
            <Route path="/cep/:cepParam" element={<CepRouteWrapper />} />
            <Route path="/cep" element={<App initialView="cep" />} /> 
            <Route path="*" element={
                <div style={{ padding: '50px', textAlign: 'center' }}>
                    <h2>404 - Página não encontrada.</h2>
                    <p>Use os botões no topo para navegar.</p>
                </div>
            } />
        </Routes>
    );
}

export default RouterApp;