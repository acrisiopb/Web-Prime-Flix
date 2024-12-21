import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import { GoX } from "react-icons/go";
function Favoritos(){
    const [filmes, setFilmes] = useState([]);
    
    useEffect(()=>{
        const minhaLsta = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLsta) || []);

    },[]);

    function excluirFilme (id){
       let filtroFilmes = filmes.filter((filme)=>{
        return(filme.id !== id);
       })

       setFilmes(filtroFilmes);
       toast.success("Filme excluido da sua lista");
       localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
    }

    return(
     <div className="meus-filmes">
        <h1>Meus Filmes</h1>
        {filmes.length === 0 && <span>Você não possui nenhum filme salvo</span>}
        <ul className='molder'>
            {filmes.map((filme) =>{
             return(
                <li key={filme.id}>
                    <span>{filme.title}</span>
                    <div>
                     <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                     <button onClick={() => excluirFilme(filme.id)}> 
                     <GoX size={20} color='red' className='gox' />
                     </button>
                    </div>
                </li>
             )
            })}
        </ul>
     </div>
    );
}

export default Favoritos;