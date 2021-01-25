/* eslint-disable complexity */
import React from 'react'
import * as d3 from 'd3'

class ChartPie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: this.props.poll.options
    }
    this.renderPieChart = this.renderPieChart.bind(this)
  }

  componentDidMount() {
    this.renderPieChart()
  }

  componentDidUpdate() {
    this.renderPieChart()
  }

  renderPieChart() {
    const node = this.node

    let data = this.state.options
    let votes = this.state.options.map(opt => opt.vote.vote)
    let options = this.state.options.map(opt => opt.option)
    console.log('pie', data)
    let color = d3.scaleOrdinal([
      '#4daf4a',
      '#377eb8',
      '#ff7f00',
      '#984ea3',
      '#e41a1c'
    ])

    const height = 600
    const width = 500
    const radius = Math.min(width, height) / 2
    // The radius is calculated as `Math.min(width, height) / 2` to ensure that our generated pie will fit into the bounds of the SVG. Therefore, we choose whichever of the width and height is the minimum value.

    const svg = d3
      .select(node)
      // .append('svg')
      .attr('height', height)
      .attr('width', width)

    // GROUP ELEMENT (to house our pie elements together)
    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    //Generate the PIE
    let pie = d3.pie().sort(null) //This will generate pies values (i.e. startAngle, endAngle)

    //Generate GROUPS (for each data value/element)
    let arcs = g
      .selectAll('pie-wedge')
      .data(pie(votes))
      .enter()
      .append('g')
      .attr('class', 'pie-wedge')
      .attr('id', (d, i) => `wedge${i}`)

    // Generate the ARC
    // (used for drawing paths for each pie wedge)
    let arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius)

    //Draw ARC PATHs
    let arcPath = arcs
      .append('path')
      .attr('fill', (d, i) => {
        return color(i)
      })
      .attr('d', arc)

    //VOTE COUNT LABELS
    arcs
      .append('text')
      .data(pie(votes))
      .attr('color', 'black')
      .attr('font-size', '20px')
      .attr('font-weight', 'light')
      .attr('text-anchor', 'start')
      .attr('transform', (d, i) => {
        return `translate(${arc.centroid(d)})`
      })
      .text((d, i) => {
        if (d.data !== 0) {
          return `${d.data}`
        }
      })

    //TEXT LABEL
    arcs
      .append('text')
      .data(options)
      .attr('font-size', '20px')
      .attr('font-weight', 'bolder')
      .attr('text-anchor', 'end')
      .text((d, i) => {
        console.log(d)
        return `${d}: `
      })
      .data(pie(votes))
      .attr('transform', (d, i) => {
        return `translate(${arc.centroid(d)})`
      })
  }

  render() {
    return <svg ref={node => (this.node = node)} width={500} height={500} />
  }
}

export default ChartPie
