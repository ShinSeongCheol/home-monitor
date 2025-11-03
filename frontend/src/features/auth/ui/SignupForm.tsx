import styles from "../../../styles/components/SingupFormComponent.module.css";
import {useSignupForm} from "../model/useSignupForm.ts";

export const SignupForm = () => {

    const {handleSubmit, handleChangeEmail, handleChangeNickname, handleChangePassword, handleChangePasswordConfirm} = useSignupForm();

    return (
        <form className={styles.signupForm} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <label htmlFor="email">이메일</label>
                <input type="email" name="email" id="email" required placeholder='email@example.com' onChange={handleChangeEmail}/>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="nickname">이름</label>
                <input type="text" name="nickname" id="nickname" required placeholder='Nickname' onChange={handleChangeNickname}/>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="password">비밀번호</label>
                <input type="password" name="password" id="password" required placeholder='••••••••' onChange={handleChangePassword}/>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="password_confirm">비밀번호 확인</label>
                <input type="password" name="password_confirm" id="password_confirm" required placeholder='••••••••' onChange={handleChangePasswordConfirm}/>
            </div>
            <input type="submit" value="회원가입" />
        </form>
    )
}