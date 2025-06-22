'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const SignUpPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "", password: "", username: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(true); 
    const [loading, setLoading] = useState(false);
    const onSignup = async () => {
        try {
            setLoading(true);
            setButtonDisabled(true);
            const response = await axios.post("/api/users/signup", user);
            console.log(response);
            router.push('/login')
            setButtonDisabled(false);
            setLoading(false);
        } catch (error: any) {
            console.log("error occured ", error);
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <div className='flex flex-col items-center justify-center  min-h-screen py-2'>
            <h1>{loading ? 'processing' : 'Create Account'}</h1>
            <hr />
            <label htmlFor='username'>username</label>
            <input placeholder='enter your username' type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} id='username'
                className='bg-amber-50 p-2 border rounded-xl text-gray-600'
            />
            <hr />
            <label htmlFor='email'>email</label>
            <input placeholder='enter your email' type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} id='email'
                className='bg-amber-50 p-2 border rounded-xl text-gray-600'
            />
            <hr />
            <label htmlFor='password'>password</label>
            <input placeholder='enter your password' type="text" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} id='password'
                className='bg-amber-50 p-2 border  text-gray-600 rounded-xl'
            />
            <button disabled={buttonDisabled} className='bg-blue-500 text-white cursor-pointer p-2 rounded-xl mt-2' onClick={onSignup}>{buttonDisabled ? "No SignUp" : "Create Account"}</button>
            <Link href='/login'>visit login page</Link>
        </div>
    )

}
export default SignUpPage
