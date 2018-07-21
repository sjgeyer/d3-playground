'use strict';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let data = Array(26).fill(0).map((x, i) => {
  return {
    name: alphabet[i],
    value: Math.round(Math.random() * 100),
  }
});

const margin = {top: 20, right: 30, bottom:30, left: 40};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// MAKING A CHART - long way

const y = d3.scaleLinear()
  .range([height, 0])
  .domain([0, 100]);

const x = d3.scaleBand()
  .domain(data.map(d => d.name))
  .rangeRound([0, width]); // fits width of bars to chart size

const chart = d3.select('.chart')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const bar = chart.selectAll('g')
  .data(data)
  .enter().append('g')
  .attr('transform', d => `translate (${x(d.name)}, 0)`);

chart.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(y));
  // .append('text')
  //   .attr('transform', 'rotate(-90)')
  //   .attr('y', -6)
  //   .attr('dy', '0.71em')
  //   .style('text-anchor', 'end')
  //   .text('Frequency');

chart.append('g')
  .call(d3.axisBottom(x))
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${height})`);

bar.append('rect')
  .attr('y', d => y(d.value))
  .attr('height', d => height - y(d.value))
  .attr('width', x.bandwidth() - 1);

// ------ adds text to bars if desired -------
// bar.append('text')
//   .attr('x', x.bandwidth() / 2)
//   .attr('y', d => y(d.value) + 3)
//   .attr('dy', '0.75em')
//   .text(d => d.value);