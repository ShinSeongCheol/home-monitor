import { useEffect } from 'react';
import styles from '../styles/Navigation.module.css'
import { Link, useLocation } from 'react-router-dom';

const navigation = () => {

    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname)
    }, [location])

    return (
        <nav className={styles.navigation}>
            <div className={styles.container}>
                <ul className={styles.menuContainer}>
                    <li>
                        <Link to={"/"} className={location.pathname === '/' ? `${styles.item} ${styles.activeItem}` : `${styles.item}`}>대시보드</Link>
                    </li>
                    <li>
                        <Link to={"/configuration/forecast/administrativeDistrict"} className={location.pathname === '/configuration/forecast/administrativeDistrict' ? `${styles.item} ${styles.activeItem}` : `${styles.item}`}>설정</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default navigation;