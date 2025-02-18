import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('Login');
        e.preventDefault();
        try {
            console.log(email, password);
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            console.log(response);
            if(response.ok) {
                const data = await response.json();
                console.log(data);
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='container'>
            <h2 style={{textAlign: 'center'}}>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    )
}

export default Login;
