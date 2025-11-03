import {type ChangeEvent, type FormEvent, useState} from "react";
import {backendUrl, useAuth} from "../../../shared";
import {useNavigate} from "react-router-dom";
import {login} from "../api/login.ts";

export const useLoginForm = () => {

    const navigate = useNavigate();

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
        location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${backendUrl}&redirect_uri=${location.origin}/auth&response_type=code`;
    };

    return {handleSubmit, handleChangeEmail, handleChangePassword, handleLoginKakao};
}