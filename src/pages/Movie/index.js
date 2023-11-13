import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import api from '../../services/api'

import './index.css'
import { toast } from "react-toastify";

export default function Movie(){

    const {id} = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        async function loadMovie(){
            
            try {
                const res = await api.get(`/movie/${id}`, {
                    params : {
                        api_key: '28fc232cc001c31e8a031f419d0a14ca',
                        language:'pt-BR',
                    }
                })

                setMovie(res.data);
                setLoading(false);
                return;

            } catch(error) {
                console.error(error);
                navigate("/", {replace: true});
                return;
            }
        }

        loadMovie(); 
        
        return () => {
            console.log("componente desmontado");
        }

    }, [id, navigate])

    function saveMovie(){
        const userMovies = localStorage.getItem("@flix");
        
        //se tiver algo(nao undefined), coloca algo, se nao
        //recebe array vazia
        let savedMovies = JSON.parse(userMovies) || [];

        const hasMovie = savedMovies.some( savedMovie => 
            savedMovie.id === movie.id
        )

        if(hasMovie){
            toast.warn("Esse filme já está na sua lista!");
            return;
        }

        savedMovies.push(movie);
        localStorage.setItem("@flix", JSON.stringify(savedMovies));
        toast.success("Filme salvo!");
    }

    if(loading){
        return(
            <div className="movie-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }
    return(
        <div className="movie-info">
            <h1>{movie.title}</h1>
            <div className="image">
                <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt = {movie.title}/>
            </div>

            <h3>Sinopse</h3>
            <span>{movie.overview}</span>

            <strong>Avaliação: {movie.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={saveMovie}>
                    Salvar
                </button>
                <button>
                    <a target="blank"
                    rel="external"
                    href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}