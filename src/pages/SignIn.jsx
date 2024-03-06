import React, { useState } from 'react';
import SignInBG from '../assets/SignInBG.png';
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/Logo.png';
import SignInImage from '../assets/SignInImage.png';
import axios from 'axios';

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

  // Validate email format
const validateEmailFormat = (email) => {
    // Regular expression for email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate password length
const validatePasswordLength = (password) => {
    return password.length >= 3;
};

// Validation function
const validateForm = () => {
    let valid = true;

    if (email.trim() === '') {
        setEmailError('Email cannot be empty.');
        valid = false;
    } else if (!validateEmailFormat(email)) {
        setEmailError('Invalid email format.');
        valid = false;
    } else {
        setEmailError('');
    }

    if (password.trim() === '') {
        setPasswordError('Password cannot be empty.');
        valid = false;
    } else if (!validatePasswordLength(password)) {
        setPasswordError('Password must be at least 3 characters.');
        valid = false;
    } else {
        setPasswordError('');
    }

    return valid;
};
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/login', { email, password });
            if (response.data.success) {
                const { accessToken, user } = response.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/dashboard');
                window.location.reload();
            } else {
                console.error('Authentication failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error during signin:', error.response.data);
        }
    };

    return (
        <div style={{ backgroundImage: `url(${SignInBG})` }} className='bg-no-repeat bg-cover bg-center h-screen px-40 py-16 bg-[#181754] text-white'>
            <div className='flex justify-center items-center h-full text-3xl'>
                <div className='flex flex-col justify-center items-center w-1/2'>
                    <Link to='/'><img src={Logo} alt="Logo" className='w-28' /></Link>
                    <h1 className='font-bold text-[50px] tracking-[2px] mt-4'>LOGIN</h1>
                    <p className='font-light text-[30px] tracking-[2px] mt-4'>Login to continues</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-6'>
                        <div className='input-box'>
                            <img width='35' height='35' src='https://img.icons8.com/fluency-systems-regular/48/151c38/new-post.png' className='icon mt-3 ml-6' alt='Email Icon' />
                            <input type='text' name='email' placeholder='Email' className={`w-[600px] h-[60px] font-light ${emailError && 'border-red-500'}`} onChange={(e) => setEmail(e.target.value)} />
                            {emailError && <p className='text-red-500 text-sm ml-4 mt-2'>{emailError}</p>}
                        </div>
                        <div className='input-box'>
                            <img width='35' height='35' src='https://img.icons8.com/fluency-systems-regular/48/151c38/password--v1.png' className='icon mt-3 ml-6' alt='Password Icon' />
                            <input type='password' name='password' placeholder='Password' className={`w-[600px] h-[60px] font-light ${passwordError && 'border-red-500'}`} onChange={(e) => setPassword(e.target.value)} />
                            {passwordError && <p className='text-red-500 text-sm ml-4 mt-2'>{passwordError}</p>}
                        </div>
                        <button className='box-btnGradient font-bold text-[20px] text-[#0cb6ff] flex flex-col justify-center items-center py-3 mt-10 w-[600px]'>LOGIN</button>
                    </form>
                </div>
                <div className='flex flex-col justify-center items-center ml-20 w-1/2'>
                    <img src={SignInImage} alt='SignIn Image' />
                    <div>
                        <p className='font-normal text-[25px] inline'>Don't have an account ?</p>
                        <Link to='/signUp' className='font-normal text-[25px] textSignInGradient underline underline-offset-4 decoration-[#3753cf8f] inline'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
