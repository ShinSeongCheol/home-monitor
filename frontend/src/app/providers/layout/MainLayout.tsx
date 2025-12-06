import {HeaderWidget} from "../../../widgets/header";
import {NavigationWidget} from "../../../widgets/navigation";
import {Outlet} from "react-router-dom";

export const MainLayout = () => {
    return (
        <div className='flex flex-col items-center h-full '>
            <HeaderWidget/>
            <NavigationWidget/>
            <Outlet />
        </div>
    )
}