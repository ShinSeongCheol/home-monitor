import {useTabNav} from "../model/useTabNav.ts";

export const TabNav = () => {

    const {path, handleClickLogin, handleClickSignup} = useTabNav();

    return (
        <>
            <div className={'flex justify-center items-center bg-gray-200 rounded-xl p-1'}>
                <div className={`w-full p-1 flex justify-center cursor-pointer ${path === 'login' ? 'bg-white rounded-4xl' : ''}`} onClick={handleClickLogin}>
                    <h2 className={'text-lg select-none'}>로그인</h2>
                </div>
                <div className={`w-full p-1 flex justify-center cursor-pointer ${path === 'signup' ? 'bg-white rounded-4xl' : ''}`} onClick={handleClickSignup}>
                    <h2 className={'text-lg select-none'}>회원가입</h2>
                </div>
            </div>
        </>
    )
}