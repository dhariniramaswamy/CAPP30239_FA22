const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#line_chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let timeParse = d3.timeParse("%x"); // parse time to JS format so code can read it

d3.json("a3cleanedonly2015.json").then(data => {
        // Always start by console.logging the data
    
    
    for (let d of data) { 
        const month_num = timeParse(d.Date).getMonth();
        d.month = month[month_num];
    };

    console.log("foo",data);

    let newData = [
        { month: "January", count: 0 },
        { month: "February", count: 0 },
        { month: "March", count: 0 },
        { month: "April", count: 0 },
        { month: "May", count: 0 },
        { month: "June", count: 0 },
        { month: "July", count: 0 },
        { month: "August", count: 0 },
        { month: "September", count: 0 },
        { month: "October", count: 0 }, 
        { month: "November", count: 0 },
        { month: "December", count: 0 }
        ];

    // for (m of month) {
    //     let newObj = {};
    //     newObj.month = month[i];
    //     newObj.count = "";
    //     newData.push(newObj) //pushes object we created into newData array
    // }


    
    console.log(newData)

    for(var d of data) {
            let nd = newData.find(nd => nd.month == d["month"]);
            nd.count += 1;
    }

    for(let m of newData) {
        m.month = d3.timeParse("%B")(m.month)
    }
    console.log(newData)
    let x = d3.scaleTime()
        .domain(d3.extent(newData, d => d.month)) // returns an array
        .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear()
        .domain([60,d3.max(newData, d => d.count)]).nice() // nice to round up axis tick
        .range([height - margin.bottom, margin.top]);
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis") // adding a class to y-axis for scoping
      .call(d3.axisLeft(y)
        .tickSizeOuter(0)
        .tickSize(-width + margin.right + margin.left) // modified to meet at end of axis
      );

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Month");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Number of Shootings");
    
    let line = d3.line()
        .x(d => x(d.month))
        .y(d => y(d.count))
        .curve(d3.curveNatural); // more: https://observablehq.com/@d3/d3-line#cell-244

    svg.append("path")
        .datum(newData)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "steelblue");

  });