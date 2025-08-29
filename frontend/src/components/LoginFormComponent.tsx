import styles from '../styles/LoginFormComponent.module.css'
import kakaoLogin from '../assets/kakao/ko/kakao_login_medium_narrow.png'
import { useState, type FormEventHandler, type MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginFormComponent = () => {

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const {login} = useAuth();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                name: nickname,
                password: password
            }),
        })
            .then(res => {
                if (res.ok) {
                    alert('로그인 성공');
                    login(email, password);
                    navigate('/');
                } else if (res.status == 401) {
                    alert('로그인 실패');
                } else {
                    throw new Error(`HTTP ERROR ${res.status}`);
                }
            })
            .catch(error => console.error(error))
    }

    const handleKakaoLogin: MouseEventHandler<HTMLDivElement> = (event) => {
        location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${location.origin}/auth&response_type=code`;
    }

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <label htmlFor="email">이메일</label>
                <input type="email" name="email" id="email" required placeholder='email@example.com' onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="password">비밀번호</label>
                <input type="password" name="password" id="password" required placeholder='••••••••' onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <input type="submit" value="로그인" />
            <div className={styles.kakaoLoginContainer} onClick={handleKakaoLogin}>
                <img src={kakaoLogin} alt="카카오 로그인" />
            </div>
        </form>
    )
}

export default LoginFormComponent;