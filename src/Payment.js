import React from 'react';
import { observer, inject } from 'mobx-react';

export default inject(({ store : { investimentoMensalTotal }}) => ({ investimentoMensalTotal }))
    (observer(({ title, investimentoMensalTotal }) => (
      <h3>{title}
        <span className="money"> { investimentoMensalTotal }</span>
      </h3>
)));
