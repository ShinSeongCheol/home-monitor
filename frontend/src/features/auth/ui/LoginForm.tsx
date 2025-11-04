import kakaoLoginButton from "../../../assets/kakao/ko/kakao_login_medium_narrow.png";
import {useLoginForm} from "../model/useLoginForm.ts";

export const LoginForm = () => {

    const {handleSubmit, handleChangeEmail, handleChangePassword, handleLoginKakao} = useLoginForm();

    return (
        <form className={'mt-4 flex flex-col gap-2'} onSubmit={handleSubmit}>
            <div className={'flex flex-col gap-3'}>
                <label className={'text-xs'} htmlFor="email">이메일</label>
                <input className={'h-4 p-2 border-none rounded-sm bg-gray-300'} type="email" name="email" id="email" required placeholder='email@example.com' onChange={handleChangeEmail}/>
            </div>
            <div className={'flex flex-col gap-3'}>
                <label className={'text-xs'} htmlFor="password">비밀번호</label>
                <input className={'h-4 p-2 border-none rounded-sm bg-gray-300'} type="password" name="password" id="password" required placeholder='••••••••' onChange={handleChangePassword}/>
            </div>
            <input className={'mt-2 h-12 p-2 border-none text-white bg-black rounded-xl cursor-pointer'} type="submit" value="로그인" />
            <div className={'flex justify-center bg-[#FEE500] rounded-xl cursor-pointer'} onClick={handleLoginKakao}>
                <img src={kakaoLoginButton} alt="카카오 로그인" />
            </div>
        </form>
    )
}