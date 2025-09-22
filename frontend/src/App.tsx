import styles from './styles/App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForecastAdministrativeDistrict from './pages/ForecastAdministrativeDistrict';
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
import BackOfficeLayout from './layouts/BackOfficeLayout';

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
            <Route path="board" element={<ForecastAdministrativeDistrict/>}></Route>
          </Route>
          
          <Route path="/configuration/forecast/administrativeDistrict" element={<ProtectedRoute><ForecastAdministrativeDistrict></ForecastAdministrativeDistrict></ProtectedRoute>}></Route>
          <Route path="/configuration/forecast/AreaDistrict" element={<ProtectedRoute><MiddleForecastAreaDistrict></MiddleForecastAreaDistrict></ProtectedRoute>}></Route>

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
