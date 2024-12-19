import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../../services/api'
import '../Home/home.css';

function Filme() {

    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "0a9a35c83a2f677a6d71cdc89de7f87e",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    //    console.log(response.data);
                    setFilme(response.data)
                    setLoading(false);
                })
                .catch(() => {
                    console.log("FILME NAO ENCONTRADO");
                })
        }

        loadFilme();


        return () => {
            console.log("COMPONENTE FOI DESMONTADO")
        }
    }, [])

    if (loading) {
        return (
            <div className="loading">
                <img src={'https://cdn.dribbble.com/users/4241225/screenshots/14521747/loading_gif_1_1.gif'} alt={'Carregando..'} />
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopese</h3>
            <span>{filme.overview}</span>
            <strong>Avalição: {filme.vote_average} / 10</strong>

            
        </div>
    )
}

export default Filme;