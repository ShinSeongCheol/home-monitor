import { useState, type FormEventHandler } from 'react';
import styles from '../styles/SingupFormComponent.module.css'
import { useNavigate } from 'react-router-dom';

const SignupFormComponent = () => {

    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const navigate = useNavigate();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if(password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/member/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nickname,
                password,
            }),
        })
        .then(res => {
            if (res.ok) {
                alert('회원 가입 성공하였습니다');
                navigate('/');
            }else {
                throw new Error(`HTTP ERROR : ${res.status}`);
            }
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <label htmlFor="nickname">아이디</label>
                <input type="text" name="nickname" id="nickname" required placeholder='Nickname' onChange={(event) => setNickname(event.target.value)}/>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="password">비밀번호</label>
                <input type="password" name="password" id="password" required placeholder='••••••••' onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="password_confirm">비밀번호 확인</label>
                <input type="password" name="password_confirm" id="password_confirm" required placeholder='••••••••' onChange={(event) => setPasswordConfirm(event.target.value)}/>
            </div>
            <input type="submit" value="회원가입" />
        </form>
    )
}

export default SignupFormComponent;