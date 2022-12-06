/* Ring Chart for CTA Bus Employees */
/* Source: Class materials from Tiffany France's
/* CAPP 30239 Data Visualization Course Fall 2022 */


d3.json("cleaned_data/revenues.json").then((data) => {
  for (let d of data) {
    createRing(d);
  }

  let categories = ["Farebox and Pass Revenue", "Advertising and Concessions", "Other Revenues"]
  let swatchHTML = Swatches(d3.scaleOrdinal(categories, ["#478BD5", "#C7DBEF", "#BB2039"]));

  d3.select("#chart-legend")
    .append("div")
    .node().innerHTML = swatchHTML;
});

function createRing({ year, values }) {
  const height = 250,
    width = 200,
    innerRadius = 40,
    outerRadius = 65,
    labelRadius = 85;

  const arcs = d3.pie().value(d => d.amount)(values);

  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", (d, i) => ["#478BD5", "#C7DBEF", "#BB2039"][i])
    .attr("d", arc);

  let xPos = [20,0,10];
  let yPos = [0,0,0];
  svg.append("g")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")

    .attr("transform", (d,i) => `translate(${arcLabel.centroid(d)[0] + 
      xPos[i]},${arcLabel.centroid(d)[1] + yPos[i]})`)
    .selectAll("tspan")
    .data(d => {
      return [d.data.amount];
    })
    .join("tspan")
    .attr("x", 0)
    .attr("y", (d, i) => `${i * 1.3}em`) 

    .attr("font-weight", (d, i) => i ? null : "bold")
    .text(d => d);

  svg.append("text")
    .attr("font-size", 16)
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text(year)
    .style("font-size", 20);

}
