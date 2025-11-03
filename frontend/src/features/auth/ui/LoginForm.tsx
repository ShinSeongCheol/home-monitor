import styles from "../../../styles/components/LoginFormComponent.module.css";
import kakaoLoginButton from "../../../assets/kakao/ko/kakao_login_medium_narrow.png";
import {useLoginForm} from "../model/useLoginForm.ts";

export const LoginForm = () => {

    const {handleSubmit, handleChangeEmail, handleChangePassword, handleLoginKakao} = useLoginForm();

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <label htmlFor="email">이메일</label>
                <input type="email" name="email" id="email" required placeholder='email@example.com' onChange={handleChangeEmail}/>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="password">비밀번호</label>
                <input type="password" name="password" id="password" required placeholder='••••••••' onChange={handleChangePassword}/>
            </div>
            <input type="submit" value="로그인" />
            <div className={styles.kakaoLoginContainer} onClick={handleLoginKakao}>
                <img src={kakaoLoginButton} alt="카카오 로그인" />
            </div>
        </form>
    )
}