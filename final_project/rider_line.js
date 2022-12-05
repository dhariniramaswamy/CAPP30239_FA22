/* D3 Line Chart */


const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#line_chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('cleaned_data/bus_riders.csv').then(data => {
    
    let timeParse = d3.timeParse("%Y");
    for (let d of data) {
        d.total_bus_rides = +d.total_bus_rides;
        d.year = timeParse(d.year);
    }
    console.log(data);
    // need to remove months
    //scale x with time
    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.year))
        .range([margin.left, width - margin.right])

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.total_bus_rides)])
        .range([height - margin.bottom, margin.top])
        .nice();

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0).ticks(5));
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0).ticks(6).tickFormat(d => d3.format(".2s")(d)));

    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Year")
      .style("font-size", 10);
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 7) // change this
      .attr("transform", "rotate(-90)")
      .text("Total Bus Rides")
      .style("font-size", 10);

    let line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.total_bus_rides))
        .curve(d3.curveNatural);

    svg.append("path")
        .datum(data) // use data for lots of points
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue");
  });