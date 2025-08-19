import { useEffect } from 'react';
import styles from '../styles/Navigation.module.css'
import { Link, useLocation } from 'react-router-dom';
import DashboardSVG from '../assets/dashboard.svg?react';
import SettingSVG from '../assets/settings.svg?react';

const navigation = () => {

    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname)
    }, [location])

    return (
        <nav className={styles.navigation}>
            <div className={styles.container}>
                <ul className={styles.menuContainer}>
                    <li className={location.pathname === '/' ? `${styles.active}` : ""}>
                        <DashboardSVG width={"16px"} height={"16px"} fill={"gray"}></DashboardSVG>
                        <Link to={"/"} >대시보드</Link>
                    </li>
                    <li className={location.pathname === '/configuration/forecast/administrativeDistrict' ? `${styles.active}` : ""}>
                        <SettingSVG width={"16px"} height={"16px"} fill={"gray"}></SettingSVG>
                        <Link to={"/configuration/forecast/administrativeDistrict"}>설정</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default navigation;