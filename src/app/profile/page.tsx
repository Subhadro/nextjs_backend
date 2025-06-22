'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface userType {
	_id: string;
	username: string;
	email: string;
	isVerified: boolean;
	isAdmin: boolean;
	__v: number;
}
const profilePage = () => {
	const [user, setUser] = useState<userType>({ _id: "", username: "", email: "", isVerified: false, isAdmin: false, __v: 0 })
	const getUser = async () => {
		try {
			const response = await axios.post('api/users/me');
			const user = response.data.data;
			console.log(user)
			setUser(user);
		} catch (error: any) {
			console.log(error.message)
		}
	}
	useEffect(() => {
		getUser();
	}, [])
	return (
		<div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
			<div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
				<div className="flex flex-col items-center">
					{/* Placeholder avatar */}
					<div className="w-28 h-28 rounded-full border-4 border-orange-300 shadow-md mb-4 flex items-center justify-center bg-orange-100 text-4xl text-orange-500 font-bold">
						{user.username.charAt(0).toUpperCase()}
					</div>
					<h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
					<p className="text-gray-500">{user.email}</p>
					<div className="flex gap-2 mt-2">
						{user.isVerified && (
							<span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
								Verified
							</span>
						)}
						{user.isAdmin && (
							<span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
								Admin
							</span>
						)}
					</div>
				</div>
				<div className="mt-6">
					<div className="flex flex-col items-center gap-2">
						<span className="text-xs text-gray-400">User ID:</span>
						<span className="text-sm text-gray-600 break-all">{user._id}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default profilePage
