import { useEffect, useState } from "react"
import api from "../../services/api";
import { Link } from "react-router-dom";
import './index.css'

// /movie/now_playing?api_key=28fc232cc001c31e8a031f419d0a14ca&language=pt-BR
export default function Home(){

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadMovies(){

            const res = await api.get('/movie/now_playing', {
                params: {
                    api_key: '28fc232cc001c31e8a031f419d0a14ca',
                    language:'pt-BR',
                    page: 1
                }
            })

            setMovies(res.data.results.slice(0,10));
        }

        loadMovies();
        setLoading(false);
    }, [])

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="movie-list">
                {movies.map( movie => {
                    return(
                         <article key={movie.id}>
                            <strong>{movie.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt = {movie.title}/>
                            <Link to={`/movie/${movie.id}`}>Acessar</Link>
                         </article>       
                    )
                })}
            </div>
        </div>
    )
}