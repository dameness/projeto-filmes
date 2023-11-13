import './styles.css'
import { Link } from 'react-router-dom'

export default function Header(){
    return(
        <header>
            <Link to='/' className='logo'>
                <span>F</span>l<span>i</span>x
            </Link>
            <Link to='/favorites' className='favorites'>
                Meus Filmes
            </Link>
        </header>
    )
}