//Base da URL: https://api.themoviedb.org/3/
// URL da Api: /movie/now_playing?api_key=0a9a35c83a2f677a6d71cdc89de7f87e&language=pt-br

import axios from "axios";

// Cria uma instância do Axios com uma configuração inicial
const api = axios.create({
    // Define a URL base para todas as requisições feitas através desta instância
    baseURL: 'https://api.themoviedb.org/3/'
});

// Exporta a instância configurada do Axios para ser utilizada em outros arquivos do projeto
export default api;