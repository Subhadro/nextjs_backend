'use client'
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const VerifyEmailPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const verifytoken = async () => {
            if (!token) return;
            try {
                const response = await axios.post('/api/users/verifyemail', { token });
                if (response.data.status === 200) {
                    setIsVerified(true);
                }
                else{
                    setIsVerified(false)
                }
            } catch (error) {
                setIsVerified(false);
                console.log("email not verified");
            }
        };
        verifytoken();
    }, [token]);

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <button className=' bg-orange-400 text-black p-4 rounded-2xl'>
                {isVerified ? "Email Verified!" : "Verifying..."}
            </button>
        </div>

    );
};

export default VerifyEmailPage;