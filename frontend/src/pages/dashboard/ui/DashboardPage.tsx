import { useEffect, useState } from 'react';
import { Droplet, Thermometer } from 'lucide-react';

import { getDht11TodayLog, type Dht11Log } from '../../../features/dht11';
import { getForecastRegionToday, type UltraShortNowcast } from '../../../features/forecast';
import { LineChartWidget, type Data, type Datasets } from '../../../widgets/LineChart';
import { TemperatureHumidityWidget } from '../../../widgets/TemperatureHumidity';

export const DashboardPage = () => {

    const [temperatureDatasets, setTemperatureDatasets] = useState<Datasets[]>([]);
    const [humidityDatasets, setHumidityDatasets] = useState<Datasets[]>([]);

    useEffect(() => {
        getDht11TodayLog()
        .then((data) => {
            const temperature: Data[] = data.map((d: Dht11Log) => {return ({x: new Date(d.measurementTime), y: d.temperature})});
            const humidity: Data[] = data.map((d: Dht11Log) => {return ({x: new Date(d.measurementTime), y: d.humidity})});
    
            const insideTemperature = {
                name: "inside temperature",
                data: temperature,
                color: "#FFB266"
            }
    
            const insideHumidity = {
                name: "inside humidity",
                data: humidity,
                color: "#85C1E9"
            }
    
            setTemperatureDatasets(prev => [
                ...prev.filter(data => data.name !== insideTemperature.name),
                insideTemperature]
            );
    
            setHumidityDatasets(prev => [
                ...prev.filter(data => data.name !== insideHumidity.name),
                insideHumidity]
            );
        })
        .catch(err => console.log(err));

        getDht11TodayLog();
        
        const interval = setInterval(getDht11TodayLog, 1000 * 60);

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {

        getForecastRegionToday()
        .then(data => {
            const temperature: Data[] = data.map((d: UltraShortNowcast) => {return ({x: new Date(`${d.baseDate} ${d.baseTime}`), y: d.t1h})});
            const humidity: Data[] = data.map((d: UltraShortNowcast) => {return ({x: new Date(`${d.baseDate} ${d.baseTime}`), y: d.reh})});

            const outsideTemperature = {
                name: "outside temperature",
                data: temperature,
                color: "#E74C3C"
            }
    
            const outsideHumidity = {
                name: "outside humidity",
                data: humidity,
                color: "#3498DB"
            }

            setTemperatureDatasets(prev => [
                ...prev.filter(data => data.name !== outsideTemperature.name),
                outsideTemperature]
            );

            setHumidityDatasets(prev => [
                ...prev.filter(data => data.name !== outsideHumidity.name),
                outsideHumidity]
            );
        })
        .catch(err => console.log(err));
        
        getForecastRegionToday();

        const interval = setInterval(getForecastRegionToday, 1000 * 60);
        return () => clearInterval(interval);
    }, [])
    
    return (
        <main className={'w-full h-full'}>
            <section className={'w-full my-0 mx-auto p-4 lg:w-5xl'}>
                <TemperatureHumidityWidget/>
                <LineChartWidget title='온도 추이 (24 시간)' icon={<Thermometer width={"24px"} height={"24px"} fill='#ffa2a2ff' color='#ffa2a2ff' strokeWidth={1}/>} datasets={temperatureDatasets}></LineChartWidget>
                <LineChartWidget title='습도 추이 (24 시간)' icon={<Droplet width={"24px"} height={"24px"} fill='#99ddfdff' color='#99ddfdff' strokeWidth={1}/>} datasets={humidityDatasets}></LineChartWidget>
            </section>
        </main>
    );
}
