import styles from '../styles/Header.module.css';
import DeviceThermometerSVG from '../assets/device_thermostat.svg?react';
import LoginSVG from '../assets/login.svg?react';
import AccountCircleSVG from '../assets/account_circle.svg?react';
import KeyboardArrowDownSVG from '../assets/keyboard_arrow_down.svg?react';
import LogoutSVG from '../assets/logout.svg?react';
import SettingSVG from '../assets/settings.svg?react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useRef, useState } from 'react';

const Header = () => {

    const navigate = useNavigate();

    const onClickLogin = () => {
        setIsProfileOpen(false);
        navigate('/login');
    }

    const { user, isAuthenticated, logout } = useAuth();

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

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <DeviceThermometerSVG width={"32px"} height={"32px"} fill={"#d47878ff"}></DeviceThermometerSVG>
                    <h1>ClimaHome</h1>
                </div>

                {isAuthenticated ? 
                    (   
                        <div className={styles.accountContainer} ref={accountContainerRef}>
                            <div className={styles.account} onClick={() => setIsProfileOpen(!isProfileOpen)}>
                                <AccountCircleSVG width={"24px"} height={"24px"} fill={"#789DE5"}></AccountCircleSVG>
                                <span>{user?.username}</span>
                                <KeyboardArrowDownSVG width={"16px"} height={"16px"} ></KeyboardArrowDownSVG>
                            </div>
                            { isProfileOpen && 
                                (
                                    <div className={styles.profile}>
                                        <p>{user?.username} 님 안녕하세요</p>
                                        <hr />
                                        <div className={styles.buttonContainer}>
                                            <button className={`${styles.button} ${styles.editProfile}`}><SettingSVG width={'16px'} height={'16px'} fill='gray'></SettingSVG> 내 정보 수정</button>
                                            <button className={`${styles.button} ${styles.logout}`} onClick={logout}><LogoutSVG width={'16px'} height={'16px'} fill='red'></LogoutSVG>로그아웃</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ) 
                    : 
                    (
                        <div className={styles.login} onClick={onClickLogin}>
                            <LoginSVG width={"16px"} height={"16px"} fill="#23789DE5"></LoginSVG>
                            <p>로그인</p>
                        </div>
                    )
                }
            </div>
        </header>
    )
}

export default Header