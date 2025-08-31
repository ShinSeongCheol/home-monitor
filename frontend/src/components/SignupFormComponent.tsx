import { useState, type FormEventHandler } from 'react';
import styles from '../styles/SingupFormComponent.module.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignupFormComponent = () => {

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const navigate = useNavigate();

    const {signup} = useAuth();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if(password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try{
            signup(email, nickname, password);
            alert('회원가입 되었습니다.');
            navigate('/');
        }catch(err) {
            console.error(err);
        }

    }

    return (
        <form className={styles.signupForm} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <label htmlFor="email">이메일</label>
                <input type="email" name="email" id="email" required placeholder='email@example.com' onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="nickname">이름</label>
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