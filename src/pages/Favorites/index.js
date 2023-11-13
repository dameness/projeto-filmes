import { useEffect, useState } from 'react'
import './index.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Favorites(){

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const myList = localStorage.getItem("@flix");
        setMovies(JSON.parse(myList) || []);

    }, [])

    function handleDelete(id){
        let filterMovies = movies.filter((item) => {
            return(item.id !== id)
        })

        setMovies(filterMovies);
        localStorage.setItem("@flix", JSON.stringify(filterMovies));
        toast.success("Filme removido com sucesso")
    }

    return(
        <div className='my-movies'>
            <h1>Meus filmes</h1>

            {
                movies.length === 0 && <span>Você não tem filmes salvos!</span>
            }
            <ul>
                {movies.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/movie/${item.id}`}>
                                    Ver detalhes
                                </Link>
                                <button onClick={() => handleDelete(item.id)}>
                                    Excluir
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}