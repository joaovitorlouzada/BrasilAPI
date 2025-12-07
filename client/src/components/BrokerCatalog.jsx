import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; 

// URLs dos endpoints do Node-RED
const NODE_RED_URL = 'http://localhost:1880'; 
const ENDPOINT = `${NODE_RED_URL}/corretoras`; 

function BrokerCatalog() {
    const [brokers, setBrokers] = useState([]); 
    const [searchString, setSearchString] = useState(''); 
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const totalLoaded = brokers.length;

    const extractBrokerArray = (data) => {
        if (data && Array.isArray(data.payload)) {
            return data.payload;
        }
        if (Array.isArray(data)) {
            return data;
        }
        return [];
    };

    useEffect(() => {
        axios.get(ENDPOINT)
            .then(response => {
                const data = extractBrokerArray(response.data); 
                if (data.length > 0) {
                    setBrokers(data);
                    setError(null);
                } else {
                    console.warn('Resposta do catálogo vazia ou inesperada.');
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro de comunicação no fetch:", err);
                setError('Falha ao conectar ao Node-RED.');
                setLoading(false);
            });
    }, []);

    const brokersParaExibir = useMemo(() => {
        const termoBusca = searchString.toLowerCase().trim();

        if (!termoBusca) {
            return brokers; 
        }

        if (brokers.length === 0) {
            return [];
        }

        return brokers.filter(itemString => {
            const normalizedString = itemString.toLowerCase();
            return normalizedString.includes(termoBusca);
        });
        
    }, [searchString, brokers]);

    return (
        <div className="broker-catalog">
            <h2>Catálogo de Corretoras</h2>
            {loading && totalLoaded === 0 && <p>Carregando lista de corretoras...</p>}
            {error && <p className="error">Erro: {error}</p>}
            
            {!error && (
                <>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Buscar por nome, cidade, CNPJ, etc."
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                        <button className="search-button" aria-label="Pesquisar">
                            <FaSearch />
                        </button>
                    </div>

                    <p>
                        Corretoras carregadas: <strong>{totalLoaded}</strong> |
                        Corretoras exibidas: <strong>{brokersParaExibir.length}</strong>
                    </p>
                    
                    {searchString.trim() && brokersParaExibir.length === 0 && !loading && (
                        <p className="error" style={{ border: 'none', backgroundColor: 'transparent' }}>Nenhum resultado encontrado para "{searchString}".</p>
                    )}

                    <div className="broker-list"> 
                        {brokersParaExibir.map((item, index) => (
                            <div className="broker-item" key={index}>
                                {item}
                            </div> 
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default BrokerCatalog;
