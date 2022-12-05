function waffleChartDataTranformation(data) {
    const array = [];
  
    data.map((d, i) => {
      let curr = 0,
        waffle = [];
      for (let y = 9; y >= 0; y--)
        for (let x = 0; x < 10; x++) {
          waffle.push({ x, y, index: curr < Math.round(d.ratio) ? i : -1 });
          curr++;
        }
      array.push(waffle);
    });
  
    return array;
  }
  
  function waffleChart(svgcontainer, data) {
    const width = 1000,
      height = 600,
      padding = { x: 32, y: 32 },
      waffleSize = 150;
  
    const waffles = waffleChartDataTranformation(data);
  
    const sequence = (length) =>
      Array.apply(null, { length: length }).map((d, i) => i);
  
    const svg = d3
      .select(svgcontainer)
      .append("svg")
      .style("cursor", "default")
      .attr("viewBox", [0, 0, width, height]);
  
    const g = svg
      .selectAll(".waffle")
      .data(waffles)
      .join("g")
      .attr("class", "waffle");
  
    const scale = d3
      .scaleBand()
      .domain(sequence(10))
      .range([0, waffleSize])
      .padding(0.1);
  
    const color = d3
      .scaleOrdinal(d3.schemeTableau10)
      .domain(sequence(data.length));
  
    const numPerRow = Math.floor(width / (waffleSize + padding.x));
    g.attr("transform", (d, i) => {
      const r = Math.floor(i / numPerRow);
      const c = i - r * numPerRow;
      return `translate(${c * (waffleSize + padding.x)},${
        r * (waffleSize + padding.y)
      })`;
    });
  
    const cellSize = scale.bandwidth();
    const half = cellSize / 2;
    const cells = g
      .append("g")
      .selectAll("circle")
      .data((d) => d)
      .join("circle")
      .attr("fill", (d) => (d.index === -1 ? "#ddd" : color(d.index)))
      .attr("cx", (d) => scale(d.x) + half)
      .attr("cy", (d) => scale(d.y) + half)
      .attr("r", half);
  
    g.append("g")
      .attr("transform", `translate(0,${waffleSize + padding.y / 2.5})`)
      .call((g) => g.append("text").text((d, i) => data[i].date));
  }
  
  d3.csv("chartData.csv").then((data) => {
    waffleChart("#waffle_chart", data);
  });
  