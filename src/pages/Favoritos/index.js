// Importa os hooks 'useEffect' e 'useState' do React para manipular o estado e os efeitos do componente
import { useEffect, useState } from 'react';

// Importa o arquivo de estilo CSS específico para o componente
import './favoritos.css';

// Importa o componente 'Link' do React Router para navegação entre páginas
import { Link } from 'react-router-dom';

// Importa a biblioteca 'react-toastify' para exibir notificações toast
import { toast } from 'react-toastify';

// Importa o ícone 'GoX' da biblioteca 'react-icons' para representar o botão de excluir
import { AiFillStop } from "react-icons/ai";
// Define o componente funcional Favoritos
function Favoritos() {
    // Declara um estado 'filmes' que armazena a lista de filmes favoritos do usuário
    const [filmes, setFilmes] = useState([]);

    // Hook useEffect que será executado apenas na montagem do componente (array de dependências vazio)
    useEffect(() => {
        // Obtém a lista de filmes salva no localStorage
        const minhaLista = localStorage.getItem("@primeflix");
        // Atualiza o estado com os filmes salvos ou com um array vazio se não houver filmes
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    // Função para excluir um filme da lista
    function excluirFilme(id) {
        // Filtra a lista de filmes, removendo o filme cujo ID foi passado como argumento
        let filtroFilmes = filmes.filter((filme) => {
            return (filme.id !== id);
        });

        // Atualiza o estado com a lista filtrada
        setFilmes(filtroFilmes);

        // Exibe uma notificação de sucesso
        toast.success("Filme excluído da sua lista");

        // Atualiza o localStorage com a lista atualizada
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
    }

    // Renderiza o componente
    return (
        <div className="meus-filmes">
            {/* Título da página */}
            <h1>Meus Favoritos</h1>

            {/* Exibe uma mensagem caso a lista de filmes esteja vazia */}
            {filmes.length === 0 && <span>Você não possui nenhum filme salvo</span>}

            {/* Lista de filmes salvos */}
            <ul className='molder'>
                {filmes.map((filme) => {
                    return (
                        <li key={filme.id}>
                            {/* Nome do filme */}
                            <img className='img' src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
                            <span>{filme.title}</span>
                            <div className='detalhes'>
                                {/* Link para ver os detalhes do filme */}
                                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>

                            </div>
                            {/* Botão para excluir o filme da lista */}
                            <button className='button' onClick={() => excluirFilme(filme.id)}>
                                {/* Ícone de exclusão */}
                               <AiFillStop  color='white' size="20" />
                            </button>
                        </li>

                    );
                })}
            </ul>
        </div>
    );
}

// Exporta o componente Favoritos para uso em outros arquivos
export default Favoritos;
