"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const API_URL = process.env.NEXT_PUBLIC_SERVER_LINK;

    const [currentUser, setCurrentUser] = useState(() => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem("user")) || null;
        }
        return null;
    });

    const login = async (input) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, input);
            setCurrentUser(res.data);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/auth/logout`);
            setCurrentUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
