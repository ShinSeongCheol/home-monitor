import { useEffect } from 'react';
import { MenuType, SideMenuType } from './BackOfficeLayout.tsx';
import useBackOfficeMenu from '../../../hooks/useBackOfficeMenu.tsx';
import {BackOfficeReactionWidget} from "../../../widgets/backoffice";

export const BackOfficeReactionPage = () => {

    const { setMenu }= useBackOfficeMenu();

    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.Board,
            sideMenu: SideMenuType.Reaction
        });
    }, []);

    return (
        <BackOfficeReactionWidget />
    )
}