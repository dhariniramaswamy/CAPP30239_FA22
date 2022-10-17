/* Bar chart of COVID cases */

/* then() means a Promise. specifies order in which to execute */
d3.csv("covid.csv").then(data => {
    for (let d of data){
        d.cases = +d.cases; /* + turns string into an integer */
    }

    const height = 400,
        width = 600,
        margin = ({top: 25, right: 30, bottom: 35, left: 50 });

    let svg = d3.select("#chart")
                .append("svg")
                .attr("viewbox", [0, 0, width, height]);
                /* viewbox allows the browser to have a set of dimensions */

    const x = d3.scaleBand()
                .domain(data.map(d => d.country))
                .range([margin.left, width - margin.right])
                .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.cases)]).nice()
                /* .nice rounds up values */
                .range([height - margin.bottom, margin.top]);
    
    const xAxis = g => g
        .attr("transform", `translate(0, ${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));

    const yAxis = g => g
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    /* create a bar group. select all items that have a class of bar */
    let bar = svg.selectAll(".bar")
        .append("g")
        /* for the bars we're building, use this data */
        .data(data)
        /* joins the data to the rectangles on the page */
        .join("g")
        .attr("class", "bar");
    
        /* build bars. for each "g" element, we append a rectangle */
    bar.append("rect")
        .attr("fill", "steelblue")
        /*use arrow function to position the x-coordinate */
        .attr("x", d => x(d.country))
        /* scaleBand gives us pre-formed values. bandwidth is the width
        of each rectangle */
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.cases))
        /* height should correspond with d.cases value. we subtract because
        everything in d3 svg is built from top down and we have to reverse it */
        .attr("height", d => y(0) - y(d.cases));

    /* put text above the bar graph */
    bar.append('text')
        .text(d => d.cases)
        .attr('x', d => x(d.country) + (x.bandwidth()/2))
        .attr('y', d => y(d.cases) - 15)
        .attr('text-anchor', 'middle')
        .style('fill', '#000')


        
});