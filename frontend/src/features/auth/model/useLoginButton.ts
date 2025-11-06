import {useAuth} from "../../../shared";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

export const useLoginButton = () => {
    const navigate = useNavigate();
    const accountContainerRef = useRef<HTMLDivElement>(null);
    const {auth, setAuth} = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleIsProfile =  () => setIsProfileOpen(!isProfileOpen)

    const handleLogin = () => {
        setIsProfileOpen(false);
        navigate('/auth/login');
    };

    const handleLogout = () => {
        setAuth(null);
        localStorage.removeItem('access_token');
        navigate('/');
    };

    const handleClickProfile = () => {
        navigate('/profile');
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (accountContainerRef.current && !accountContainerRef.current.contains(e.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return {auth, accountContainerRef, isProfileOpen, toggleIsProfile, handleLogin, handleLogout, handleClickProfile}
}