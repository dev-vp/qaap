import React from 'react'
import * as d3 from 'd3'

class ChartPie extends React.Component {
  constructor(props) {
    super(props)
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

    let data = [2, 4, 8, 10]
    let color = d3.scaleOrdinal([
      '#4daf4a',
      '#377eb8',
      '#ff7f00',
      '#984ea3',
      '#e41a1c'
    ])

    const height = 200
    const width = 300
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
    let pie = d3.pie() //This will generate pies values (i.e. startAngle, endAngle)

    //Generate GROUPS (for each data value/element)
    let arcs = g
      .selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc')

    // Generate the ARC
    // (used for drawing paths for each pie wedge)
    let arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius)

    //Draw ARC PATHs
    arcs
      .append('path')
      .attr('fill', (d, i) => {
        return color(i)
      })
      .attr('d', arc)

    //TEXT LABELS
    arcs
      .append('text')
      .data(pie(data))
      .attr('color', 'black')
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .attr('transform', (d, i) => {
        return `translate(${arc.centroid(d)})`
      })
      .text((d, i) => {
        return d.data
      })
  }

  render() {
    return <svg ref={node => (this.node = node)} width={500} height={500} />
  }
}

export default ChartPie
