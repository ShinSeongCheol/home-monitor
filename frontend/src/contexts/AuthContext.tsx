import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = {
    email: string;
    name: string;
    authorities: Authority;
}

type Authority = {
    authority: string;
}

type AuthState = {
    user: User | null;
    accessToken: string | null;
}

type AuthContextType = AuthState & {
    login: (email: string, password: string) => Promise<void>;
    kakaoLogin: (code:string) => Promise<void>
    logout: () => void;
    signup: (email: string, nickname: string, password: string) => Promise<void>;
    isLoading: boolean;
}


const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [auth, setAuth] = useState<AuthState | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchAuth = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');

                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
    
                if (!res.ok) {
                    throw new Error(`Http Error ${res.status}`);
                }
    
                const data = await res.json();
    
                const userEmail = data.email;
                const userName = data.name;
                const userAuthorities = data.authorities.map((data: Authority) => data.authority);
    
                setAuth({
                    user: {email: userEmail, name: userName, authorities: userAuthorities},
                    accessToken: accessToken
                });
            } catch (err) {
                setAuth(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAuth();
    }, [])

    const login = async (email: string, password: string) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })

        if (!res.ok) throw new Error(`HTTP ERROR ${res.status}`);

        const data = await res.json();

        const userEmail = data.email;
        const userName = data.name;
        const accessToken = data.accessToken;
        const userAuthorities = data.authorities.map((data: Authority) => data.authority);

        localStorage.setItem("access_token", data.accessToken);

        setAuth({
            user: { email: userEmail, name: userName, authorities: userAuthorities },
            accessToken: accessToken
        });
    }

    const signup = async (email: string, nickname: string, password: string) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/member/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                nickname: nickname,
                password: password,
            }),
        })

        if (!res.ok) throw new Error(`HTTP ERROR ${res.status}`);

        const data = await res.json();
    }

    const kakaoLogin = async (code: string) => {
        // 토큰 요청
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/kakao`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                code: code
            })
        });

        if(!res.ok) {
            throw new Error(`Http Error ${res.status}`);
        }

        const data = await res.json();

        const userEmail = data.email;
        const userName = data.name;
        const accessToken = data.accessToken;
        const userAuthorities = data.authorities.map((data: Authority) => data.authority);

        localStorage.setItem("access_token", accessToken);

        setAuth({
            user: { email: userEmail, name: userName, authorities: userAuthorities },
            accessToken: accessToken
        });
    }

    const logout = () => {
        setAuth({
            user: { email: "", name: "", authorities: { authority: "" } },
            accessToken: null
        });

        localStorage.removeItem('access_token');
    }

    return (
        <AuthContext.Provider value={{ user: auth?.user ?? null, accessToken: auth?.accessToken ?? null, login, kakaoLogin, logout, signup, isLoading}}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth Error");
    }
    return context;
}