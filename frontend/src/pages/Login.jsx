import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../context/User';
import { SongData } from '../context/Song';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loginUser, btnLoading } = UserData();
    const navigate = useNavigate();
    const {fetchAlbums,fetchSongs}=SongData();

    const submitHandler = (e) => {
        e.preventDefault();
        loginUser(email, password, navigate,fetchAlbums,fetchSongs); // ✅ FIXED
    };

    return (
        <>
        <div className="flex items-center h-screen justify-center max-h-screen">
            <div className="bg-black text-white p-8 rounded-lg shadow max-w-md w-full">
                <h2 className='text-3xl font-semibold text-center mb-8'>
                    Login to Spotify
                </h2>

                <form className='mt-8' onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className='block text-sm font-medium mb-1'>
                            Email / Username
                        </label>
                        <input type="text"
                            className='auth-input'
                            required
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className='block text-sm font-medium mb-1'>
                            Password
                        </label>
                        <input type="password"
                            className='auth-input'
                            required
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <button disabled={btnLoading} className="auth-btn">
                        {btnLoading ? "please wait..." : "Login"}
                    </button>
                </form>

                <div className='text-center mt-6'>
                    <Link to="/register" className="text-sm text-gray-400 hover:text-gray-300">
                        create a account
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;
