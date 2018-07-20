'use strict';

const data = [4, 8, 15, 16, 23, 42];

const width = 420;
const height = 20;

// MAKING A CHART - short way
// d3.select('.chart')
//   .selectAll('div')
//     .data(data)
//   .enter().append('div')
//     .style('width', d => `${d*10}px`)
//     .style('background-color', 'blue')
//     .text(d => d);

// MAKING A CHART - long way
const x = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, width]);
const chart = d3.select('.chart'); // select chart container
const bar = chart.selectAll('div'); // initiate data join by defining selection to give data
const barUpdate = bar.data(data); // joining the data
// selection is empty, returned update and exit selections are empty, only need to handle enter
// selection --> new data for which there was no existing element
const barEnter = barUpdate.enter().append('div');
barEnter.style('width', d => `${x(d)}px`); // set the width of each bar using associated data
// value
barEnter.text(d => d) // give it text from data array
  .style('color', 'white');
barEnter.style('background-color', 'steelblue')
  .style('margin', '10px')
  .style('box-sizing', 'border-box')
  .style('padding', '10px');

// d3.select('body').transition().duration(1000).style('background-color', 'black');