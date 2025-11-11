import {BackOfficeBoardRoleWidget} from "../../../widgets/backoffice";
import useBackOfficeMenu from "../../../hooks/useBackOfficeMenu.tsx";
import {useEffect} from "react";
import {MenuType, SideMenuType} from "./BackOfficeLayout.tsx";

export const BackOfficeBoardRolePage = () => {

    const { setMenu }= useBackOfficeMenu();

    // 초기화
    useEffect(() => {
        setMenu({
            menu: MenuType.Board,
            sideMenu: SideMenuType.BoardRole
        });
    }, []);

    return (
        <BackOfficeBoardRoleWidget />
    )
}