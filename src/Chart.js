import React from 'react';
import { observer, inject } from 'mobx-react';

import '../styles/Chart.scss';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

const margin = { top: 20, right: 20, bottom: 20, left: 80 },
  fullWidth = 800,
  fullHeight = 300,
  width = fullWidth - margin.left - margin.right,
  height = fullHeight - margin.top - margin.bottom;

const x = scaleLinear()
  .range([0, width]);

const y = scaleLinear()
  .range([0, height]);

const GeradorLinha = line()
  .x((d, i) => x(i + ((d.parcial / 12) || 1) - 1))
  .y(d => y(d.saldo));

const GeradorLinhabase = line()
  .x((d, i) => x(i))
  .y(d => y(d.linhabase));

@inject(({ store : { investimentos, anos }}) => ({ investimentos, anos })) @observer
export default class Chart extends React.Component<> {
  render() {
    const data = this.props.investimentos;
    x.domain([0, data.length - 1]);
    y.domain([data[this.props.anos].saldo+100000, 0]);

    return (<svg
      height="100%"
      width="100%"
      viewBox={`0 0 ${fullWidth} ${fullHeight}`}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <g className="axis" ref={r => this.xAxis = select(r) } transform={`translate(0, ${height})`}></g>
        <g className="axis" ref={r => this.yAxis = select(r) }></g>
        <path className="line baseline" d={GeradorLinhabase(data) }></path>
        <path className="line "  d={GeradorLinha(data) }></path>
      </g>
    </svg>);
  }
  componentDidMount() {
    this.drawAxis();
  }
  componentDidUpdate({ investimentos }){
    if ((investimentos.length !== this.props.investimentos.length) ||
      (investimentos[0].saldo !== this.props.investimentos[0].saldo)) {
      this.drawAxis();
    }

  }
  drawAxis() {
    this.xAxis.call(axisBottom().scale(x).ticks(Math.min(this.props.investimentos.length, 30)));
    this.yAxis.call(axisLeft().scale(y));
  }
}
