import {useProfileForm} from "../model/useProfileForm.ts";

export const ProfileForm = () => {

    const {email, nickname, handleChangeNickname, handleChangePassword, handleChangeNewPassword, handleChangeConfirmNewPassword, handleSubmit} = useProfileForm();

    return (
        <form className={'styles.profileForm'} onSubmit={handleSubmit}>
            <div className={'styles.inputContainer'}>
                <label htmlFor="email">아이디</label>
                <input type="text" name="email" id="email" value={email} readOnly />
            </div>

            <div className={'styles.inputContainer'}>
                <label htmlFor="nickname">이름</label>
                <input type="text" name="nickname" id="nickname" value={nickname} required onChange={handleChangeNickname} />
            </div>

            <div className={'styles.inputContainer'}>
                <label htmlFor="password">현재 비밀번호</label>
                <input type="password" name="password" id="password" required onChange={handleChangePassword} />
            </div>

            <div className={'styles.inputContainer'}>
                <label htmlFor="newPassword">새 비밀번호</label>
                <input type="password" name="newPassword" id="newPassword" required onChange={handleChangeNewPassword} />
            </div>

            <div className={'styles.inputContainer'}>
                <label htmlFor="confirmedPassword">새 비밀번호 확인</label>
                <input type="password" name="confirmedPassword" id="confirmedPassword" required onChange={handleChangeConfirmNewPassword} />
            </div>

            <input type="submit" value={"변경"}></input>
        </form>
    )
}