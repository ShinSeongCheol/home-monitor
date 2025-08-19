import styles from '../styles/Header.module.css'
import accountSvg from '../assets/contacts_product.svg'
import deviceThermometer from '../assets/device_thermostat.svg'
import login from '../assets/login.svg'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img src={deviceThermometer} alt="device thermometer" width="36px" height="36px"/>
                    <h1>ClimaHome</h1>
                </div>
                <div className={styles.login}>
                    <img src={login} alt="account" width="24px" height="24px"/>
                    <p>로그인</p>
                </div>
                <div className={styles.account}>
                    <img src={accountSvg} alt="account" width="36px" height="36px"/>
                </div>
            </div>
        </header>
    )
}

export default Header