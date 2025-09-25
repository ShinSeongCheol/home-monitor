import { ChevronRight, KeyRound, List, Shield, SquarePen, SunMedium, TextAlignJustify, User } from 'lucide-react';
import styles from '../styles/layouts/BackOfficeLayout.module.css';

import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const MenuType = {
    Board : 'board',
    User : 'user',
    Weather : 'weather',
} as const;

export const SideMenuType = {
    Board: 'board',
    Post: 'post',
    BoardRole: 'boardRole',
    BoardRoleCode: 'boardRoleCode',
    Comment: 'comment',
    Reaction: 'reaction',
    ReactionCode: 'reactionCode',

    User: 'user',
    UserRole: 'userRole',
    UserRoleCode: 'userRoleCode',

    AdministrativeDistrict: 'administrativeDistrict',
    AreaDistrict: 'areaDistrict',
}

const BackOfficeLayout = () => {

    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [openSideMenu, setOpenSideMenu] = useState<string | null>(null);

    const toggleMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
    }

    const clickSideMenu = (sideMenu: string) => {
        setOpenSideMenu(sideMenu);
        navigate(sideMenu);
    }

    return (
        <div className={styles.backoffice}>
            <aside className={styles.sidebar}>
                <div className={styles.title}>메뉴<TextAlignJustify strokeWidth={1} /></div>
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <div className={`${styles.menu} ${openMenu === MenuType.Board ? styles.open : ""}`} onClick={() => toggleMenu(MenuType.Board)}>
                                <SquarePen size={'16px'} strokeWidth={1} />
                                <span>게시판 관리</span>
                                <ChevronRight className={`${styles.chevron} ${openMenu === MenuType.Board ? styles.open : ""}`} size={'16px'} strokeWidth={1} />
                            </div>

                            <ul className={`${styles.submenu} ${openMenu === MenuType.Board ? styles.open : ""}`}>
                                <li className={`${openSideMenu === SideMenuType.Board ? styles.open : ""}`} onClick={() => clickSideMenu(SideMenuType.Board)}><List size={'16px'} strokeWidth={1} /> 게시판 목록</li>
                                <li className={`${openSideMenu === SideMenuType.BoardRole ? styles.open : ""}`} onClick={() => clickSideMenu(SideMenuType.BoardRole)}><Shield size={'16px'} strokeWidth={1} /> 게시판 권한 </li>
                                <li className={`${openSideMenu === SideMenuType.BoardRoleCode ? styles.open : ""}`} onClick={() => clickSideMenu(SideMenuType.BoardRoleCode)}><KeyRound size={'16px'} strokeWidth={1} /> 게시판 권한 코드</li>
                                <li className={`${openSideMenu === SideMenuType.Post ? styles.open : ""}`} onClick={() => clickSideMenu(SideMenuType.Post)}><List size={'16px'} strokeWidth={1} /> 게시물 목록</li>

                                <li className={`${openSideMenu === SideMenuType.Comment ? styles.open : ""}`} onClick={() => clickSideMenu(SideMenuType.Comment)}><List size={'16px'} strokeWidth={1} /> 댓글 목록</li>

                                <li className={`${openSideMenu === SideMenuType.Reaction ? styles.open : ""}`} onClick={() => clickSideMenu(SideMenuType.Reaction)}><List size={'16px'} strokeWidth={1} /> 반응 목록</li>
                                <li className={`${openSideMenu === SideMenuType.ReactionCode ? styles.open : ""}`} onClick={() => clickSideMenu(SideMenuType.ReactionCode)}><KeyRound size={'16px'} strokeWidth={1} /> 반응 코드</li>
                            </ul>

                        </li>

                        <li>
                            <div className={`${styles.menu} ${openMenu === MenuType.User ? styles.open : ""}`} onClick={() => toggleMenu(MenuType.User)}>
                                <User size={'16px'} strokeWidth={1} />
                                <span>사용자 관리</span>
                                <ChevronRight className={`${styles.chevron} ${openMenu === MenuType.User ? styles.open : ""}`} size={'16px'} strokeWidth={1} />
                            </div>

                            <ul className={`${styles.submenu} ${openMenu === MenuType.User ? styles.open : ""}`}>
                                <li className={`${openSideMenu === SideMenuType.User ? styles.open : ""}`} onClick={() => clickSideMenu(SideMenuType.User)}><List size={'16px'} strokeWidth={1} /> 사용자 목록</li>
                                <li className={`${openSideMenu === SideMenuType.UserRole ? styles.open : ""}`} onClick={() => clickSideMenu(SideMenuType.UserRole)}><Shield size={'16px'} strokeWidth={1} /> 사용자 권한</li>
                                <li className={`${openSideMenu === SideMenuType.UserRoleCode ? styles.open : ""}`} onClick={() => clickSideMenu(SideMenuType.UserRoleCode)}><KeyRound size={'16px'} strokeWidth={1} /> 사용자 권한 코드</li>
                            </ul>
                        </li>

                        <li>
                            <div className={`${styles.menu} ${openMenu === MenuType.Weather ? styles.open : ""}`} onClick={() => toggleMenu(MenuType.Weather)}>
                                <SunMedium size={'16px'} strokeWidth={1} />
                                <span>기상 데이터 관리</span>
                                <ChevronRight className={`${styles.chevron} ${openMenu === MenuType.Weather ? styles.open : ""}`} size={'16px'} strokeWidth={1} />
                            </div>

                            <ul className={`${styles.submenu} ${openMenu === MenuType.Weather ? styles.open : ""}`}>
                                <li className={`${openSideMenu === SideMenuType.AdministrativeDistrict ? styles.open : ""}`} onClick={() => clickSideMenu(SideMenuType.AdministrativeDistrict)}><KeyRound size={'16px'} strokeWidth={1} /> 행정 구역 코드</li>
                                <li className={`${openSideMenu === SideMenuType.AreaDistrict ? styles.open : ""}`} onClick={() => clickSideMenu(SideMenuType.AreaDistrict)}><KeyRound size={'16px'} strokeWidth={1} /> 구역 코드</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className={styles.main}>
                <Outlet context={{setOpenMenu, setOpenSideMenu}} />
            </main>
        </div>
    )
}

export default BackOfficeLayout;