"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const API_URL = process.env.NEXT_PUBLIC_SERVER_LINK;

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null));

    const login = async(input) => {
        const res = await axios.post(`${API_URL}/auth/login`, input);
        setCurrentUser(res.data)
    }

    const logout = async(input) => {
        const res = await axios.post(`${API_URL}/auth/logout`);
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
          {children}
        </AuthContext.Provider>
    );
}