import '../../styles/auth_page.scss'
import ThemeButton from "../components/theme_button.tsx";
import {useState} from "react";

export default function Auth(){
    const [loginView, setLoginView] = useState<boolean>(true);

    return(
        <div style={{height:'100%'}}>
            {
                loginView ?
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
                            <p style={{cursor: 'pointer'}} onClick={() => {setLoginView(false)}}>First time? Register now</p>
                        </div>
                        <ThemeButton/>
                    </div>
                :
                    <div className='login_page'>
                        <h1>Registration to TaskMaster</h1>
                        <div className="loginField">
                            <div className='inputField'>
                                <p>Username</p>
                                <input type="text" name='name' />
                            </div>
                            <div className='inputField'>
                                <p>E-mail</p>
                                <input type="text" name='email' />
                            </div>
                            <div className='inputField'>
                                <div>
                                    <p>Password</p>
                                </div>
                                <input type="text" name='password' />
                            </div>
                            <div className='inputField'>
                                <div>
                                    <p>Repeat password</p>
                                </div>
                                <input type="text" name='password' />
                            </div>
                            <div className='regButton'>
                                <p>Sign in</p>
                            </div>
                            <p style={{cursor: 'pointer'}} onClick={() => {setLoginView(true)}}>First time? Register now</p>
                        </div>
                        <ThemeButton/>
                    </div>
            }
        </div>
    )
}