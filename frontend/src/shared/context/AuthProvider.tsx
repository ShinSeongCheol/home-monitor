import React, {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import {backendUrl} from "../config/backendUrl.ts";

export type Auth = {
    email: string;
    name: string;
    accessToken: string;
    authorities: {
        authority: string;
    }[]
}

type AuthContextType = {
    auth: Auth | null;
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [auth, setAuth] = useState<Auth | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAuth = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) return;

            const res = await fetch(`${backendUrl}/api/v1/auth`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!res.ok) {
                localStorage.removeItem('access_token');
                throw new Error(`${res.status}`);
            }

            const data:Auth = await res.json();
            data.accessToken = accessToken;
            setAuth(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        void fetchAuth();
    }, [])

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('AuthProvider 안에서만 사용');
    return context;
};