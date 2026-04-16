import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ScoreDistributionProps {
  scores: number[];
}

export const ScoreDistribution: React.FC<ScoreDistributionProps> = ({ scores }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scores.length || !svgRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const height = 180;
    const margin = { top: 10, right: 20, bottom: 30, left: 30 };
    const width = containerWidth - margin.left - margin.right;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width]);

    const bins = d3.bin()
      .domain([0, 100])
      .thresholds(d3.range(0, 101, 10))
      (scores);

    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length) || 0])
      .range([height - margin.top - margin.bottom, 0]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(10))
      .call(g => g.select(".domain").attr("stroke", "#1A2D45"))
      .call(g => g.selectAll(".tick text").attr("fill", "#64748B").attr("font-family", "JetBrains Mono").attr("font-size", "9px"));

    svg.selectAll("rect")
      .data(bins)
      .join("rect")
      .attr("x", d => x(d.x0 || 0) + 1)
      .attr("width", d => Math.max(0, x(d.x1 || 0) - x(d.x0 || 0) - 1))
      .attr("y", d => y(d.length))
      .attr("height", d => y(0) - y(d.length))
      .attr("fill", d => {

        if ((d.x0 || 0) >= 70) return "#16A34A";
        if ((d.x0 || 0) >= 40) return "#F59E0B";
        return "#DC2626";
      })
      .attr("rx", 2);

  }, [scores]);

  return (
    <div ref={containerRef} className="w-full bg-prism-navy-2 border border-prism-navy-3 rounded-lg p-4">
      <h4 className="font-mono text-[10px] uppercase tracking-widest text-prism-text-3 mb-4">Score Distribution</h4>
      <svg ref={svgRef} />
    </div>
  );
};
