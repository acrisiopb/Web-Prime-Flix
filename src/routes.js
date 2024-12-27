// Importa os componentes necessários do react-router-dom para configurar o roteamento
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa os componentes que serão renderizados em cada rota
import Home from './pages/Home';       // Página inicial
import Filme from './pages/Filme';     // Página de detalhes de um filme
import Header from "./components/Header"; // Componente de cabeçalho (renderizado em todas as rotas)
import Erro from "./pages/Erro";       // Página de erro para rotas inexistentes
import Favoritos from "./pages/Favoritos"; // Página de filmes favoritos

// Função principal que configura o sistema de rotas da aplicação
function RoutesApp() {
    return (
        // Envolve toda a aplicação com o componente BrowserRouter, que fornece o contexto de roteamento
        <BrowserRouter>
            {/* O componente Header é renderizado antes das rotas, aparecendo em todas as páginas */}
            <Header />

            {/* Define as rotas utilizando o componente Routes */}
            <Routes>
                {/* Define a rota para a página inicial, renderizando o componente Home */}
                <Route path='/' element={<Home />} />

                {/* Define a rota dinâmica para os detalhes de um filme, utilizando um parâmetro :id */}
                <Route path='/filme/:id' element={<Filme />} />

                {/* Define a rota para a página de filmes favoritos */}
                <Route path='/favoritos' element={<Favoritos />} />

                {/* Define uma rota coringa (*) para capturar caminhos não definidos, renderizando o componente Erro */}
                <Route path='*' element={<Erro />} />
            </Routes>
        </BrowserRouter>
    );
}

// Exporta o componente para ser utilizado no arquivo principal da aplicação
export default RoutesApp;
