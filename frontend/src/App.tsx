import './styles/App.css'
import InfoCard from './components/InfoCard'
import { useEffect, useState } from 'react'

function App() {

  const [temperature, setTemperature] = useState<string | number>('--');
  const [humidity, setHumidity] = useState<string | number>('--');
  
  useEffect(() => {
    let response = fetch('http://seongcheol.tplinkdns.com:30004/api/v1/dht11/log/last')
    console.log(response);
  }, [])

  return (
    <>
      <div className="app">
        <h1>🏠 Home Monitoring Dashboard</h1>

        <InfoCard id='temp' value={0} unit='°C' label='Temperature'></InfoCard>
        <InfoCard id='humidity' value={0} unit='%' label='humidity'></InfoCard>

        <div className="timestamp" id="timestamp">Last updated: --</div>
      </div>
    </>
  )
}

export default App
