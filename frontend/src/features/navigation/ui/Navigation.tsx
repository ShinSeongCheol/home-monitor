import {LayoutDashboard, Settings, SquarePen} from "lucide-react";
import {Link} from "react-router-dom";
import {useNavigation} from "../model/useNavigation.ts";

export const Navigation = () => {

    const {auth, location} = useNavigation();
    const active = 'bg-blue-100 border-b-2 border-b-blue-200';
    const isAdmin = auth?.authorities?.some(a => a.authority === "ROLE_ADMIN");

    return (
        <div className={'w-full max-w-5xl'}>
            <ul className={'flex justify-start items-center gap-1 px-4'}>

                <li className={`flex items-center gap-1 font-[DMSans] text-base hover:bg-blue-100 hover:border-b-2 hover:border-b-blue-200 ${location.pathname === '/' ? active : ''}`}>
                    <LayoutDashboard size={"16px"} color={"gray"} strokeWidth={1}/>
                    <Link to={"/"}>대시보드</Link>
                </li>

                <li className={`flex items-center gap-1 font-[DMSans] text-base ${location.pathname.includes('/boards') ? active : ''}`}>
                    <SquarePen size={"16px"} color={"gray"} strokeWidth={1}/>
                    <Link to={"/boards"}>게시판</Link>
                </li>

                {isAdmin &&
                    <li className={`flex items-center gap-1 font-[DMSans] text-base ${location.pathname.includes('/backoffice') ? active : ''}`}>
                        <Settings size={"16px"} color={"gray"} strokeWidth={1}/>
                        <Link to={"/backoffice/board"}>설정</Link>
                    </li>
                }
            </ul>
        </div>
    )
}