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
    <Header title={"Simulador de poupança 2 (em desenvolvimento)"} />
    <div className="container-fluid">
      <div className="col-sm-12 col-md-8">
        <BaseFigures className="col-sm-4"/>
        <Overpayment className="col-sm-8"/>
      </div>
          <Chart className="col-sm-8 col-md-8" />
            <TableContainer className="col-sm-8 col-md-8" />


    </div>
  </div>
);
