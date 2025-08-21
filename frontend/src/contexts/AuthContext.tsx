import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthContextType = {
    auth: string | null;
    isAuthenticated: boolean;
    user: { username: string } | null;
    isLoading: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState<string | null>(sessionStorage.getItem('auth'));
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!auth) {
            setIsLoading(false);
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/isAuth`, {
            method: "GET",
            headers: {
                Authorization: auth,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setUser({ username: data.username });
            })
            .catch((err) => {
                console.error(err);
                sessionStorage.removeItem("auth");
                setAuth(null);
            })
            .finally(() => setIsLoading(false));
    }, [auth]);

    const login = (username: string, password: string) => {
        const token = btoa(`${username}:${password}`);
        const value = `Basic ${token}`;
        sessionStorage.setItem("auth", value);
        setAuth(value);
    };

    const logout = () => {
        sessionStorage.removeItem("auth");
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, isAuthenticated: !!auth, user, isLoading, login, logout }}>
            {children}
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