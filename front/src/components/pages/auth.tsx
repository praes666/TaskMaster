import '../../styles/auth_page.scss';
import ThemeButton from '../components/theme_button.tsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import api_path from '../../api_path.json';

export default function LoginPage() {
    interface LoginData {
        login: string;
        password: string;
    }

    const [loginData, setLoginData] = useState<LoginData>({ login: '', password: '' });

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        if (!loginData.login || !loginData.password) {
            alert('All fields are required');
            return;
        }

        try {
            const response = await axios.post(api_path.api_path + 'api/login', loginData);

            if (response.status === 200) {
                alert('Login successful!');
                localStorage.setItem('token', response.data.token);
                window.location.href = '/todo'; // Перенаправляем пользователя
            }
        } catch (err: any) {
            if (err.response && err.response.status === 400) {
                alert(err.response.data.message);
            } else {
                alert('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className='login_page'>
            <h1>Login to TaskMaster</h1>
            <div className='loginField'>
                <div className='inputField'>
                    <p>Username or Email</p>
                    <input type='text' name='login' onChange={handleLoginChange} />
                </div>
                <div className='inputField'>
                    <p>Password</p>
                    <input type='password' name='password' onChange={handleLoginChange} />
                </div>
                <div className='regButton' onClick={handleLogin}>
                    <p>Login</p>
                </div>
                <Link to='/reg'>Don't have an account? Sign up now</Link>
            </div>
            <ThemeButton />
        </div>
    );
}
