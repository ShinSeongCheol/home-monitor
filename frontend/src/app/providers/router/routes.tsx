import type {RouteObject} from "react-router-dom";
import {DashboardPage} from "../../../pages/dashboard";
import {PostLayout} from "../../../pages/post/ui/PostLayout.tsx";
import {BoardInfoPage, BoardPage} from "../../../pages/board";
import {PostCreatePage, PostDetailPage, PostUpdatePage} from "../../../pages/post";
import {AuthLayout} from "../../../pages/auth";
import {LoginPage} from "../../../pages/auth/ui/LoginPage.tsx";
import {SignupPage} from "../../../pages/auth/ui/SignupPage.tsx";
import {MainLayout} from "../layout/MainLayout.tsx";
import ProfilePage from "../../../pages/auth/ui/ProfilePage.tsx";
import {BackOfficeBoardPage, BackOfficeLayout} from "../../../pages/backoffice";

export const routes: RouteObject[] = [
    {
        path: '/', element: <MainLayout/>, children: [
            {path: '', element: <DashboardPage/>},
            {
                path: '/boards', element: <PostLayout/>, children: [
                    {path: '', element: <BoardPage/>},
                    {path: ':categoryCode', element: <BoardInfoPage/>},

                    {path: ':categoryCode/post', element: <PostCreatePage/>},
                    {path: ':categoryCode/:postId', element: <PostDetailPage/>},
                    {path: ':categoryCode/:postId/edit', element: <PostUpdatePage/>},
                ]
            },

            {
                path: '/auth', element: <AuthLayout/>, children: [
                    {path: 'login', element: <LoginPage/>},
                    {path: 'signup', element: <SignupPage/>},
                ],
            },
            {path: '/auth/profile', element: <ProfilePage/>},

            {
                path: '/backoffice', element: <BackOfficeLayout/>, children: [
                    {path: 'board', element: <BackOfficeBoardPage />},
                ]
            },
        ]
    }
]