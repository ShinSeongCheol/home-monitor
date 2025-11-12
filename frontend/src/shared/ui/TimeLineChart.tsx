import {type LineSeries, ResponsiveLine} from "@nivo/line";
import type {ScaleTimeSpec, ScaleLinearSpec} from '@nivo/scales';
import type {AxisProps} from '@nivo/axes';
import type {Margin} from "@nivo/core";
import React from "react";

type TimeLineChartProps = {
    icon: React.JSX.Element;
    title: string;
    data: LineSeries[];
}

export const TimeLineChart = ({icon, title, data}: TimeLineChartProps) => {
    const xScale: ScaleTimeSpec = {
        type: 'time',
        format: '%Y-%m-%dT%H:%M:%S',
        precision: 'hour',
        useUTC: false,
    }

    const yScale: ScaleLinearSpec = {
        type: 'linear'
    }

    const axisBottom: AxisProps = {
        format: "%H:%M",
        tickValues: 'every 3 hour'
    }

    const margin: Partial<Margin> = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
    }

    return (
        <section className={'bg-white border border-gray-300'}>

            <h2 className={'mt-2 flex justify-center items-center gap-2 text-xl'}>
                {icon} {title}
            </h2>

            <div className={'h-48 sm:h-64 md:h-80'}>
                <ResponsiveLine
                    animate={true}
                    data={data}
                    xFormat={"time:%H:%M"}
                    xScale={xScale}
                    yScale={yScale}
                    curve={'linear'}
                    enablePoints={true}
                    enablePointLabel={true}
                    axisBottom={axisBottom}
                    margin={margin}
                    useMesh={true}
                />
            </div>
        </section>
    )
}