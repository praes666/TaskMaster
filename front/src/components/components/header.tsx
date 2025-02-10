import { Link } from "react-router-dom"
import { IoIosLogIn } from "react-icons/io";
import ThemeButton from "./theme_button.tsx";
import '../../styles/header.scss'
export default function Header() {
    return(
        <header>
            <Link to='/about'>
                {/*<img src="https://i.pinimg.com/736x/53/51/c9/5351c955b93479fac6c20b35f44fe15b.jpg" alt=""/>*/}
                <h2>About</h2>
            </Link>
            <div className='middle'>
                <Link to='/todo'>
                    <h2>ToDo</h2>
                </Link>
                <Link to='/kanban'>
                    <h2>Kanban</h2>
                </Link>
            </div>
            <div className='right'>
                <ThemeButton/>
                <Link to='/login' className='login'>
                    <h3>Log in</h3>
                    <IoIosLogIn/>
                </Link>
            </div>
        </header>
    )
}