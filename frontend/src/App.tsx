import './styles/App.css'
import InfoCard from './components/InfoCard'
import { useEffect, useState } from 'react'

function App() {

  const [measurementTime, setMesurementTime] = useState<string | number>('--');
  const [temperature, setTemperature] = useState<string | number>('--');
  const [humidity, setHumidity] = useState<string | number>('--');
  
  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:8080/api/v1/dht11/log/latest')
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
      <div className="app">
        <h1>🏠 Home Monitoring Dashboard</h1>

        <InfoCard id='temp' value={temperature} unit='°C' label='Temperature'></InfoCard>
        <InfoCard id='humidity' value={humidity} unit='%' label='humidity'></InfoCard>

        <div className="timestamp" id="timestamp">Last updated: {measurementTime}</div>
      </div>
    </>
  )
}

export default App
