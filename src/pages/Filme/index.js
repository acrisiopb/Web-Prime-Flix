// Importa os hooks 'useEffect' e 'useState' do React para manipular o estado e os efeitos do componente
import { useEffect, useState } from "react";

// Importa os hooks 'useParams' e 'useNavigate' do React Router para obter parâmetros da URL e redirecionar o usuário
import { useParams, useNavigate } from "react-router-dom";

// Importa a instância do Axios configurada para realizar chamadas à API
import api from '../../services/api';

// Importa a biblioteca 'react-toastify' para exibir notificações toast
import { toast } from 'react-toastify';

// Importa os arquivos de estilo CSS específicos para o componente
import '../Home/home.css';
import './filme-info.css';

// Define o componente funcional Filme
function Filme() {
    // Obtém o ID do filme a partir dos parâmetros da URL
    const { id } = useParams();

    // Hook para redirecionar o usuário para outra rota
    const navigate = useNavigate();

    // Declara o estado 'filme' para armazenar os dados do filme retornados pela API
    const [filme, setFilme] = useState({});

    // Declara o estado 'loading' para indicar se os dados ainda estão sendo carregados
    const [loading, setLoading] = useState(true);

    // Hook useEffect executado quando o componente é montado ou quando 'id' ou 'navigate' mudam
    useEffect(() => {
        // Função assíncrona para carregar os dados do filme da API
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "0a9a35c83a2f677a6d71cdc89de7f87e", // Chave da API
                    language: "pt-BR", // Idioma das informações retornadas
                }
            })
                .then((response) => {
                    // Atualiza o estado com os dados do filme e desativa o estado de carregamento
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    // Trata o caso de erro, redirecionando para a página inicial
                    console.log("FILME NÃO ENCONTRADO");
                    navigate("/", { replace: true }); // Substitui a rota atual
                    return;
                });
        }

        // Chama a função para carregar os dados do filme
        loadFilme();

        // Retorno executado na desmontagem do componente
        return () => {
            console.log("COMPONENTE FOI DESMONTADO");
        };
    }, [navigate, id]); // Array de dependências

    // Função para salvar o filme no localStorage
    function salvarFilme() {
        // Obtém a lista de filmes salvos no localStorage
        const minhaLista = localStorage.getItem("@primeflix");

        // Converte a lista para JSON ou inicializa com um array vazio
        let filmesSalvos = JSON.parse(minhaLista) || [];

        // Verifica se o filme já está salvo na lista
        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);
        if (hasFilme) {
            // Exibe uma notificação caso o filme já esteja salvo
            toast.warn("Este filme já está na sua lista!");
            return;
        }

        // Adiciona o filme à lista e atualiza o localStorage
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));

        // Exibe uma notificação de sucesso
        toast.success("Filme salvo com sucesso!");
    }

    // Exibe uma tela de carregamento enquanto os dados do filme não são carregados
    if (loading) {
        return (
            <div className="loading">
                {/* Imagem de carregamento */}
                <img src={'https://cdn.dribbble.com/users/4241225/screenshots/14521747/loading_gif_1_1.gif'} alt={'Carregando..'} />
            </div>
        );
    }

    // Renderiza os dados do filme
    return (
        <div className="filme-info">
            {/* Título do filme */}
            <h1>{filme.title}</h1>

            {/* Imagem de fundo do filme */}
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            {/* Sinopse do filme */}
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            {/* Avaliação do filme */}
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            {/* Botões para salvar o filme ou assistir ao trailer */}
            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='black' rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

// Exporta o componente Filme para uso em outros arquivos
export default Filme;
