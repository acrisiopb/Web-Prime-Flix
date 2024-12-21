import { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import api from '../../services/api'


import {toast} from 'react-toastify';

import '../Home/home.css';
import './filme-info.css'

function Filme() {

    const { id } = useParams();
    const navigate = useNavigate();
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
                    navigate("/",{ replace:true});
                    return;
                })
        }

        loadFilme();


        return () => {
            console.log("COMPONENTE FOI DESMONTADO")
        }
    }, [navigate, id])
    
    function salvarFilme (){
        
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];
          
        const hasFime = filmesSalvos.some( (filmesSalvo)=> filmesSalvo.id === filme.id)
        if(hasFime){
            toast.warn("Este filme já está na sua lista!")
            // alert("ESSE FILME JÁ ESTA SALVO NA LISTA");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        // alert("FILME SALVO COM SUCESSO!");
        toast.success("Filme salvo com sucesso!");

    }


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
           
            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='black' rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;