import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import styles from '../styles/LineChart.module.css'

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
    const [size, setSize] = useState({width: window.innerWidth, height: window.innerHeight});

    const isoFormat = d3.timeFormat("%Y-%m-%dT%H:%M:%S");
    const formatedStartDate = isoFormat(d3.timeDay.floor(new Date()));
    const formatedEndDate = isoFormat(d3.timeDay.ceil(new Date()));

    const [startDate, setStartDate] = useState<string>(formatedStartDate);
    const [endDate, setEndDate] = useState<string>(formatedEndDate);
    const [isTemperatureSelect, setIsTemperatureSelect] = useState<boolean>(true);
    const [isHumiditySelect, setIsHumiditySelect] = useState<boolean>(true);

    useEffect(() => {
         const fetchData = () => {
            d3.json<DataItem[]>(`${import.meta.env.VITE_API_URL}/api/v1/dht11/log/range?start=${startDate}&end=${endDate}`)
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
    }, [startDate, endDate]);

    useEffect(() => {
        const handleResize = () => { 
            setSize({width: window.innerWidth, height: window.innerHeight});
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize)
    }, []);

    useEffect(() => {
        if (!svgRef.current) return;

        const svgElement = d3.select(svgRef.current);

        const width = svgRef.current.getBoundingClientRect().width;
        const height = 200;

        const marginTop = 20;
        const marginRight = 30;
        const marginBottom = 20;
        const marginLeft = 30;

        const measurementTime = data.map((d) => new Date(d.measurementTime));
        const flatHumidityAndTemperature = d3.union(data.flatMap((d) => {
            const data = [];
            if (isTemperatureSelect) {
                data.push(d.temperature);
            }

            if (isHumiditySelect) {
                data.push(d.humidity);
            }
            return data;  
        }));

        const x = d3.scaleTime().domain(d3.extent(measurementTime) as [Date, Date]).range([marginLeft, width - marginRight]);
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
        svgElement.attr('viewBox', `0 0 ${width} ${height}`)

        if (isTemperatureSelect) {
            const path = svgElement.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'red')
            .attr('d', temperatureLine)
            .attr('id', 'temperatureLine')
            ;
            
            const node = path.node();
            if (node) {
                const totalLength = node.getTotalLength();
    
                path.attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition()
                    .duration(1000)
                    .ease(d3.easeLinear)
                    .attr("stroke-dashoffset", 0);
            }
        }
        
        if (isHumiditySelect) {
            const path = svgElement.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('d', humidityLine)
            .attr('id', 'humidityLine')
            ;

            const node = path.node();
            if (node) {
                const totalLength = node.getTotalLength();
    
                path.attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition()
                    .duration(1000)
                    .ease(d3.easeLinear)
                    .attr("stroke-dashoffset", 0);
            }
        }
        
        const xAxis = svgElement.append("g")
            .attr("transform", `translate(0, ${height - marginBottom})`)
            .call(d3.axisBottom(x))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").remove())
        ;

        const yAxis = svgElement.append('g')
            .attr("transform", `translate(${marginLeft}, 0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll("line"))
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", width - marginLeft - marginRight)
                .attr("stroke-opacity", 0.1)
            )
        ;
        
        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([1, 8])
            .translateExtent([[marginLeft, marginTop], [width - marginRight, height - marginTop]])
            .extent([[marginLeft, marginTop], [width - marginRight, height - marginTop]])
            .on('zoom', (event) => {
                const newX = event.transform.rescaleX(x);
                const newY = event.transform.rescaleY(y);

                xAxis.call(d3.axisBottom(newX));
                yAxis.call(d3.axisLeft(newY));

                const newTemperatureLine = d3.line<DataItem>()
                    .x(d => newX(new Date(d.measurementTime)))
                    .y(d => newY(d.temperature));

                const newHumidityLine = d3.line<DataItem>()
                    .x(d => newX(new Date(d.measurementTime)))
                    .y(d => newY(d.humidity));

                const temperaturePath = svgElement.selectAll<SVGPathElement, DataItem[]>("#temperatureLine")
                    .datum(data)
                    .attr('d', d => newTemperatureLine(d))
                ;

                const temperatureNode = temperaturePath.node()
                if(temperatureNode){
                    const totalLength = temperatureNode.getTotalLength();

                    temperaturePath.attr("stroke-dasharray", totalLength + " " + totalLength)
                        .attr("stroke-dashoffset", totalLength)
                        .transition()
                        .duration(1000)
                        .ease(d3.easeLinear)
                        .attr("stroke-dashoffset", 0)
                }

                const humidityPath = svgElement.selectAll<SVGPathElement, DataItem[]>("#humidityLine")
                    .datum(data)
                    .attr('d', d => newHumidityLine(d))
                ;

                const humidityNode = humidityPath.node()
                if(humidityNode){
                    const totalLength = humidityNode.getTotalLength();

                    humidityPath.attr("stroke-dasharray", totalLength + " " + totalLength)
                        .attr("stroke-dashoffset", totalLength)
                        .transition()
                        .duration(1000)
                        .ease(d3.easeLinear)
                        .attr("stroke-dashoffset", 0)
                }

                d3.selectAll('g circle').remove();
                
                const tooltip = d3.select("#tooltip");
                
                svgElement.append('g').selectAll<SVGCircleElement, DataItem>('circle')
                    .data(data)
                    .join('circle')
                    .attr('cx', d => newX(new Date(d.measurementTime)))
                    .attr('cy', d => newY(d.humidity))
                    .attr('r', 4)
                    .style('fill', 'transparent')
                    .style('stroke', 'transparent')
                    .on("mouseover", (event, d) => {
                        tooltip.style("opacity", 1)
                        .html(`시간: ${d.measurementTime}<br>습도: ${d.humidity}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px");
                    })
                    .on("mouseout", () => {
                        tooltip.style("opacity", 0);
                    })
                    .on("mousemove", (event) => {
                        tooltip
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px");
                    });
                
                svgElement.append('g').selectAll<SVGCircleElement, DataItem>('circle')
                    .data(data)
                    .join('circle')
                    .attr('cx', d => newX(new Date(d.measurementTime)))
                    .attr('cy', d => newY(d.temperature))
                    .attr('r', 4)
                    .style('fill', 'transparent')
                    .style('stroke', 'transparent')
                    .on("mouseover", (event, d) => {
                        tooltip.style("opacity", 1)
                        .html(`시간: ${d.measurementTime}<br>온도: ${d.temperature}`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px");
                    })
                    .on("mouseout", () => {
                        tooltip.style("opacity", 0);
                    })
                    .on("mousemove", (event) => {
                        tooltip
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px");
                    });
            });
    
        svgElement.call(zoom)

        const tooltip = d3.select("#tooltip");
        svgElement.append('g').selectAll<SVGCircleElement, DataItem>('circle')
            .data(data)
            .join('circle')
            .attr('cx', d => x(new Date(d.measurementTime)))
            .attr('cy', d => y(d.humidity))
            .attr('r', 4)
            .style('fill', 'transparent')
            .style('stroke', 'transparent')
            .on("mouseover", (event, d) => {
                tooltip.style("opacity", 1)
                .html(`시간: ${d.measurementTime}<br>습도: ${d.humidity}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
            })
            .on("mousemove", (event) => {
                tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
            });

        svgElement.append('g').selectAll<SVGCircleElement, DataItem>('circle')
            .data(data)
            .join('circle')
            .attr('cx', d => x(new Date(d.measurementTime)))
            .attr('cy', d => y(d.temperature))
            .attr('r', 4)
            .style('fill', 'transparent')
            .style('stroke', 'transparent')
            .on("mouseover", (event, d) => {
                tooltip.style("opacity", 1)
                .html(`시간: ${d.measurementTime}<br>온도: ${d.temperature}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
            })
            .on("mousemove", (event) => {
                tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
            });

    }, [data, size, isHumiditySelect, isTemperatureSelect]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>

                <div className={styles.dateTimeContainer}>
                    <div className={styles.datetime}>
                        <label>시작일 : </label>
                        <input id='startDate' type="datetime-local" value={startDate} className={styles.localDatetime} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setStartDate(event.target.value)}/>
                    </div>
                    <div className={styles.datetime}>
                        <label>종료일 : </label>
                        <input id='endDate' type="datetime-local" value={endDate} className={styles.localDatetime} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEndDate(event.target.value)}/>
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <button type="button" className={`${styles.button} ${isTemperatureSelect ? styles.activeButton : ""}`} onClick={() => setIsTemperatureSelect(!isTemperatureSelect)}>🌡️ 온도</button>
                    <button type="button" className={`${styles.button} ${isHumiditySelect ? styles.activeButton : ""}`} onClick={() => setIsHumiditySelect(!isHumiditySelect)}>💧 습도</button>
                </div>

            </div>
            <svg ref={svgRef} className={styles.chart}></svg>
            <div id="tooltip" className={styles.tooltip}></div>
        </div>
    );
};

export default LineChart;