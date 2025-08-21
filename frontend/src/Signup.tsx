import { Link, useNavigate } from 'react-router-dom';
import styles from './styles/Signup.module.css';
import type { FormEventHandler } from 'react';

const Signup = () => {

    const navigate = useNavigate();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const id = formData.get('signup_id');
        const password = formData.get('signup_password');
        const password_confirm = formData.get('signup_password_confirm');

        if(!id) {
            alert('아이디를 입력해주세요!');
            return;
        }

        if(!password) {
            alert('비밀번호를 입력해주세요!');
            return;
        }

        if(!password_confirm) {
            alert('비밀번호 확인을 입력해주세요!');
            return;
        }

        if (password !== password_confirm) {
            alert('비밀번호가 다릅니다!');
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: id,
                password,
            }),
        })
        .then(res => {
            if (res.ok) {
                alert('회원 가입 성공!');
                navigate('/');
            }else {
                throw new Error(`HTTP ERROR : ${res.status}`);
            }
        }).catch(error => {
            console.error(error);
        })
    }

    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <h2>회원가입</h2>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <label htmlFor="">아이디</label>
                    <input type="text" name="signup_id" id="signup_id" />
                    <label htmlFor="">비밀번호</label>
                    <input type="password" name="signup_password" id="signup_password" />
                    <label htmlFor="">비밀번호 확인</label>
                    <input type="password" name="signup_password_confirm" id="signup_password_confirm" />
                    <input type="submit" value="회원가입" />
                    <div className={styles.login}>
                        <Link to={'/login'}>로그인</Link>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Signup;