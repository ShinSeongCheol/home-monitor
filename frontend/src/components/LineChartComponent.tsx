import { useEffect, useRef } from 'react';
import styles from '../styles/LineChartComponent.module.css';
import * as d3 from 'd3';

const LineChartComponent = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const xScale = d3.scaleLinear().domain([0,100]).range([0, 1024]);
        const svgElement = d3.select(svgRef.current);
        const axisGenerator = d3.axisBottom(xScale);

        console.log()

        svgElement.append('g').call(axisGenerator);
    }, [])

    return(
        <div className={styles.container}>
            <svg ref={svgRef} className={styles.chartSvg}></svg>
        </div>
    )
}

export default LineChartComponent;