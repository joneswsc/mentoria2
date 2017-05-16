import React from 'react';
import { observer, inject } from 'mobx-react';

import '../styles/Chart.scss';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

const margin = { top: 10, right: 10, bottom: 20, left: 60 },
  fullWidth = 800,
  fullHeight = 400,
  width = fullWidth - margin.left - margin.right,
  height = fullHeight - margin.top - margin.bottom;

const x = scaleLinear()
  .range([0, width]);

const y = scaleLinear()
  .range([0, height]);

const GeradorLinha = line()
  .x((d, i) => x(d.idade + ((d.parcial / 12) || 1) - 1))
  .y(d => y(d.saldo));

const GeradorLinhabase = line()
  .x((d, i) => x(d.idade))
  .y(d => y(d.linhabase));

@inject(({ store : { investimentos, idadeAtual, idadeAposentadoria, anos }}) => ({ investimentos, idadeAtual, idadeAposentadoria, anos })) @observer
export default class Chart extends React.Component<> {
  render() {

    const data = this.props.investimentos.filter(ano => ano.saldo > 0 || ano.juroAnual > 0);
    console.log(data);
    console.log(data.length-1 );

    x.domain([data[0].idade, data[data.length-1].idade]);;
    y.domain([data[this.props.idadeAposentadoria-this.props.idadeAtual].saldo+100000, 0]);

    return (<svg
      height="100%"
      width="100%"
      viewBox={`0 0 ${fullWidth} ${fullHeight}`}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <g className="axis" ref={r => this.xAxis = select(r) } transform={`translate(0, ${height})`}></g>
        <g className="axis" ref={r => this.yAxis = select(r) }></g>
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
    this.xAxis.call(axisBottom().scale(x).ticks(Math.min(this.props.investimentos.length, 40)));
    this.yAxis.call(axisLeft().scale(y));
  }

}
