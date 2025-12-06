import {Dht11Card, ForecastCard} from "../../../entities/sensor";
import {Dht11TodayLineChart} from "../../../entities/sensor/dht11/ui/Dht11TodayLineChart.tsx";
import {ForecastLineChart} from "../../../entities/sensor/forecast/ui/ForecastLineChart.tsx";

export const DashboardWidget = () => {

    return (
        <section className={'w-full my-0 mx-auto p-4 lg:w-5xl'}>
            <div className={"flex gap-1"}>
                <Dht11Card/>
                <ForecastCard/>
            </div>

            <div className={'mt-2 flex flex-col gap-2'}>
                <Dht11TodayLineChart/>
                <ForecastLineChart/>
            </div>

        </section>
    )
}