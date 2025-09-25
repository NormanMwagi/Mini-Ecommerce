// src/features/auth/LoginPage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./authSlice";
import { useNavigate } from "react-router-dom";

const Login = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, user } = useSelector((state) => state.auth);

    const [username, setUsername] = useState("");

    const handleLogin = (e) =>
    {
        e.preventDefault();
        if (username.trim())
        {
            dispatch(login({ username }));
            navigate("/"); // redirect to home after login
        }
    };

    const handleLogout = () =>
    {
        dispatch(logout());
    };

    return (
        <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
            {token ? (
                <div>
                    <h2 className="text-xl font-bold mb-4">
                        Welcome, {user.username}!
                    </h2>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                    <h2 className="text-xl font-bold">Login</h2>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border px-3 py-2 rounded w-full"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
            )}
        </div>
    );
};

export default Login;
