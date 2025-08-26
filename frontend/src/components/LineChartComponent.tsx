import { useMemo, useRef } from 'react';
import styles from '../styles/LineChartComponent.module.css';
import * as d3 from 'd3';


type LineChartComponentProps = {
    title: string;
    icon: React.ReactNode
};

const LineChartComponent = ({title, icon} : LineChartComponentProps) => {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const containerWidth = containerRef.current?.offsetWidth ?? 1024;
    const containerHeight = containerRef.current?.offsetHeight ?? 300;

    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 20;
    const marginLeft = 40;

    const xDomain = [0,100]
    const xRange = [marginLeft, containerWidth - marginRight]

    const xTicks = useMemo(() => {
        const xScale = d3.scaleLinear()
            .domain(xDomain)
            .range(xRange)

        const width = xRange[1] - xRange[0];
        const pixelsPerTick = 30;
        const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));

        return xScale.ticks(numberOfTicksTarget)
            .map(value => ({
                value,
                xOffset: xScale(value)
            }));
    }, [containerWidth])

    const yDomain = [100, 0]
    const yRange = [marginBottom, containerHeight - marginTop]

    const yTicks = useMemo(() => {
        const yScale = d3.scaleLinear()
            .domain(yDomain)
            .range(yRange)

        const height = yRange[1] - yRange[0];
        const pixelsPerTick = 10;
        const numberOfTicksTarget = Math.max(1, Math.floor(height / pixelsPerTick));

        return yScale.ticks(numberOfTicksTarget)
            .map(value => ({
                value,
                yOffset: yScale(value)
            }));
    }, [containerHeight])

    console.log(yTicks);

    return (
        <div className={styles.container} ref={containerRef}>
            <h2>{icon} {title}</h2>
            <svg width={containerWidth} height={containerHeight}>
                <path d={["M", -6, yRange[0], "H", 0, "V", yRange[1], "H", -6].join(" ")} fill='none' stroke='currentColor' transform={`translate(${marginLeft}, 0)`}></path>
                {yTicks.map(({ value, yOffset }) => (
                    <g key={value} transform={`translate(${marginLeft}, ${yOffset})`}>
                        <line x2="-6" stroke='currentColor'></line>
                        <text key={value} style={{fontSize: "10px", textAnchor: "middle", transform: "translateX(-20px)"}}>{value}</text>
                    </g>
                ))}

                <path d={["M", xRange[0], 6, "v", -6, "H", xRange[1], "v", 6].join(" ")} fill='none' stroke='currentColor' transform={`translate(0, ${containerHeight - marginBottom})`}></path>
                {xTicks.map(({ value, xOffset }) => (
                    <g key={value} transform={`translate(${xOffset}, ${containerHeight - marginBottom})`}>
                        <line y2="6" stroke='currentColor'></line>
                        <text key={value} style={{fontSize: "10px", textAnchor: "middle", transform: "translateY(20px)"}}>{value}</text>
                    </g>
                ))}
            </svg>
        </div>
    )

}

export default LineChartComponent;