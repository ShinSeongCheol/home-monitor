import styles from '../styles/Header.module.css';
import DeviceThermometerSVG from '../assets/device_thermostat.svg?react';
import LoginSVG from '../assets/login.svg?react';
import AccountCircleSVG from '../assets/account_circle.svg?react';
import KeyboardArrowDownSVG from '../assets/keyboard_arrow_down.svg?react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const Header = () => {

    const navigate = useNavigate();

    const onClickLogin = () => {
        navigate('/login');
    }

    const { user, isAuthenticated} = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <DeviceThermometerSVG width={"32px"} height={"32px"} fill={"#d47878ff"}></DeviceThermometerSVG>
                    <h1>ClimaHome</h1>
                </div>
                {isAuthenticated ?
                    <div className={styles.account}>
                        <AccountCircleSVG width={"24px"} height={"24px"} fill={"#789DE5"}></AccountCircleSVG>
                        <span>{user?.username}</span>
                        <KeyboardArrowDownSVG width={"16px"} height={"16px"} ></KeyboardArrowDownSVG>
                    </div>
                :
                    <div className={styles.login} onClick={onClickLogin}>
                        <LoginSVG width={"16px"} height={"16px"} fill="#23789DE5"></LoginSVG>
                        <p>로그인</p>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header