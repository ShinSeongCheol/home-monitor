import { ChevronRight, KeyRound, List, Shield, SquarePen, SunMedium, TextAlignJustify, User } from 'lucide-react';

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

export type Board = {
    id: number;
    categoryCode: string | null;
    categoryName: string | null;
    comment: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export type BoardRole = {
    id: number;
    board: Board;
    boardRoleCode: BoardRoleCode;
}

export type BoardRoleCode = {
    id: number;
    code: string;
    name: string;
}

export type Post = {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    member: Member[];
    comments: Comment[];
}

export type Comment = {
    id: number | null;
    content: string;
    parentComment: number;
    comments: Comment[];
    member: Member[];
    post: Post[];
    createdAt: Date;
    updatedAt: Date;
    reactions: Reaction[];
}

export type Reaction = {
    id: number;
}

export type ReactionCode = {
    id: number;
    code: string;
    name: string;
}

export type Member = {
    id: number;
    email: string;
    username: string;
    password: string;
}

export type MemberRoleCode = {
    id: number;
    code: string;
    name: string;
}

export const BackOfficeLayout = () => {

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
        <div className={'w-full h-[calc(100dvh-(29px+39px))] flex'}>
            <aside className={'w-[240px] border border-gray-200 bg-white'}>
                <div className={'flex justify-between items-center p-4 border-b border-b-gray-300'}>메뉴<TextAlignJustify strokeWidth={1} /></div>
                <nav className={''}>
                    <ul>
                        <li className={'border-b border-b-gray-300'}>
                            <div className={`flex justify-between p-4 gap-1 border-b-gray-300 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm ${openMenu === MenuType.Board ? 'bg-gray-200' : ""}`} onClick={() => toggleMenu(MenuType.Board)}>
                                <SquarePen size={'16px'} strokeWidth={1} />
                                <span>게시판 관리</span>
                                <ChevronRight className={`transition duration-200 ${openMenu === MenuType.Board ? 'rotate-90' : ""}`} size={'16px'} strokeWidth={1} />
                            </div>

                            <ul className={`flex flex-col gap-1 max-h-0 transition-all duration-1000 overflow-hidden  ${openMenu === MenuType.Board ? 'max-h-96' : ""}`}>
                                <li className={`flex gap-4 p-1 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm ${openSideMenu === SideMenuType.Board ? 'bg-gray-200' : ""}`} onClick={() => clickSideMenu(SideMenuType.Board)}><List size={'16px'} strokeWidth={1} /> 게시판 목록</li>
                                <li className={`flex gap-4 p-1 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm ${openSideMenu === SideMenuType.BoardRole ? 'bg-gray-200' : ""}`} onClick={() => clickSideMenu(SideMenuType.BoardRole)}><Shield size={'16px'} strokeWidth={1} /> 게시판 권한 </li>
                                <li className={`flex gap-4 p-1 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm ${openSideMenu === SideMenuType.BoardRoleCode ? 'bg-gray-200' : ""}`} onClick={() => clickSideMenu(SideMenuType.BoardRoleCode)}><KeyRound size={'16px'} strokeWidth={1} /> 게시판 권한 코드</li>
                                <li className={`flex gap-4 p-1 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm ${openSideMenu === SideMenuType.Post ? 'bg-gray-200' : ""}`} onClick={() => clickSideMenu(SideMenuType.Post)}><List size={'16px'} strokeWidth={1} /> 게시물 목록</li>

                                <li className={`flex gap-4 p-1 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm ${openSideMenu === SideMenuType.Comment ? 'bg-gray-200' : ""}`} onClick={() => clickSideMenu(SideMenuType.Comment)}><List size={'16px'} strokeWidth={1} /> 댓글 목록</li>

                                <li className={`flex gap-4 p-1 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm ${openSideMenu === SideMenuType.Reaction ? 'bg-gray-200' : ""}`} onClick={() => clickSideMenu(SideMenuType.Reaction)}><List size={'16px'} strokeWidth={1} /> 반응 목록</li>
                                <li className={`flex gap-4 p-1 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm ${openSideMenu === SideMenuType.ReactionCode ? 'bg-gray-200' : ""}`} onClick={() => clickSideMenu(SideMenuType.ReactionCode)}><KeyRound size={'16px'} strokeWidth={1} /> 반응 코드</li>
                            </ul>

                        </li>

                        <li className={'border-b border-b-gray-300'}>
                            <div className={`flex justify-between p-4 gap-1 border-b-gray-300 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm  ${openMenu === MenuType.User ? 'bg-gray-200' : ""}`} onClick={() => toggleMenu(MenuType.User)}>
                                <User size={'16px'} strokeWidth={1} />
                                <span>사용자 관리</span>
                                <ChevronRight className={`transition duration-200 ${openMenu === MenuType.User ? 'rotate-90' : ""}`} size={'16px'} strokeWidth={1} />
                            </div>

                            <ul className={`flex flex-col gap-1 max-h-0 transition-all duration-1000 overflow-hidden ${openMenu === MenuType.User ? 'max-h-96' : ""}`}>
                                <li className={`flex gap-4 p-1 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm ${openSideMenu === SideMenuType.User ? 'bg-gray-200' : ""}`} onClick={() => clickSideMenu(SideMenuType.User)}><List size={'16px'} strokeWidth={1} /> 사용자 목록</li>
                                <li className={`flex gap-4 p-1 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm ${openSideMenu === SideMenuType.UserRole ? 'bg-gray-200' : ""}`} onClick={() => clickSideMenu(SideMenuType.UserRole)}><Shield size={'16px'} strokeWidth={1} /> 사용자 권한</li>
                                <li className={`flex gap-4 p-1 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm ${openSideMenu === SideMenuType.UserRoleCode ? 'bg-gray-200' : ""}`} onClick={() => clickSideMenu(SideMenuType.UserRoleCode)}><KeyRound size={'16px'} strokeWidth={1} /> 사용자 권한 코드</li>
                            </ul>
                        </li>

                        <li className={'border-b border-b-gray-300'}>
                            <div className={`flex justify-between p-4 gap-1 border-b-gray-300 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm  ${openMenu === MenuType.Weather ? 'bg-gray-200' : ""}`} onClick={() => toggleMenu(MenuType.Weather)}>
                                <SunMedium size={'16px'} strokeWidth={1} />
                                <span>기상 데이터 관리</span>
                                <ChevronRight className={`transition duration-200 ${openMenu === MenuType.Weather ? 'rotate-90' : ""}`} size={'16px'} strokeWidth={1} />
                            </div>

                            <ul className={`flex flex-col gap-1 max-h-0 transition-all duration-1000 overflow-hidden ${openMenu === MenuType.Weather ? 'max-h-96' : ""}`}>
                                <li className={`flex gap-4 p-1 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm ${openSideMenu === SideMenuType.AdministrativeDistrict ? 'bg-gray-200' : ""}`} onClick={() => clickSideMenu(SideMenuType.AdministrativeDistrict)}><KeyRound size={'16px'} strokeWidth={1} /> 행정 구역 코드</li>
                                <li className={`flex gap-4 p-1 select-none hover:bg-gray-200 hover:cursor-pointer hover:rounded-sm ${openSideMenu === SideMenuType.AreaDistrict ? 'bg-gray-200' : ""}`} onClick={() => clickSideMenu(SideMenuType.AreaDistrict)}><KeyRound size={'16px'} strokeWidth={1} /> 구역 코드</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className={'w-full h-full'}>
                <Outlet context={{setOpenMenu, setOpenSideMenu}} />
            </main>
        </div>
    )
}