import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {kakaoUrl, useAuth} from "../../../shared";
import {useLocation, useNavigate} from "react-router-dom";
import {login} from "../api/login.ts";
import {kakaoLogin} from "../api/kakaoLogin.ts";

export const useLoginForm = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {setAuth} = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            localStorage.setItem("access_token", data.accessToken);
            setAuth(data);

            navigate('/');
        }catch (err) {
            alert('로그인 실패');
            console.error(err);
        }
    };

    const handleChangeEmail = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLoginKakao = () => {
        if(!kakaoUrl) return;
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoUrl}&redirect_uri=${window.location.origin}/auth/login&response_type=code`;
    };

    const loginKakao = async (code: string) => {
        try {
            const data = await kakaoLogin(code);
            localStorage.setItem("access_token", data.accessToken);
            setAuth(data);

            navigate('/');
        }catch (err) {
            alert('로그인 실패');
            console.error(err);
        }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');
        if(!code) return;

        void loginKakao(code)
    }, []);

    return {handleSubmit, handleChangeEmail, handleChangePassword, handleLoginKakao};
}