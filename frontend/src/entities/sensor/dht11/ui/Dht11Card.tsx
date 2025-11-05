import {Droplet, Thermometer} from "lucide-react";
import {useDht11Card} from "../model/useDht11Card.ts";
import {Card} from "../../ui/Card.tsx";

export const Dht11Card = () => {

    const {dht11LatestLog} = useDht11Card();

    return (
        <div className={"w-full flex flex-col gap-1"}>
            <Card label={"실내 온도"} icon={<Thermometer size={'24px'} fill='#FFB266' color='#FFB266' strokeWidth={1}/>} value={`${dht11LatestLog?.temperature ?? ""}°C`} time={dht11LatestLog?.measurementTime.toLocaleString() ?? ""}/>
            <Card label={"실내 습도"} icon={<Droplet size={'24px'} fill='#85C1E9' color='#85C1E9' strokeWidth={1}/>} value={`${dht11LatestLog?.temperature ?? ""}%`} time={dht11LatestLog?.measurementTime.toLocaleString() ?? ""}/>
        </div>
    )
}