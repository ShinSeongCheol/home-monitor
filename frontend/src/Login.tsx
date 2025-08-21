import { Link, useNavigate } from 'react-router-dom';
import styles from './styles/Login.module.css'
import type { FormEventHandler } from 'react';
import { useAuth } from './contexts/AuthContext';

const Login = () => { 

    const navigate = useNavigate();

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
                <h2>로그인</h2>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <label htmlFor="">아이디</label>
                    <input type="text" name="login_id" id="login_id" />
                    <label htmlFor="">비밀번호</label>
                    <input type="password" name="login_password" id="login_password" />
                    <input type="submit" value="로그인" />
                    <div className={styles.signup}>
                        <Link to={'/signup'}>회원가입</Link>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Login;