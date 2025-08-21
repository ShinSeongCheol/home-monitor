import styles from './styles/App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ForecastAdministrativeDistrict from './ForecastAdministrativeDistrict';
import MiddleForecastAreaDistrict from './MiddleForecastAreaDistrict';

import {AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Login from './Login';
import Signup from './Signup';
import ProtectedRoute from './components/ProtectedRoute';

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header></Header>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          <Route path="/configuration/forecast/administrativeDistrict" element={<ProtectedRoute><ForecastAdministrativeDistrict></ForecastAdministrativeDistrict></ProtectedRoute>}></Route>
          <Route path="/configuration/forecast/AreaDistrict" element={<ProtectedRoute><MiddleForecastAreaDistrict></MiddleForecastAreaDistrict></ProtectedRoute>}></Route>
          <Route path="*" element={<div>Page Not Found</div>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
