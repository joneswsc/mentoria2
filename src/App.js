import React from 'react';
import { observer, inject } from 'mobx-react';

import Header from './Header.js';
import TableContainer from './TableContainer';
import Chart from './Chart';
import BaseFigures from './BaseFigures';
import Overpayment from './Overpayment';
import Payment from './Payment';
import '../styles/App.scss';

export default () => (
  <div>
    <Header title={"Simulador de aplicação (Em Dev)"} />
      <div className="container-fluid">
        <div className="col-md-8 col-sm-12 ">
        <BaseFigures className="col-sm-12"/>
        <div className="col-sm-12">
           <Chart />
        </div>
      </div>
      <TableContainer className="col-sm-4" />
      </div>
    </div>
);
