import styles from './styles/App.module.css'
import InfoCard from './components/InfoCard'
import { useEffect, useState } from 'react'
import LineChart from './components/LineChart';

function App() {

  const [measurementTime, setMesurementTime] = useState<string | number>('--');
  const [temperature, setTemperature] = useState<string | number>('--');
  const [humidity, setHumidity] = useState<string | number>('--');
  
  useEffect(() => {
    const fetchData = () => {
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/dht11/log/latest`)
      .then(response => response.json())
      .then(data => {
          const measurementTime = data.measurementTime;
          const temperature = data.temperature;
          const humidity = data.humidity;
  
          setMesurementTime(measurementTime);
          setTemperature(temperature);
          setHumidity(humidity);
        }
      )
    }

    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <div className={styles.app}>
        <div className={styles.container}>
          <InfoCard id='temp' value={temperature} unit='°C' label='🌡️ 현재 온도'></InfoCard>
          <InfoCard id='humidity' value={humidity} unit='%' label='💧 현재 습도'></InfoCard>
        </div>
        <div>
          <LineChart></LineChart>
        </div>
        <div className="timestamp" id="timestamp">Last updated: {measurementTime}</div>
      </div>
    </>
  )
}

export default App
