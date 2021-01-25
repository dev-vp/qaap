import React from 'react'
import * as d3 from 'd3'

class ChartBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: this.props.poll.options
    }
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

    let color = d3.scaleOrdinal([
      '#4daf4a',
      '#377eb8',
      '#ff7f00',
      '#984ea3',
      '#e41a1c'
    ])

    d3.select('.bar-svg').remove()

    let svg = d3
      .select(node)
      .append('svg')
      .attr('class', 'bar-svg')
      .attr('width', width + margin)
      .attr('height', height + margin)

    let data = this.state.options

    let g = svg.append('g').attr('transform', `translate(100, 0)`)

    let xScale = d3
      .scaleBand()
      .domain(
        data.map(d => {
          return d.option
        })
      )
      .range([0, width])
      .padding(0.4)
    let yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, d => {
          return d.vote.vote
        })
      ])
      .range([height, 0])

    g
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))

    g.append('g').call(
      d3
        .axisLeft(yScale)
        .tickFormat(d => {
          return `${d}`
        })
        .ticks(10)
    )

    g
      .selectAll('bar')
      .sort(null)
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', (d, i) => {
        return color(i)
      })
      .attr('x', d => {
        return xScale(d.option)
      })
      .attr('y', d => {
        return yScale(d.vote.vote)
      })
      .attr('width', xScale.bandwidth())
      .attr('height', d => {
        return height - yScale(d.vote.vote)
      })

    const barNode = document.querySelectorAll('.bar')

    let initialized = false
    for (let i = 0; i < barNode.length; i++) {
      if (initialized) {
        break
      }
      if (Number(barNode[i].attributes.y.value) === 250) {
        barNode[i].style.display = 'none'
      } else {
        initialized = true
        barNode[i].style.display = ''
      }
    }
  }

  render() {
    return (
      <div
        className="bar-chart"
        ref={node => (this.node = node)}
        width={800}
        height={800}
      />
    )
  }
}

export default ChartBar
