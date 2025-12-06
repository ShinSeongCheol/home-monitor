import { useEffect } from 'react';
import { MenuType, SideMenuType } from './BackOfficeLayout.tsx';
import useBackOfficeMenu from '../../../features/backoffice/lib/useBackOfficeMenu.tsx';
import {BackOfficeBoardWidget} from "../../../widgets/backoffice";

export const BackOfficeBoardPage = () => {

    const { setMenu }= useBackOfficeMenu();
    
    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.Board,
            sideMenu: SideMenuType.Board
        });
    }, []);

    return (
        <BackOfficeBoardWidget />
    )
}