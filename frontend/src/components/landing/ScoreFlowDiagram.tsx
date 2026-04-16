import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const ScoreFlowDiagram: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const w = containerRef.current.clientWidth;
    const h = 300;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    // Nodes definition
    const nodes = [
      { id: 'start', label: 'MARKET MOVE', x: 0.1, y: 0.5 },
      { id: 'f1', label: 'PRICE DELTA', x: 0.35, y: 0.2 },
      { id: 'f2', label: 'LIQUIDITY', x: 0.35, y: 0.4 },
      { id: 'f3', label: 'VOLUME', x: 0.35, y: 0.6 },
      { id: 'f4', label: 'ORDERS', x: 0.35, y: 0.8 },
      { id: 'score', label: 'SCORE 0-100', x: 0.6, y: 0.5, type: 'circle' },
      { id: 'out1', label: 'INFORMED', x: 0.85, y: 0.3, color: '#16A34A' },
      { id: 'out2', label: 'UNCERTAIN', x: 0.85, y: 0.5, color: '#F59E0B' },
      { id: 'out3', label: 'NOISE', x: 0.85, y: 0.7, color: '#DC2626' }
    ];

    const links = [
      { source: 'start', target: 'f1' },
      { source: 'start', target: 'f2' },
      { source: 'start', target: 'f3' },
      { source: 'start', target: 'f4' },
      { source: 'f1', target: 'score' },
      { source: 'f2', target: 'score' },
      { source: 'f3', target: 'score' },
      { source: 'f4', target: 'score' },
      { source: 'score', target: 'out1' },
      { source: 'score', target: 'out2' },
      { source: 'score', target: 'out3' }
    ];

    // Helpers
    const getX = (d: any) => d.x * width;
    const getY = (d: any) => d.y * height;

    // Draw links
    const linkGenerator = d3.linkHorizontal<any, any>()
      .x(d => getX(d))
      .y(d => getY(d));

    svg.selectAll("path.link")
      .data(links)
      .join("path")
      .attr("class", "link text-prism-accent")
      .attr("d", d => {
        const s = nodes.find(n => n.id === d.source);
        const t = nodes.find(n => n.id === d.target);
        return linkGenerator({ source: s, target: t });
      })
      .attr("fill", "none")
      .attr("stroke", "#3B82F6")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.3);

    // Draw nodes
    const nodeGroups = svg.selectAll("g.node")
      .data(nodes)
      .join("g")
      .attr("transform", d => `translate(${getX(d)}, ${getY(d)})`);

    nodeGroups.each(function(d: any) {
      const g = d3.select(this);
      if (d.type === 'circle') {
        g.append("circle")
          .attr("r", 35)
          .attr("fill", "#0D1B2E")
          .attr("stroke", "#2D4A6B")
          .attr("stroke-width", 2);
      } else {
        const rectW = d.id === 'start' ? 100 : 80;
        const rectH = 30;
        g.append("rect")
          .attr("x", -rectW / 2)
          .attr("y", -rectH / 2)
          .attr("width", rectW)
          .attr("height", rectH)
          .attr("rx", 6)
          .attr("fill", "#0D1B2E")
          .attr("stroke", d.color || "#2D4A6B")
          .attr("stroke-width", 1.5);
      }

      g.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("fill", "#E2E8F0")
        .attr("font-family", "JetBrains Mono")
        .attr("font-size", d.type === 'circle' ? "10px" : "8px")
        .attr("font-weight", "bold")
        .text(d.label);
    });

  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center py-10 opacity-80 overflow-x-auto">
      <svg ref={svgRef} className="min-w-[600px]" />
    </div>
  );
};
