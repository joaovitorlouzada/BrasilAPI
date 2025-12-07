import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ZipCodeSearcher() {
  const [cepInput, setCepInput] = useState('');
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  const NODE_RED_URL = 'http://localhost:1880'; 

  useEffect(() => {
    if (address) {
      const timer = setTimeout(() => {
        setMapReady(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setMapReady(false);
    }
  }, [address]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAddress(null);
    setMapReady(false);

    const cepLimpo = cepInput.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      setError("O CEP deve conter 8 dígitos.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${NODE_RED_URL}/cep?cep=${cepLimpo}`);
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setAddress(response.data);
        setError(null);
      }
    } catch (err) {
      setError('Falha na comunicação com o servidor Node-RED.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="zip-code-searcher">
      <div className="search-container">
        <h1>Buscador de CEP</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={cepInput}
            onChange={(e) => setCepInput(e.target.value)}
            placeholder="Digite o CEP"
            maxLength="9"
          />
          <button type="submit" disabled={loading || cepInput.length === 0}>
            {loading ? 'Buscando...' : 'Buscar CEP'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}

        {address && (
          <div className="address-info">
            <h3>Resultado para {address.cep}</h3>
            <p><strong>Estado:</strong> {address.estado}</p>
            <p><strong>Cidade:</strong> {address.cidade}</p>
            <p><strong>Bairro:</strong> {address.bairro}</p>
            <p><strong>Logradouro:</strong> {address.logradouro}</p>

            <div className="map-container">
              {!mapReady && <p>Carregando mapa...</p>}
              {mapReady && (
                <iframe
                  width="100%"
                  height="300"
                  style={{ border: '0' }}
                  src={`https://maps.google.com/?q=${encodeURIComponent(`${address.logradouro}, ${address.bairro}, ${address.cidade}, ${address.estado}`)}&output=embed`}
                  title="Localização no Google Maps"
                ></iframe>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ZipCodeSearcher;
