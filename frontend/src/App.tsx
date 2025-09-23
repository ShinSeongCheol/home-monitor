import styles from './styles/App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForecastAdministrativeDistrictComponent from './components/ForecastAdministrativeDistrictComponent';
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
            <Route path="board" element={SideMenuType.Board}></Route>
            <Route path="post" element={SideMenuType.Post}></Route>
            <Route path="BoardRole" element={SideMenuType.BoardRole}></Route>
            <Route path="BoardRoleCode" element={SideMenuType.BoardRoleCode}></Route>
            <Route path="Comment" element={SideMenuType.Comment}></Route>
            <Route path="Reaction" element={SideMenuType.Reaction}></Route>
            <Route path="userRoleCode" element={SideMenuType.ReactionCode}></Route>

            <Route path="user" element={SideMenuType.User}></Route>
            <Route path="userRole" element={SideMenuType.UserRole}></Route>
            <Route path="ReactionCode" element={SideMenuType.UserRoleCode}></Route>

            <Route path="administrativeDistrict" element={<ForecastAdministrativeDistrictComponent/>}></Route>
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
