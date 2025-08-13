import styles from './styles/App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ForecastAdministrativeDistrict from './ForecastAdministrativeDistrict';
import MiddleForecastAreaDistrict from './MiddleForecastAreaDistrict';

function App() {

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          <Route path="/configuration/forecast/administrativeDistrict" element={<ForecastAdministrativeDistrict></ForecastAdministrativeDistrict>}></Route>
          <Route path="/configuration/forecast/AreaDistrict" element={<MiddleForecastAreaDistrict></MiddleForecastAreaDistrict>}></Route>
          <Route path="*" element={<div>Page Not Found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
