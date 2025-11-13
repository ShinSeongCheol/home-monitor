import { useEffect } from 'react';
import { MenuType, SideMenuType } from './BackOfficeLayout.tsx';
import useBackOfficeMenu from '../../../features/backoffice/lib/useBackOfficeMenu.tsx';
import {BackOfficeUserWidget} from "../../../widgets/backoffice";

export const BackOfficeUserPage = () => {

    const { setMenu }= useBackOfficeMenu();

    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.User,
            sideMenu: SideMenuType.User
        });
    }, []);

    return (
        <BackOfficeUserWidget />
    )
}