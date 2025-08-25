import { useEffect, useRef } from 'react';
import styles from '../styles/LineChartComponent.module.css';
import * as d3 from 'd3';

const LineChartComponent = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const svgElement = d3.select(svgRef.current);

        const width = svgRef.current?.getBoundingClientRect().width ?? 1024;
        const height = 400;

        const marginTop = 20;
        const marginRight = 30;
        const marginBottom = 20;
        const marginLeft = 20;

        svgElement.attr('viewBox', `0 0 ${width} ${height}`);


        const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
        const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisRight(yScale);

        svgElement.append("g")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(xAxis);

        svgElement.append("g")
        .attr("transform", `translate(${marginLeft}, 0)`)
        .call(yAxis);
    }, [])

    return(
        <div className={styles.container}>
            <svg ref={svgRef} className={styles.chartSvg}></svg>
        </div>
    )
}

export default LineChartComponent;