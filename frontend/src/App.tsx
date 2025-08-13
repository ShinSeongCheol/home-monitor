import styles from './styles/App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';

function App() {

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
