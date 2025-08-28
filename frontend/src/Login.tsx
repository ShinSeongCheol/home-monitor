import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/Login.module.css'
import { useState, type FormEventHandler } from 'react';
import { useAuth } from './contexts/AuthContext';
import LoginFormComponent from './components/LoginFormComponent';
import SignupFormCompoenent from './components/SignupFormComponent';

const Login = () => { 

    const navigate = useNavigate();

    const [path, setPath] = useState('login');

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
                    <div className={path === 'login' ? `${styles.active}` : ``} onClick={() => setPath('login')}><h2>로그인</h2></div>
                    <div className={path === 'signup' ? `${styles.active}` : ``} onClick={() => {setPath('signup')}}><h2>회원가입</h2></div>
                </div>
                {path === 'login' 
                ? 
                    (<LoginFormComponent handleSubmit={handleSubmit}></LoginFormComponent>) 
                : 
                    (<SignupFormCompoenent handleSubmit={handleSubmit}></SignupFormCompoenent>)
                }
                
            </section>
        </main>
    )
}

export default Login;