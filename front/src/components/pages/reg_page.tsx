import '../../styles/auth_page.scss'
import ThemeButton from "../components/theme_button.tsx";
import axios from 'axios'
import {Link} from "react-router-dom";
import {useRef, useState} from "react";

import api_path from '../../api_path.json'

export default function RegisterPage() {
    const [regData, setRegData] = useState<object>({login: "", email: "", password: ""});
    const password1 = useRef();
    const password2 = useRef();
    const handleRegChange = (e) => {
        setRegData({...regData, [e.target.name]: e.target.value});
    }

    const comparePassword = () => {
        if(password1.current.value === password2.current.value) {
            return true
        }
        alert('Passwords do not match')
        return false;
    }

    const handleRegister = async () => {
        try{
            if(regData.login !== '' && regData.email !== '' && regData.password !== '' && comparePassword()){
                const response = await axios.post((api_path.api_path + 'api/registration'), regData)
                if(response.status === 200){
                    alert(response.data.message)
                    localStorage.setItem('token', response.data.token)
                    location.href="/login"
                }
            }
        }catch(err){
            if(err.response.status === 400){
                alert(err.response.data.message)
            }
        }
    }

    return(
        <div className='login_page'>
            <h1>Registration to TaskMaster</h1>
            <div className="loginField">
                <div className='inputField'>
                    <p>Username</p>
                    <input type="text" name='login' onChange={handleRegChange}/>
                </div>
                <div className='inputField'>
                    <p>E-mail</p>
                    <input type="text" name='email'  onChange={handleRegChange}/>
                </div>
                <div className='inputField'>
                    <div>
                        <p>Password</p>
                    </div>
                    <input type="text" name='password' ref={password1} onChange={handleRegChange}/>
                </div>
                <div className='inputField'>
                    <div>
                        <p>Repeat password</p>
                    </div>
                    <input type="text" name='password' ref={password2} onChange={handleRegChange}/>
                </div>
                <div className='regButton' onClick={handleRegister}>
                    <p>Sign in</p>
                </div>
                <Link to='/login'>Have Account? Log in now</Link>
            </div>
            <ThemeButton/>
        </div>
    )
}