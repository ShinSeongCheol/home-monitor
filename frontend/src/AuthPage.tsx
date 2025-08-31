import styles from './styles/AuthPage.module.css'
import { useState } from 'react';
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