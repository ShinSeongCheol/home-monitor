import {type ChangeEvent, type FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {signup} from "../api/signup.ts";

export const useSignupForm = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            alert('비밀번호를 확인해주세요.');
            return;
        }

        try {
            void signup(email,nickname,password);
            alert('회원가입 되었습니다.');
            navigate('/');
        }catch (err) {
            console.error(err);
        }
    };
    const handleChangeEmail = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleChangeNickname = (e:ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };
    const handleChangePassword = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleChangePasswordConfirm = (e:ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(e.target.value);
    };

    return {handleSubmit, handleChangeEmail, handleChangeNickname, handleChangePassword, handleChangePasswordConfirm}
}