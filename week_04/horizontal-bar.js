/* Horizontal bar chart for COVID country cases */

// promise says to get the data before doing everything else 
d3.csv("covid.csv").then(data => {

    // converts string to integer 
    // d is each row of data and cases is each column 
    for (let d of data) {
        d.cases = +d.cases; //force a number
    };

    // sort by cases (numerical) 
    // data.sort((a, b) => b.cases - a.cases);
    // alphabetically sort 
    data.sort((a, b) => d3.ascending(a.country, b.country));

    // when it's in quotes and orange, it gets put into html
    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    let svg = d3.select("#horizontal-chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // for resizing element in browser

    // scaleLinear used for x now because it's a horizontal bar chart
    let x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.cases)]).nice()
        .range([margin.left, width - margin.right]);
    
    //d => d.country is a loop. d is the row and d.country is the cell
    // data.map converts the previous loop to a JS array
    let y = d3.scaleBand()
        .domain(data.map(d => d.country))
        .range([margin.top, height - margin.bottom])
        .padding(0.1);

    // attr actually goes on a page
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x));
    
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    let bar = svg.selectAll(".bar") // create bar groups
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect") // add rect to bar group
        .attr("fill", "steelblue")
        .attr("x", margin.left)
        .attr("width", d => x(d.cases))
        .attr("y", d => y(d.country))
        .attr("height", y.bandwidth()); // you can only use bandwidth when you have scaleBand
    
    bar.append('text') // add labels
        .text(d => d.cases)
        // entire width on svg
        .attr('x', d => margin.left + x(d.cases) - 10)
        .attr('y', d => y(d.country) + (y.bandwidth()/2))
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .style('fill', 'white');
    
    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", )

});