import { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../styles/components/LineChartComponent.module.css';
import * as d3 from 'd3';
import type { Data, Datasets } from '../pages/DashboardPage';


type LineChartComponentProps = {
    title: string;
    icon: React.ReactNode;
    datasets: Datasets[];
};

const LineChartComponent = ({ title, icon, datasets }: LineChartComponentProps) => {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerWidth, setContainerWidth] = useState(containerRef.current?.offsetWidth ?? 1024);
    const [containerHeight, setContainerHeight] = useState(containerRef.current?.offsetHeight ?? 300);

    const marginTop = 20;
    const marginRight = 0;
    const marginBottom = 20;
    const marginLeft = 0;

    const data = datasets.map(dataset => dataset.data.map(item => item.y));
    const flatedData = data.flat();
    const yMax = d3.max(flatedData) ?? 100

    const xDomain = [d3.timeDay.floor(new Date()), d3.timeHour.offset(d3.timeDay.ceil(new Date()), -1)]
    const xRange = [marginLeft, containerWidth - marginRight]

    const yDomain = [yMax, 0]
    const yRange = [marginBottom, containerHeight - marginTop]

    const xScale = useMemo(() => {
        return d3.scaleTime().domain(xDomain).range(xRange);
    }, [xDomain, containerWidth])

    const yScale = useMemo(() => {
        return d3.scaleLinear().domain(yDomain).range(yRange);
    }, [yDomain, containerHeight])

    const xTicks = useMemo(() => {
        const xScale = d3.scaleTime()
            .domain(xDomain)
            .range(xRange)

        const timeFormatter = d3.timeFormat("%H:%M")
        const width = xRange[1] - xRange[0];
        const pixelsPerTick = 60;
        const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));

        return xScale.ticks(numberOfTicksTarget)
            .map(value => ({
                value: timeFormatter(value),
                xOffset: xScale(value)
            }));
    }, [xRange, containerWidth])

    const yTicks = useMemo(() => {
        const yScale = d3.scaleLinear()
            .domain(yDomain)
            .range(yRange)

        const height = yRange[1] - yRange[0];
        const pixelsPerTick = 30;
        const numberOfTicksTarget = Math.max(1, Math.floor(height / pixelsPerTick));

        return yScale.ticks(numberOfTicksTarget)
            .map(value => ({
                value,
                yOffset: yScale(value)
            }));
    }, [yRange, containerHeight])

    const lineGenerator = d3.line<Data>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

    // 리사이즈 옵저버 추가
    useEffect(() => {
        const container = containerRef.current;

        const resizeObserver = new ResizeObserver((entries) => {
            for(let entry of entries) {
                const {width, height} = entry.contentRect;
                setContainerWidth(width);
                setContainerHeight(height);
            }
        })

        if(container) resizeObserver.observe(container);

        return () => resizeObserver.disconnect();
    }, [])

    return (
        <div className={styles.container} ref={containerRef}>
            <h2>{icon} {title}</h2>
            <svg className={`${styles.svg}`} viewBox={`0 0 ${containerWidth} ${containerHeight}`} >
                {yTicks.map(({ value, yOffset }) => (
                    <g key={value} transform={`translate(${xRange[0]}, ${yOffset})`}>
                        <path d={`M ${xRange[0]} ${yRange[0]} H ${xRange[1]}`} fill='none' stroke='#e4dcdcff' transform={`translate(0, -${yRange[0]})`} />
                        <text style={{ fontSize: "10px", textAnchor: "middle" }} transform={`translate(-20, 0)`}>{value}</text>
                    </g>
                ))}

                {xTicks.map(({ value, xOffset }) => (
                    <g key={value} transform={`translate(${xOffset}, ${yRange[0]})`} >
                        <path d={`M ${xRange[0]} ${yRange[0]} V ${yRange[1]}`} fill='none' stroke='#e4dcdcff' transform={`translate(0, -${yRange[0]})`} ></path>
                        <text style={{ fontSize: "10px", textAnchor: "middle" }} transform={`translate(0, ${yRange[1]})`}>{value}</text>
                    </g>
                ))}

                {datasets.map((data) => {
                    return <path key={data.name} d={lineGenerator(data.data) ?? ""} fill='none' stroke={data.color} strokeWidth={'2'}></path>
                })}
            </svg>
        </div>
    )

}

export default LineChartComponent;