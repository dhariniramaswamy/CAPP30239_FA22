/* D3 Line Chart */

// set the skeleton of the chart
const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

// read in the data
d3.csv('long-term-interest-canada.csv').then(data => {
    
    let timeParse = d3.timeParse("%Y-%m"); // convert to JS format of dates
    for (let d of data) {
        d.Num = +d.Num; // initialize the value on the y-axis of chart
        d.Month = timeParse(d.Month);
    }

    //scale x with time
    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Month))
        .range([margin.left, width - margin.right])

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Num)]) // set the domain between 0 and the max numerical value in the dataset
        .range([height - margin.bottom, margin.top]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0)); // rounds up axis tick
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0)
      .tickFormat(d => d + "%") // controls which ticks are labeled
      .tickSize(-width));

    // sets the attributes of our x-axis
    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Month");
    
    // sets the attributes of our x-axis
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Interest rate");

    // initialize chart type to be a line chart
    let line = d3.line()
        .x(d => x(d.Month))
        .y(d => y(d.Num));

    svg.append("path")
        .datum(data) // use data for lots of points
        .attr("d", line)
        .attr("fill", "none") // not an area chart
        .attr("stroke", "green"); //specify color of chart 
  });