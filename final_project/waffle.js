import {form} from "@mbostock/form-input"

const svg = d3.select("#waffle_chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

chart = {
    
    const g = svg.selectAll(".waffle")  
      .data(waffles)
      .join("g")
      .attr("class", "waffle");
    
    if (!whole) {
      const numPerRow = Math.floor(width / (waffleSize + padding.x));
      g.attr("transform", (d, i) => {
        const r = Math.floor(i / numPerRow);
        const c = i - r * numPerRow;
        return `translate(${c * (waffleSize + padding.x)},${r * (waffleSize + padding.y)})`
      });
    }
    
    const cellSize = scale.bandwidth();
    const half = cellSize / 2;
    const cells = g.append("g")
      .selectAll(options.shape)
      .data(d => d)
      .join(options.shape)
      .attr("fill", d => d.index === -1 ? "#ddd" : color(d.index));
    
    if (isRect) {
      cells.attr("x", d => scale(d.x))
        .attr("y", d => whole ?  0 : scale(d.y))
        .attr("rx", 3).attr("ry", 3)
        .attr("width", cellSize).attr("height", cellSize)      
    } 
    else {    
      cells.attr("cx", d => scale(d.x) + half)
        .attr("cy", d => whole ? 0 : scale(d.y) + half)
        .attr("r", half);
    }
    
    // if (whole) {
    //   cells.append("title").text(d => {
    //     const cd = chartData[d.index];
    //     return `${cd.territory}\n${toCurrency(cd.profit)} (${cd.ratio.toFixed(1)}%)`;
    //   });    
      
      cells.transition()
        .duration(d => d.y * 100)
        .ease(d3.easeBounce)
        .attr(isRect ? "y" : "cy", d => scale(d.y) + (isRect ? 0 : half));
        svg.transition().delay(550)
        .on("end", () => drawLegend(svg, cells));
    }
    else {
      g.append("text")
        .style("font-size", 20)
        .style("font-weight", "bold")
        .attr("dy", "1.5em")
        .attr("text-anchor", "middle")            
        .attr("fill", (d, i) => color(i))
        .attr("transform", `translate(${waffleSize / 2},0)`)
        .text((d, i) => `${chartData[i].ratio.toFixed(0)}%`);
      
      g.append("g")
        .attr("transform", `translate(0,${waffleSize + padding.y / 2.5})`)
        .call(g => g.append("text").text((d, i) => chartData[i].territory))
        .call(g => g.append("text").attr("dy", "1em").text((d, i) => toCurrency(chartData[i].profit)));
    }  
    
    return svg.node();
  }

  drawLegend = ƒ(svg, cells)
  drawLegend = (svg, cells) => {
    const legend = svg.selectAll(".legend")
      .data(chartData.map(d => d.territory))
      .join("g")      
      .attr("opacity", 1)
      .attr("transform", (d, i) => `translate(${waffleSize + 20},${i * 30})`)
      .on("mouseover", highlight)
      .on("mouseout", restore);
  
    legend.append("rect")
      .attr("rx", 3).attr("ry", 3)
      .attr("width", 30).attr("height", 20)
      .attr("fill", (d, i) => color(i));    
  
    legend.append("text")
      .attr("dx", 40)
      .attr("alignment-baseline", "hanging")
      .text((d, i) => `${d} (${chartData[i].ratio.toFixed(1)}%)`);
    
    function highlight(e, d, restore) {
      const i = legend.nodes().indexOf(e.currentTarget);
      cells.transition().duration(500)
        .attr("fill", d => d.index === i ? color(d.index) : "#ccc");  
    }
    
    function restore() {
      cells.transition().duration(500).attr("fill", d => color(d.index))
    }
  }
  color = ƒ(i)
  color = d3.scaleOrdinal(d3.schemeTableau10)
    .domain(sequence(chartData.length))
  scale = ƒ(i)
  scale = d3.scaleBand()
    .domain(sequence(10))
    .range([0, waffleSize])
    .padding(0.1)
sequence = ƒ(length)
sequence = (length) => Array.apply(null, {length: length}).map((d, i) => i);
whole = false
whole = options.style === "whole"
isRect = false
isRect = options.shape === "rect"

chartData = {
    const data = d3.csvParse(await FileAttachment("/data/intervals.csv").text(), d3.autoType);
    return data.map(d => ({
      ratio: d.perc * 100
    }));  
  }

  waffles = {
    const array = [];
    if (whole) {
      const max = chartData.length; 
      let index = 0, curr = 1, 
          accu = Math.round(chartData[0].ratio), waffle = [];
      
      for (let y = 9; y >= 0; y--)
        for (let x = 0; x < 10; x ++) {
          if (curr > accu && index < max) {
            let r = Math.round(chartData[++index].ratio);
            while(r === 0 && index < max) r = Math.round(chartData[++index].ratio);
            accu += r;
          }
          waffle.push({x, y, index});
          curr++;
        } 
      array.push(waffle);
    } else {
      chartData.map((d, i) => {
        let curr = 0, waffle = [];
        for (let y = 9; y >= 0; y--)
          for(let x = 0; x < 10; x ++) {
            waffle.push(({x, y, index: curr < Math.round(d.ratio) ? i : -1}));
            curr++;
          }
        array.push(waffle);
      });
    }  
    return array;
  }

  width = 1024
  height = 600
  padding = ({x: 10, y: 40})
  waffleSize = whole ? width < height ? width : height : 150;

  d3 = require("d3@6")


