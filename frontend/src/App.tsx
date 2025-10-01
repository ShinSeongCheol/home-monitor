import styles from './styles/App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForecastAdministrativeDistrictPage from './pages/ForecastAdministrativeDistrictPage';
import MiddleForecastAreaDistrict from './pages/MiddleForecastAreaDistrict';

import {AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import PostCreatePage from './pages/PostCreatePage';
import PostDetailPage from './pages/PostDetailPage';
import PostUpdatePage from './pages/PostUpdatePage';
import BoardPage from './pages/BoardPage';
import BackOfficeLayout, { SideMenuType } from './layouts/BackOfficeLayout';
import BackOfficeBoardPage from './pages/BackOfficeBoardPage';
import BackOfficeBoardRolePage from './pages/BackOfficeBoardRolePage';
import BackOfficeBoardRoleCodePage from './pages/BackOfficeBoardRoleCodePage';
import BackOfficePostPage from './pages/BackOfficePostPage';

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header></Header>
        <Navigation></Navigation>
        <Routes>
          {/* DashBoard */}
          <Route path="/" element={<DashboardPage/>}></Route>

          {/* Board */}
          <Route path="/boards/" element={<BoardPage/>}></Route>
          <Route path="/boards/:categoryCode" element={<PostPage />}></Route>
          <Route path="/boards/:categoryCode/post" element={<ProtectedRoute><PostCreatePage/></ProtectedRoute>}></Route>
          <Route path="/boards/:categoryCode/:postId" element={<PostDetailPage/>}></Route>
          <Route path="/boards/:categoryCode/:postId/edit" element={<ProtectedRoute><PostUpdatePage/></ProtectedRoute>}></Route>

          {/* Admin */}
          <Route path='/backoffice' element={<ProtectedRoute><BackOfficeLayout /></ProtectedRoute> }>
            <Route path="board" element={<BackOfficeBoardPage/>}></Route>
            <Route path="BoardRole" element={<BackOfficeBoardRolePage/>}></Route>
            <Route path="BoardRoleCode" element={<BackOfficeBoardRoleCodePage/>}></Route>
            <Route path="post" element={<BackOfficePostPage/>}></Route>
            <Route path="Comment" element={SideMenuType.Comment}></Route>
            <Route path="Reaction" element={SideMenuType.Reaction}></Route>
            <Route path="userRoleCode" element={SideMenuType.ReactionCode}></Route>

            <Route path="user" element={SideMenuType.User}></Route>
            <Route path="userRole" element={SideMenuType.UserRole}></Route>
            <Route path="ReactionCode" element={SideMenuType.UserRoleCode}></Route>

            <Route path="administrativeDistrict" element={<ForecastAdministrativeDistrictPage/>}></Route>
            <Route path="areaDistrict" element={<MiddleForecastAreaDistrict/>}></Route>
          </Route>

          {/* Auth */}
          <Route path='/auth' element={<AuthPage></AuthPage>}></Route>
          <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}></Route>

          {/* Error */}
          <Route path="*" element={<div>Page Not Found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
