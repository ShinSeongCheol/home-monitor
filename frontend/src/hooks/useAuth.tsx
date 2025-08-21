import { useEffect, useState } from "react";

type User = {
    username: string;
}

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if(auth) {
            fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/isAuth`, {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('auth') ?? "",
                },
            })
            .then(res => res.json())
            .then(data => {
                setUser({username: data.username});
                setIsLoading(false);
            })
            .catch(error => console.error(error))
            ;

            setUser({username: auth});
            setIsLoading(false);
        }
    }, []);

    return {user, isAuthenticated: !!user, isLoading};
}

export default useAuth;