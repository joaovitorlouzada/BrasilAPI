<p align="center">
  <img width="280" height="280" alt="Brasil-background" src="https://github.com/user-attachments/assets/4a1319fd-e12e-46e6-bffa-d96aec83f30f" />
</p>

# 🇧🇷 Projeto Brasil API

Aplicação full-stack construída para consulta de **corretoras** e **busca de CEP**, consumindo **endpoints expostos pelo Node-RED rodando localmente na porta 1880**.

O projeto é composto por:

- **Front-end** ⚛️ *React (Vite)*
- **Back-end** 🔴🟠 *Node-RED* (fluxos exportados como API local)

---

## 🚀 Tecnologias Utilizadas

### **Front-end**
⚛️ **React**  
⚡ **Vite**  
🎨 **CSS3** (Flexbox/Grid)  
🔎 **Axios** para chamada de APIs  
📱 Layout **responsivo**

O front-end faz requisições **diretamente para o Node-RED**, que serve como intermediário entre o cliente e a BrasilAPI.  
**Todos os endpoints chamados pelo React vêm de `http://localhost:1880`**, são eles:

GET http://localhost:1880/corretoras

GET http://localhost:1880/cep/:cep

### **Back-end**
🔴🟠 **Node-RED**  
📦 Criação de endpoints HTTP internos  
📤 Fluxos exportados via JSON (`/backend/flows.json`)  

O Node-RED funciona como **API Gateway local**, recebendo requisições do front-end e repassando-as à BrasilAPI.

## 💡 Funcionalidades Implementadas

### ✔️ Catálogo de Corretoras

- Consome o endpoint público da BrasilAPI `/cvm/corretoras/v1`
- Exibe no formato: Nome - Cidade / CNPJ
- Interface com cards
- Inclui **barra de pesquisa** com *substring match*, permitindo filtrar por:
  - Nome da corretora  
  - Cidade  
  - CNPJ  
  - Trechos parciais do texto  

Implementado diretamente no React para busca instantânea.

### ✔️ Buscador de CEP (V2)

- Permite buscar qualquer CEP usando o endpoint `/cep/v2/{cep}`
- Exibe:
- Estado  
- Cidade  
- Bairro  
- Logradouro  
- Inclui visualização em mapa (Google Maps iframe)

### ▶️ Como rodar o projeto

#### Pré-requisitos

Node.js instalado

npm instalado

Node-RED instalado globalmente

Clone o repositorio

Depois de clonar o repositório, rode o Node-red e o acesse no navagador na porta 1880(porta default) http://localhost:1880

No navegador, importe os fluxos clicando no menu hambúrguer no canto superior direito e depois clicando na opção importar 

<img width="238" height="431" alt="image" src="https://github.com/user-attachments/assets/a2425589-5037-482e-9b26-dba19f23071e" />

Depois de ter importado os fluxos, faça o deploy no botão no canto superior direito.  <img width="136" height="29" alt="image" src="https://github.com/user-attachments/assets/6a411196-ef82-41ef-b932-19befb8d8ea6" />

Os endpoints estarão disponíveis em:

http://localhost:1880/corretoras
http://localhost:1880/cep/:cep

#### Agora para rodar o front-end: 

no Terminal do VsCode:

- cd client
- npm install
- npm run dev


Certifique-se de que o Node-RED esteja rodando em http://localhost:1880 antes de usar a aplicação, pois o front-end depende dos endpoints expostos por ele.


