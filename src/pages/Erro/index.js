import './erro.css';
import { Link } from 'react-router-dom';
function Erro(){
    return(
        <div className="ERROR">
             <h1>404 </h1>
            <br/>
            <h3>Not Found</h3>
            <br/>
            <p>It looks like this page doesn't exist! </p>
            <Link to="/">Veja todos os filmes!</Link>
        </div>
    )
}

export default Erro;