import '../../styles/auth_page.scss';
import ThemeButton from '../components/theme_button.tsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import api_path from '../../api_path.json';

export default function RegisterPage() {
    interface RegData {
        login: string;
        email: string;
        password: string;
    }

    const [regData, setRegData] = useState<RegData>({ login: '', email: '', password: '' });
    const [password2, setPassword2] = useState<string>('');

    const handleRegChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRegData({ ...regData, [e.target.name]: e.target.value });
    };

    const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword2(e.target.value);
    };

    const handleRegister = async () => {
        if (!regData.login || !regData.email || !regData.password || !password2) {
            alert('All fields are required');
            return;
        }

        if (regData.password !== password2) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(api_path.api_path + 'api/registration', regData);

            if (response.status === 200) {
                alert(response.data.message);
                localStorage.setItem('token', response.data.token);
                window.location.href = '/login';
            }
        } catch (err: any) {
            if (err.response && err.response.status === 400) {
                alert(err.response.data.message);
            } else {
                alert('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className='login_page'>
            <h1>Registration to TaskMaster</h1>
            <div className='loginField'>
                <div className='inputField'>
                    <p>Username</p>
                    <input type='text' name='login' onChange={handleRegChange} />
                </div>
                <div className='inputField'>
                    <p>E-mail</p>
                    <input type='email' name='email' onChange={handleRegChange} />
                </div>
                <div className='inputField'>
                    <p>Password</p>
                    <input type='password' name='password' onChange={handleRegChange} />
                </div>
                <div className='inputField'>
                    <p>Repeat password</p>
                    <input type='password' value={password2} onChange={handlePassword2Change} />
                </div>
                <div className='regButton' onClick={handleRegister}>
                    <p>Sign in</p>
                </div>
                <Link to='/login'>Have an account? Log in now</Link>
            </div>
            <ThemeButton />
        </div>
    );
}
