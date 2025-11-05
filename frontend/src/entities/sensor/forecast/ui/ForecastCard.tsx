import {Droplet, Thermometer} from "lucide-react";
import {useForecastCard} from "../model/useForecastCard.ts";
import {Card} from "../../ui/Card.tsx";

export const ForecastCard = () => {

    const {forecastLatestLog} = useForecastCard();

    return (
        <div className={"w-full flex flex-col gap-1"}>
            <Card label={"외부 온도"} icon={<Thermometer size={'24px'} fill='#E74C3C' color='#E74C3C' strokeWidth={1}/>} value={`${forecastLatestLog?.t1h ?? ""}°C`} time={new Date(forecastLatestLog?.baseDate + " " + forecastLatestLog?.baseTime).toLocaleString()}/>
            <Card label={"외부 습도"} icon={<Droplet size={'24px'} fill='#3498DB' color='#3498DB' strokeWidth={1}/>} value={`${forecastLatestLog?.reh ?? ""}%`} time={new Date(forecastLatestLog?.baseDate + " " + forecastLatestLog?.baseTime).toLocaleString()}/>
        </div>
    )
}