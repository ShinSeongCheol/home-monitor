import styles from '../styles/components/LoginFormComponent.module.css';
import kakaoLoginButton from '../assets/kakao/ko/kakao_login_medium_narrow.png';
import { useEffect, useState, type FormEventHandler, type MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginFormComponent = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const {login, kakaoLogin} = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        
        if(code) {
            try{
                kakaoLogin(code);
                alert('로그인 되었습니다.');
                navigate('/');
            }catch(err) {
                alert('로그인 실패했습니다.')
                console.error(err);
            }
        }
    }, [])

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            
            alert('로그인 되었습니다.');
            navigate('/');
        }catch(err){
            alert('로그인 실패했습니다.')
            console.error(err);
        }
    }

    const handleKakaoLogin: MouseEventHandler<HTMLDivElement> = () => {
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
                <img src={kakaoLoginButton} alt="카카오 로그인" />
            </div>
        </form>
    )
}

export default LoginFormComponent;