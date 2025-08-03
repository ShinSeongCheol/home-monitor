import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DataItem {
    temperature: number,
    humidity: number,
    measurementTime: string
}

interface LineChartProps {
}

const LineChart: React.FC<LineChartProps> = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [data, setData] = useState<DataItem[]>([]);

    const isoFormat = d3.timeFormat("%Y-%m-%dT%H:%M:%S");
    const startTimeDay = isoFormat(d3.timeDay.floor(new Date()));
    const endTimeDay = isoFormat(d3.timeDay.ceil(new Date()));

    const width = 800;
    const height = 200;

    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 20;
    const marginLeft = 30;

    useEffect(() => {
         const fetchData = () => {
            d3.json<DataItem[]>(`${import.meta.env.VITE_API_URL}/api/v1/dht11/log/range?start=${startTimeDay}&end=${endTimeDay}`)
                .then(response => {
                    if (response) {
                        setData(response);
                    }
                })
                .catch(error => console.error(error));
        }

        fetchData();

        const interval = setInterval(fetchData, 1000 * 60);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const svgElement = d3.select(svgRef.current);

        const measurementTime = data.map((d) => new Date(d.measurementTime));
        const flatHumidityAndTemperature = d3.union(data.flatMap((d) => [(d.humidity), d.temperature]));

        const x = d3.scaleUtc().domain(d3.extent(measurementTime) as [Date, Date]).range([marginLeft, width - marginRight]);
        const y = d3.scaleLinear().domain([0, d3.max(flatHumidityAndTemperature)] as [number, number]).range([height - marginBottom, marginTop]);

        
        const temperatureLine = d3.line<DataItem>()
        .x(d => x(new Date(d.measurementTime)))
        .y(d => y(d.temperature))
        ;
        
        const humidityLine = d3.line<DataItem>()
        .x(d => x(new Date(d.measurementTime)))
        .y(d => y(d.humidity))
        ;

        svgElement.selectAll('*').remove();

        svgElement.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('d', temperatureLine)
        ;
        
        svgElement.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('d', humidityLine)
        ;
        
        svgElement.append("g")
            .attr("transform", `translate(0, ${height - marginBottom})`)
            .call(d3.axisBottom(x))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").remove())
        ;

        svgElement.append('g')
            .attr("transform", `translate(${marginLeft}, 0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll("line"))
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width - marginLeft - marginRight)
                .attr("stroke-opacity", 0.1)
            )
        ;

    }, [data]);

    return <svg ref={svgRef} viewBox={`0, 0, ${width}, ${height}`} width={width} height={height}></svg>;
};

export default LineChart;