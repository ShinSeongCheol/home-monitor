import styles from '../styles/Header.module.css';
import AccountSVG from '../assets/contacts_product.svg?react';
import DeviceThermometerSVG from '../assets/device_thermostat.svg?react';
import LoginSVG from '../assets/login.svg?react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from 'react';

const Header = () => {

    const navigate = useNavigate();

    const onClickLogin = () => {
        navigate('/login');
    }

    const {auth, isAuthenticated} = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <DeviceThermometerSVG width={"32px"} height={"32px"} fill={"#d47878ff"}></DeviceThermometerSVG>
                    <h1>ClimaHome</h1>
                </div>
                {isAuthenticated ?
                    <div className={styles.account}>
                        <AccountSVG width={"28px"} height={"28px"} fill={"#789DE5"}></AccountSVG>
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