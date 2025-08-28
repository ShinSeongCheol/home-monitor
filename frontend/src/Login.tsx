import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/Login.module.css'
import type { FormEventHandler } from 'react';
import { useAuth } from './contexts/AuthContext';
import kakaoLogin from './assets/kakao/ko/kakao_login_medium_narrow.png'

const Login = () => { 

    const navigate = useNavigate();
    const location = useLocation();

    const {login} = useAuth();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const login_id = String(formData.get("login_id"));
        const login_password = String(formData.get("login_password"));

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: login_id,
                password: login_password
            }),
        })
        .then(res => {
            if(res.ok) {
                alert('로그인 성공');
                login(login_id, login_password);
                navigate('/');
            }else if (res.status == 401) {
                alert('로그인 실패');
            }else {
                throw new Error(`HTTP ERROR ${res.status}`);
            }
        })
        .catch(error => console.error(error))

    }

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styles.tabContainer}>
                    <div className={location.pathname === '/login' ? `${styles.active}` : ``}><h2>로그인</h2></div>
                    <div className={location.pathname === '/signup' ? `${styles.active}` : ``}><h2>회원가입</h2></div>
                </div>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="">아이디</label>
                        <input type="text" name="login_id" id="login_id" placeholder='nickname'/>
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="">비밀번호</label>
                        <input type="password" name="login_password" id="login_password" placeholder='••••••••'/>
                    </div>
                    <input type="submit" value="로그인" />
                    <div className={styles.kakaoLoginContainer}>
                        <img src={kakaoLogin} alt="카카오 로그인" />
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Login;