import '../../styles/auth_page.scss'
import ThemeButton from "../components/theme_button.tsx";
import {Link} from "react-router-dom";

export default function Auth(){

    return(
        <div className="login_page">
            <h1>Login to TaskMaster</h1>
            <div className="loginField">
                <div className='inputField'>
                    <p>Username</p>
                    <input type="text" name='name' />
                </div>
                <div className='inputField'>
                    <div>
                        <p>Password</p>
                        <a href=""><p>Forgot?</p></a>
                    </div>
                    <input type="text" name='password' />
                </div>
                <div className='regButton'>
                    <p>Log in</p>
                </div>
                <Link to='/reg'>First time? Register now</Link>
            </div>
            <ThemeButton/>
        </div>
    )
}