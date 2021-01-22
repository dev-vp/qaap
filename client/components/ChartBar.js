import React from 'react'
import * as d3 from 'd3'

class ChartBar extends React.Component {
  constructor(props) {
    super(props)
    this.renderBarChart = this.renderBarChart.bind(this)
  }

  componentDidMount() {
    this.renderBarChart()
  }

  componentDidUpdate() {
    this.renderBarChart()
  }

  renderBarChart() {
    const node = this.node

    let width = 600
    let height = 500
    let margin = 200

    let svg = d3
      .select(node)
      // .append('svg')
      .attr('width', width + margin) //margin is accounted for because...
      .attr('height', height + margin) //...the height variable is also used elsewhere
    // .on('click', () => {console.log(d3.event)})

    let data = [
      {year: 2011, value: 45},
      {year: 2012, value: 47},
      {year: 2013, value: 52},
      {year: 2014, value: 70},
      {year: 2015, value: 75},
      {year: 2016, value: 78}
    ]

    /* ORIGINALLY - X and Y Scale were predefined here (outside the d3.csv()) */
    //
    // // `d3.scaleBand()` computes the scale by dividing the range into uniform bands.
    // // `.padding()` is the space between each tick mark and bar
    // let xScale = d3.scaleBand().range([0, width]).padding(0.4) //year (x) axis & padding is the space between ticks
    // let yScale = d3.scaleLinear().range([height, 0]) //stock price values (y) axis

    let g = svg.append('g').attr('transform', `translate(100, 0)`)

    let xScale = d3
      .scaleBand() //computes the scale by dividing the range into uniform bands.
      .domain(
        data.map(d => {
          return d.year
        })
      ) // array of years being passed in
      .range([0, width])
      .padding(0.4) //padding between ticks and the bars
    let yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, d => {
          return d.value
        })
      ])
      .range([height, 0]) //stock price values (y) axis

    g
      .append('g')
      .attr('transform', `translate(0, ${height})`) // x,y axis position (top-left of svg)
      .call(d3.axisBottom(xScale))

    g
      .append('g')
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(d => {
            return `$${d}`
          }) // Prefix our tick label with the dollar-sign ($)
          .ticks(10) // # of ticks to show
      )
      .append('text')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .attr('fill', 'black')
      .attr('font-size', 18) // .attr() or .style() works for font-size
      .text('value')

    g
      .selectAll('bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar') //add class="bar" attribute
      .attr('fill', 'steelblue') //fill color
      // Below, we are passing each data value (year & value) into each of the scale we created earlier (outside the domain). Based on the 'data'(value) we pass in to 'scale()', it is auto-scaled accordingly to the 'range' we set. If the value passed in that is outside the predefined 'range', 'clamping' configuration will be required...
      .attr('x', d => {
        return xScale(d.year)
      }) // position of the bar on the x-axis
      .attr('y', d => {
        return yScale(d.value)
      }) // starting position of the bar on the y-axis
      .attr('width', xScale.bandwidth()) // returns the width of each band
      .attr('height', d => {
        return height - yScale(d.value)
      })
    // ^^ height of the SVG minus the corresponding y-value of the bar from the y-scale. Remember that the y-value here would be the tip of the bar since it is calculated from the origin and origin is at (0,0).

    g
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', width / 2)
      .attr('y', height - 460)
      .attr('text-anchor', 'end')
      .attr('stroke', 'black')
      .text('Year')

    svg
      .append('text')
      .attr('transform', 'translate(100,0)')
      .attr('x', 50)
      .attr('y', 50)
      .attr('font-size', '24px')
      .text('XYZ Stock Prices')
  }

  render() {
    return <svg ref={node => (this.node = node)} width={800} height={800} />
  }
}

export default ChartBar
