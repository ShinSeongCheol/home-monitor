import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const useTabNav = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [path, setPath] = useState("");
    const handleClickLogin = () => {
        navigate('/auth/login');
    };
    const handleClickSignup = () => {
        navigate('/auth/signup');
    };

    useEffect(() => {
        if (location.pathname.includes('login')) {
            setPath('login');
        } else if (location.pathname.includes('signup')){
            setPath('signup')
        }
    }, [location.pathname]);


    return {path, handleClickLogin, handleClickSignup};
}