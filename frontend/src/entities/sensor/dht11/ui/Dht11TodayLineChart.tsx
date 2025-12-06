import {useDht11TodayLineChart} from "../model/useDht11TodayLineChart.ts";
import {TimeLineChart} from "../../../../shared";
import {House} from "lucide-react";

export const Dht11TodayLineChart = () => {

    const {data} = useDht11TodayLineChart();

    if (!data) return;

    return (
        <TimeLineChart icon={<House width={"24px"} height={"24px"} color='oklch(44.6% 0.043 257.281)' strokeWidth={1}/>} title={'실내 온습도 추이 (24 시간)'} data={data}/>
    )
}