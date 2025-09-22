import styles from './styles/App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import ForecastAdministrativeDistrict from './ForecastAdministrativeDistrict';
import MiddleForecastAreaDistrict from './MiddleForecastAreaDistrict';

import {AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './ProfilePage';
import AuthPage from './AuthPage';
import PostPage from './PostPage';
import PostCreatePage from './PostCreatePage';
import PostDetailPage from './PostDetailPage';
import PostUpdatePage from './PostUpdatePage';
import BoardPage from './BoardPage';

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
          <Route path="/configuration/forecast/administrativeDistrict" element={<ProtectedRoute><ForecastAdministrativeDistrict></ForecastAdministrativeDistrict></ProtectedRoute>}></Route>
          <Route path="/configuration/forecast/AreaDistrict" element={<ProtectedRoute><MiddleForecastAreaDistrict></MiddleForecastAreaDistrict></ProtectedRoute>}></Route>
          <Route path='/auth' element={<AuthPage></AuthPage>}></Route>
          <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}></Route>
          <Route path="*" element={<div>Page Not Found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
