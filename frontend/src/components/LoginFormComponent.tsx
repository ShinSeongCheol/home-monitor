import styles from '../styles/LoginFormComponent.module.css'
import kakaoLogin from '../assets/kakao/ko/kakao_login_medium_narrow.png'

type LoginFormProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const LoginFormComponent: React.FC<LoginFormProps> = ({ handleSubmit }) => {
    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <label htmlFor="">아이디</label>
                <input type="text" name="login_id" id="login_id" placeholder='Nickname' />
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="">비밀번호</label>
                <input type="password" name="login_password" id="login_password" placeholder='••••••••' />
            </div>
            <input type="submit" value="로그인" />
            <div className={styles.kakaoLoginContainer}>
                <img src={kakaoLogin} alt="카카오 로그인" />
            </div>
        </form>
    )
}

export default LoginFormComponent;