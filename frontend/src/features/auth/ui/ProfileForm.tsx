import {useProfileForm} from "../model/useProfileForm.ts";

export const ProfileForm = () => {

    const {email, nickname, handleChangeNickname, handleChangePassword, handleChangeNewPassword, handleChangeConfirmNewPassword, handleSubmit} = useProfileForm();

    return (
        <form className={'mt-4 flex flex-col gap-2'} onSubmit={handleSubmit}>
            <div className={'flex flex-col gap-3'}>
                <label className={'text-sm'} htmlFor="email">아이디</label>
                <input className={'h-8 p-2 border-none rounded-sm bg-gray-300'} type="text" name="email" id="email" value={email} readOnly />
            </div>

            <div className={'flex flex-col gap-3'}>
                <label className={'text-sm'} htmlFor="nickname">이름</label>
                <input className={'h-8 p-2 border-none rounded-sm bg-gray-300'} type="text" name="nickname" id="nickname" value={nickname} required onChange={handleChangeNickname} />
            </div>

            <div className={'flex flex-col gap-3'}>
                <label className={'text-sm'} htmlFor="password">현재 비밀번호</label>
                <input className={'h-8 p-2 border-none rounded-sm bg-gray-300'} type="password" name="password" id="password" required onChange={handleChangePassword} />
            </div>

            <div className={'flex flex-col gap-3'}>
                <label className={'text-sm'} htmlFor="newPassword">새 비밀번호</label>
                <input className={'h-8 p-2 border-none rounded-sm bg-gray-300'} type="password" name="newPassword" id="newPassword" required onChange={handleChangeNewPassword} />
            </div>

            <div className={'flex flex-col gap-3'}>
                <label className={'text-sm'} htmlFor="confirmedPassword">새 비밀번호 확인</label>
                <input className={'h-8 p-2 border-none rounded-sm bg-gray-300'} type="password" name="confirmedPassword" id="confirmedPassword" required onChange={handleChangeConfirmNewPassword} />
            </div>

            <input className={'h-8 mt-2 border-none text-white bg-black rounded-xl cursor-pointer'} type="submit" value={"변경"}></input>
        </form>
    )
}