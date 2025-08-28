import styles from '../styles/SingupFormComponent.module.css'

type LoginFormProps = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SignupFormCompoenent: React.FC<LoginFormProps> = ({ handleSubmit }) => {
    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <label htmlFor="">아이디</label>
                <input type="text" name="signup_id" id="signup_id" placeholder='Nickname'/>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="">비밀번호</label>
                <input type="password" name="signup_password" id="signup_password" placeholder='••••••••'/>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="">비밀번호 확인</label>
                <input type="password" name="signup_password_confirm" id="signup_password_confirm" placeholder='••••••••'/>
            </div>
            <input type="submit" value="회원가입" />
        </form>
    )
}

export default SignupFormCompoenent;