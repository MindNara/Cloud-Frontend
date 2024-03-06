import React, { useState } from 'react';
import SignUpBG from '../assets/SignUpBG.png';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import SignUpImage from '../assets/SignUpImage.png';
import axios from 'axios';

function SignUp() {
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

    // SignUp function
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/register', { email, password });
            if (response.data.success) {
                navigate('/signIn');
            }
        } catch (error) {
            console.error('Error during signup:', error.response.data);
        }
    };

    return (
        <div style={{ backgroundImage: `url(${SignUpBG})` }} className='bg-no-repeat bg-cover bg-center h-screen px-40 py-16 bg-[#181754] text-white'>
            <div className='flex justify-center items-center h-full text-3xl'>
                <div className='flex flex-col justify-center items-center w-1/2 mr-6'>
                    <img src={SignUpImage} alt='SignUp Image' />
                    <div>
                        <p className='font-normal text-[25px] inline'>Already have an account ?  </p>
                        <Link to='/signIn' className='font-normal text-[25px] textSignInGradient underline underline-offset-4 decoration-[#3753cf8f] inline'>Log In</Link>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center w-1/2 ml-20'>
                    <Link to='/'>
                        <img src={Logo} alt='Logo' className='w-28' />
                    </Link>
                    <h1 className='font-bold text-[50px] tracking-[2px] mt-4'>REGISTER</h1>
                    <p className='font-light text-[30px] tracking-[2px] mt-4'>Create New Account</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-6'>
                        <div className='input-box'>
                            <img width='35' height='35' src='https://img.icons8.com/fluency-systems-regular/48/151c38/new-post.png' className='icon mt-3 ml-6' alt='Email Icon' />
                            <input type='text' name='email' placeholder='Email' className={`w-[600px] h-[60px] font-light`} onChange={(e) => setEmail(e.target.value)} />
                            {emailError && <p className='text-red-500 text-sm ml-4 mt-2'>{emailError}</p>}
                        </div>
                        <div className='input-box'>
                            <img width='35' height='35' src='https://img.icons8.com/fluency-systems-regular/48/151c38/password--v1.png' className='icon mt-3 ml-6' alt='Password Icon' />
                            <input type='password' name='password' placeholder='Password' className={`w-[600px] h-[60px] font-light= `} onChange={(e) => setPassword(e.target.value)} />
                            {passwordError && <p className='text-red-500 text-sm ml-4 mt-2'>{passwordError}</p>}
                        </div>
                        <button className='box-btnGradient font-bold text-[20px] text-[#0cb6ff] flex flex-col justify-center items-center py-3 mt-10 w-[600px]'>SIGNUP</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
