import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, bio, email, password }),
            });
            if(response.ok) {
                navigate('/login');
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className='container'>
            <h2 style={{textAlign: 'center'}}>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder='Bio' value={bio} onChange={(e) => setBio(e.target.value)} />
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register;
