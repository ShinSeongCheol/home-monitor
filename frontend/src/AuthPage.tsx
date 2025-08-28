import styles from './styles/Login.module.css'
import { useEffect, useState } from 'react';
import LoginFormComponent from './components/LoginFormComponent';
import SignupFormCompoenent from './components/SignupFormComponent';

const AuthPage = () => { 

    const [path, setPath] = useState('login');

    let content;
    if (path === 'login') {
        content = <LoginFormComponent/>
    }
    else if(path === 'signup'){
        content = <SignupFormCompoenent/>
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');

        if(code) {
            // 토큰 요청
            fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/kakao`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    code: code
                })
            })
        }
    }, [])

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styles.tabContainer}>
                    <div className={path === 'login' ? `${styles.active}` : ``} onClick={() => setPath('login')}><h2>로그인</h2></div>
                    <div className={path === 'signup' ? `${styles.active}` : ``} onClick={() => {setPath('signup')}}><h2>회원가입</h2></div>
                </div>
                {content}
            </section>
        </main>
    )
}

export default AuthPage;