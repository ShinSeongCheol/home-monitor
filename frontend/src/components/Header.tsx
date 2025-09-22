import styles from '../styles/components/Header.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, CircleUser, LogIn, LogOut, Settings, Thermometer } from 'lucide-react';

const Header = () => {

    const navigate = useNavigate();

    const onClickLogin = () => {
        setIsProfileOpen(false);
        navigate('/auth');
    }

    const { user, accessToken, logout } = useAuth();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const accountContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (accountContainerRef.current && !accountContainerRef.current.contains(e.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        alert('로그아웃 되었습니다.');
        navigate('/');
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Thermometer size={'32px'} fill={"#d47878ff"}/>
                    <h1>ClimaHome</h1>
                </div>

                { accessToken ? 
                    (   
                        <div className={styles.accountContainer} ref={accountContainerRef}>
                            <div className={styles.account} onClick={() => setIsProfileOpen(!isProfileOpen)}>
                                <CircleUser size={'24px'} color={'#789DE5'} strokeWidth={1}  />
                                <span>{user?.name}</span>
                                <ChevronDown size={'16px'} strokeWidth={1} />
                            </div>
                            { isProfileOpen && 
                                (
                                    <div className={styles.profile}>
                                        <p>{user?.name} 님 안녕하세요</p>
                                        <hr />
                                        <div className={styles.buttonContainer}>
                                            <button className={`${styles.button} ${styles.editProfile}`} onClick={() => navigate('/profile')}><Settings size={'16px'} color='gray' strokeWidth={1} />내 정보 수정</button>
                                            <button className={`${styles.button} ${styles.logout}`} onClick={handleLogout}><LogOut size={'16px'} color='red' strokeWidth={1} /> 로그아웃</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ) 
                    : 
                    (
                        <div className={styles.login} onClick={onClickLogin}>
                            <LogIn width={"16px"} height={"16px"} color="#23789DE5" strokeWidth={1}/>
                            <p>로그인</p>
                        </div>
                    )
                }
            </div>
        </header>
    )
}

export default Header