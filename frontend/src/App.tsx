import styles from './styles/App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ForecastAdministrativeDistrict from './ForecastAdministrativeDistrict';
import MiddleForecastAreaDistrict from './MiddleForecastAreaDistrict';

import {AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './Profile';
import AuthPage from './AuthPage';
import CkEditorComponent from './components/CkEditorComponent';
import BoardPostCreateComponent from './BoardPostCreate';
import Board from './Board';
import BoardList from './BoardList';
import BoardPostDetail from './BoardPostDetail';

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header></Header>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          {/* 게시판 종류 목록 */}
          <Route path="/boards/" element={<Board/>}></Route>
          {/* 게시판 글 목록 */}
          <Route path="/boards/:categoryCode" element={<BoardList />}></Route>
          {/* 게시판 글 추가 */}
          <Route path="/boards/:categoryCode/post" element={<ProtectedRoute><BoardPostCreateComponent/></ProtectedRoute>}></Route>
          {/* 게시판 글 조회 */}
          <Route path="/boards/:categoryCode/:postId" element={<BoardPostDetail/>}></Route>
          <Route path="/configuration/forecast/administrativeDistrict" element={<ProtectedRoute><ForecastAdministrativeDistrict></ForecastAdministrativeDistrict></ProtectedRoute>}></Route>
          <Route path="/configuration/forecast/AreaDistrict" element={<ProtectedRoute><MiddleForecastAreaDistrict></MiddleForecastAreaDistrict></ProtectedRoute>}></Route>
          <Route path='/auth' element={<AuthPage></AuthPage>}></Route>
          <Route path="/profile" element={<ProtectedRoute><Profile></Profile></ProtectedRoute>}></Route>
          <Route path="*" element={<div>Page Not Found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
