import { useState, useEffect } from "react";
import api from "../../services/api";
function Home() {
    // Declara um estado chamado `filmes` para armazenar os dados recebidos da API.
    // `setFilmes` é a função usada para atualizar o estado.
    const [filmes, setFilmes] = useState([]);

    // `useEffect` é usado para carregar os filmes da API assim que o componente for montado.
    useEffect(() => {
        // Função assíncrona para buscar os dados da API.
        async function loadFilmes() {
            // Faz uma requisição GET para a rota "movie/now_playing" da API configurada.
            const response = await api.get("movie/now_playing", {
                params: {
                    // Chave de acesso da API (substituir pela própria chave para funcionamento).
                    api_key: "0a9a35c83a2f677a6d71cdc89de7f87e",
                    // Define o idioma como português do Brasil.
                    language: "pt-BR",
                    // Define a página de resultados como a primeira.
                    page: 1,
                },
            });

            // Exibe os resultados recebidos da API no console do navegador.
            console.log(response.data.results);

            // Atualiza o estado `filmes` com os dados recebidos da API.
            setFilmes(response.data.results);
        }

        // Chama a função que carrega os filmes.
        loadFilmes();

        // A dependência vazia `[]` garante que o `useEffect` seja executado apenas uma vez,
        // quando o componente for montado.
    }, []);

    return (
        <div>
            <h1>PAGINA - HOME</h1>
        </div>
    )
}

export default Home;