import { useEffect } from 'react';
import { MenuType, SideMenuType } from './BackOfficeLayout.tsx';
import useBackOfficeMenu from '../../../hooks/useBackOfficeMenu.tsx';
import {BackOfficeReactionCodeWidget} from "../../../widgets/backoffice";

export const BackOfficeReactionCodePage = () => {

    const { setMenu }= useBackOfficeMenu();

    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.Board,
            sideMenu: SideMenuType.ReactionCode
        });
    }, []);

    return (
        <BackOfficeReactionCodeWidget />
    )
}