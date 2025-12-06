import {useSignupForm} from "../model/useSignupForm.ts";

export const SignupForm = () => {

    const {handleSubmit, handleChangeEmail, handleChangeNickname, handleChangePassword, handleChangePasswordConfirm} = useSignupForm();

    return (
        <form className={'mt-4 flex flex-col gap-2'} onSubmit={handleSubmit}>
            <div className={'flex flex-col gap-3'}>
                <label className={'text-xs'} htmlFor="email">이메일</label>
                <input className={'h-8 p-2 border-none rounded-sm bg-gray-300'} type="email" name="email" id="email" required placeholder='email@example.com' onChange={handleChangeEmail}/>
            </div>
            <div className={'flex flex-col gap-3'}>
                <label className={'text-xs'} htmlFor="nickname">이름</label>
                <input className={'h-8 p-2 border-none rounded-sm bg-gray-300'} type="text" name="nickname" id="nickname" required placeholder='Nickname' onChange={handleChangeNickname}/>
            </div>
            <div className={'flex flex-col gap-3'}>
                <label className={'text-xs'} htmlFor="password">비밀번호</label>
                <input className={'h-8 p-2 border-none rounded-sm bg-gray-300'} type="password" name="password" id="password" required placeholder='••••••••' onChange={handleChangePassword}/>
            </div>
            <div className={'flex flex-col gap-3'}>
                <label className={'text-xs'} htmlFor="password_confirm">비밀번호 확인</label>
                <input className={'h-8 p-2 border-none rounded-sm bg-gray-300'} type="password" name="password_confirm" id="password_confirm" required placeholder='••••••••' onChange={handleChangePasswordConfirm}/>
            </div>
            <input className={'mt-2 h-12 p-2 border-none text-white bg-black rounded-xl cursor-pointer'} type="submit" value="회원가입" />
        </form>
    )
}