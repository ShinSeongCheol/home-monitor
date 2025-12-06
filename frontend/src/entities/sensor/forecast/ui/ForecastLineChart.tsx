import {useForecastLineChart} from "../model/useForecastLineChart.ts";
import {Trees} from "lucide-react";
import {TimeLineChart} from "../../../../shared";

export const ForecastLineChart = () => {

    const {data} = useForecastLineChart();

    if (!data) return;

    return (
        <TimeLineChart icon={<Trees width={"24px"} height={"24px"} color='oklch(72.3% 0.219 149.579)' strokeWidth={1}/>} title={'외부 온습도 추이 (24 시간)'} data={data}/>
    )
}