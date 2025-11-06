import { ChevronDown, CircleUser, LogIn, LogOut, Settings } from 'lucide-react';
import {useLoginButton} from "../model/useLoginButton.ts";

export const LoginButton = () => {

    const {auth, accountContainerRef, isProfileOpen, toggleIsProfile, handleLogin, handleLogout, handleClickProfile} = useLoginButton();

    return (
        <>
            {auth ?
                (
                    <div className={'relative select-none'} ref={accountContainerRef}>
                        <div className={'flex justify-center items-center gap-1 p-1 cursor-pointer rounded-sm hover:bg-gray-100'} onClick={toggleIsProfile}>
                            <CircleUser size={'24px'} color={'#789DE5'} strokeWidth={1}/>
                            <span>{auth.name}</span>
                            <ChevronDown size={'16px'} strokeWidth={1}/>
                        </div>
                        {isProfileOpen &&
                            (
                                <div className={'absolute bg-white w-44 mt-2 p-2 z-1 right-0 border border-gray-200 rounded-sm'}>
                                    <p>{auth.name} 님 안녕하세요</p>
                                    <hr/>
                                    <div className={'flex flex-col gap-1 mt-2'}>
                                        <button className={`bg-white flex justify-center items-center gap-1 border border-gray-200 hover:bg-gray-100 hover:cursor-pointer`}
                                                onClick={handleClickProfile}><Settings size={'16px'}
                                                                                               color='gray'
                                                                                               strokeWidth={1}/>내 정보 수정
                                        </button>
                                        <button className={`'bg-white flex justify-center items-center gap-1 border border-red-200 hover:bg-red-100 hover:cursor-pointer`} onClick={handleLogout}>
                                            <LogOut size={'16px'} color='red' strokeWidth={1}/> 로그아웃
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
                :
                (
                    <div className={'flex items-center gap-1 font-[DMSans] text-lg text-blue-300 border border-blue-300 rounded-sm hover:cursor-pointer hover:bg-gray-100 px-1'} onClick={handleLogin}>
                        <LogIn width={"16px"} height={"16px"} color="#82c5ff" strokeWidth={1}/>
                        <p>로그인</p>
                    </div>
                )
            }
        </>
    )
}