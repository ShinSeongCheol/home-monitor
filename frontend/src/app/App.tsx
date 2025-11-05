import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ForecastAdministrativeDistrictPage from '../pages/ForecastAdministrativeDistrictPage';
import MiddleForecastAreaDistrict from '../pages/MiddleForecastAreaDistrict';

import {AllCommunityModule, ModuleRegistry} from 'ag-grid-community';
import ProtectedRoute from '../components/ProtectedRoute';
import {DashboardPage} from '../pages/dashboard';
import ProfilePage from '../pages/ProfilePage';
import BackOfficeLayout from '../layouts/BackOfficeLayout';
import BackOfficeBoardPage from '../pages/BackOfficeBoardPage';
import BackOfficeBoardRolePage from '../pages/BackOfficeBoardRolePage';
import BackOfficeBoardRoleCodePage from '../pages/BackOfficeBoardRoleCodePage';
import BackOfficePostPage from '../pages/BackOfficePostPage';
import BackOfficeCommentPage from '../pages/BackOfficeCommentPage';
import BackOfficeReactionPage from '../pages/BackOfficeReactionPage';
import BackOfficeReactionCodePage from '../pages/BackOfficeReactionCodePage';
import BackOfficeUserRoleCodePage from '../pages/BackOfficeUserRoleCodePage.';
import BackOfficeUserRolePage from '../pages/BackOfficeUserRolePage';
import BackOfficeUserPage from '../pages/BackOfficeUserPage';
import {HeaderWidget} from '../widgets/Header';
import {NavigationWidget} from '../widgets/Navigation';
import {BoardInfoPage, BoardPage} from "../pages/board";
import {PostCreatePage, PostDetailPage, PostUpdatePage} from '../pages/post';
import {PostLayout} from "../pages/post/ui/PostLayout.tsx";
import {AuthLayout} from "../pages/auth";
import {LoginPage} from "../pages/auth/ui/LoginPage.tsx";
import {SignupPage} from "../pages/auth/ui/SignupPage.tsx";

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {

    return (
        <div className='h-full flex flex-col items-center'>
            <BrowserRouter>
                <HeaderWidget/>
                <NavigationWidget/>

                <Routes>
                    {/* DashBoard */}
                    <Route path="/" element={<DashboardPage/>}></Route>

                    {/* Board */}
                    <Route path={"/boards"} element={<PostLayout/>}>
                        {/*게시판*/}
                        <Route path="" element={<BoardPage/>}/>
                        <Route path=":categoryCode" element={<BoardInfoPage/>}/>

                        {/*게시글*/}
                        <Route path=":categoryCode/post" element={<ProtectedRoute><PostCreatePage/></ProtectedRoute>}/>
                        <Route path=":categoryCode/:postId" element={<PostDetailPage/>}/>
                        <Route path=":categoryCode/:postId/edit" element={<ProtectedRoute><PostUpdatePage/></ProtectedRoute>}/>
                    </Route>

                    {/* Admin */}
                    <Route path='/backoffice' element={<ProtectedRoute><BackOfficeLayout/></ProtectedRoute>}>
                        <Route path="board" element={<BackOfficeBoardPage/>}></Route>
                        <Route path="BoardRole" element={<BackOfficeBoardRolePage/>}></Route>
                        <Route path="BoardRoleCode" element={<BackOfficeBoardRoleCodePage/>}></Route>
                        <Route path="post" element={<BackOfficePostPage/>}></Route>
                        <Route path="comment" element={<BackOfficeCommentPage/>}></Route>
                        <Route path="reaction" element={<BackOfficeReactionPage/>}></Route>
                        <Route path="reactionCode" element={<BackOfficeReactionCodePage/>}></Route>

                        <Route path="user" element={<BackOfficeUserPage/>}></Route>
                        <Route path="userRole" element={<BackOfficeUserRolePage/>}></Route>
                        <Route path="userRoleCode" element={<BackOfficeUserRoleCodePage/>}></Route>

                        <Route path="administrativeDistrict" element={<ForecastAdministrativeDistrictPage/>}></Route>
                        <Route path="areaDistrict" element={<MiddleForecastAreaDistrict/>}></Route>
                    </Route>

                    {/* Auth */}
                    <Route path={'/auth'} element={<AuthLayout/>}>
                        <Route path='login' element={<LoginPage />}/>
                        <Route path='signup' element={<SignupPage />}/>
                        {/*<Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}></Route>*/}
                    </Route>

                    {/* Error */}
                    <Route path="*" element={<div>Page Not Found</div>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
