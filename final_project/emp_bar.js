/* Bar Chart for CTA Bus Employees */
/* Source: Class materials from Tiffany France's
/* CAPP 30239 Data Visualization Course Fall 2022 */


d3.csv("cleaned_data/emp.csv").then(data => {
    
    for (let d of data) {
        d.num_emp = +d.num_emp; 
    };

    console.log(data)
    const height = 600,
    width = 800,
    margin = ({ top: 25, right: 30, bottom: 35, left: 60 });


    let svg = d3.select("#bar_chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); 

    /* create a band scale and apply to domain of data */
    let x = d3.scaleBand()
    .domain(data.map(d => d.year))
    .range([margin.left, width - margin.right])
    .padding(0.5);


    /* creates a scale with a linear relationship between input and output */    
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.num_emp)]).nice() 
        .range([height - margin.bottom, margin.top]); 

    /* groups SVG elements together */
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));
        svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .attr("x", -margin.top/2)
        .attr("dx", "-0.5em")
        .attr("y", 7) // change this
        .attr("transform", "rotate(-90)")
        .text("Total Number of Employeess")
        .style("font-size", 10);
    
    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Year")
      .style("font-size", 10);
    /* create bar groups */    
    let bar = svg.selectAll(".bar") 
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect") // add rect to bar group
        .attr("fill", "#478BD5") // fill in the color as steelblue
        .attr("x", d => x(d.year)) // use arrow function to position the x-coordinate
        .attr("width", 0.5) // scaleBand gives us pre-formed values. 
        .attr("width", x.bandwidth()) // bandwidth is the width of each rectangle
        .attr("y", d => y(d.num_emp)) // y position attribute
        .attr("height", d => y(0) - y(d.num_emp)); // height should correspond with d.cases value. we subtract because


    bar.append('text') // add labels
        .text(d => d.num_emp)
        .attr('x', d => x(d.year) + (x.bandwidth()/2))
        .attr('y', d => y(d.num_emp) + 15) // moves the text onto the bar graph
        .attr('text-anchor', 'middle') // reposition the text
        .style('fill', 'white')
        .style("font-size", 10) // make the text white
    });