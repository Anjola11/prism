import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  date: Date;
  value: number;
}

interface ProbabilityChartProps {
  data: DataPoint[];
  signals?: { timestamp: Date; score: number; classification: string }[];
}

export const ProbabilityChart: React.FC<ProbabilityChartProps> = ({ data, signals = [] }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data.length || !svgRef.current || !containerRef.current) return;

    // Dimensions
    const containerWidth = containerRef.current.clientWidth;
    const height = 240;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = containerWidth - margin.left - margin.right;

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, 1])
      .range([height - margin.top - margin.bottom, 0]);

    // Axes
    const xAxis = d3.axisBottom(x)
      .ticks(6)
      .tickSizeOuter(0)
      .tickFormat(d3.timeFormat("%H:%M") as any);

    const yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickFormat(d3.format(".0%"));

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .attr("class", "x-axis")
      .call(xAxis)
      .call(g => g.select(".domain").attr("stroke", "#1A2D45"))
      .call(g => g.selectAll(".tick line").attr("stroke", "#1A2D45"))
      .call(g => g.selectAll(".tick text").attr("fill", "#64748B").attr("font-family", "JetBrains Mono").attr("font-size", "10px"));

    svg.append("g")
      .attr("class", "y-axis")
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#1A2D45").attr("stroke-dasharray", "2,2"))
      .call(g => g.selectAll(".tick text").attr("fill", "#64748B").attr("font-family", "JetBrains Mono").attr("font-size", "10px"));

    // Line
    const line = d3.line<DataPoint>()
      .x(d => x(d.date))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    // Area
    const area = d3.area<DataPoint>()
      .x(d => x(d.date))
      .y0(height - margin.top - margin.bottom)
      .y1(d => y(d.value))
      .curve(d3.curveMonotoneX);

    // Gradient
    const gradientId = "prob-gradient-" + Math.random().toString(36).slice(2);
    const defs = svg.append("defs");
    const linearGradient = defs.append("linearGradient")
      .attr("id", gradientId)
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "0%").attr("y2", "100%");

    linearGradient.append("stop").attr("offset", "0%").attr("stop-color", "#3B82F6").attr("stop-opacity", 0.15);
    linearGradient.append("stop").attr("offset", "100%").attr("stop-color", "#3B82F6").attr("stop-opacity", 0);

    svg.append("path")
      .datum(data)
      .attr("fill", `url(#${gradientId})`)
      .attr("d", area);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3B82F6")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Signal markers
    signals.forEach(sig => {
      const color = sig.classification === 'INFORMED_MOVE' ? '#16A34A' : sig.classification === 'UNCERTAIN' ? '#F59E0B' : '#DC2626';
      
      svg.append("line")
        .attr("x1", x(sig.timestamp))
        .attr("x2", x(sig.timestamp))
        .attr("y1", 0)
        .attr("y2", height - margin.top - margin.bottom)
        .attr("stroke", color)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4,4")
        .attr("opacity", 0.6);
        
      svg.append("circle")
        .attr("cx", x(sig.timestamp))
        .attr("cy", 0)
        .attr("r", 3)
        .attr("fill", color);
    });

    // Tooltip logic (simplified)
    const focus = svg.append("g").style("display", "none");
    focus.append("circle").attr("r", 4.5).attr("fill", "#E2E8F0").attr("stroke", "#3B82F6").attr("stroke-width", 2);

  }, [data, signals]);

  return (
    <div ref={containerRef} className="w-full bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-4 overflow-hidden">
      <svg ref={svgRef} className="mx-auto" />
    </div>
  );
};
