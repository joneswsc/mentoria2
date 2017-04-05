import React from 'react';
import { observer, inject } from 'mobx-react';
export default inject(["store"])(observer(({ className, store }) => (
  <div className={ className }>
    <div>
      <h2>Básicos</h2>
      <label>Aporte Inicial</label>
      <input type="text" maxLength="7" value={ store.inicial } onChange={e => store.setInicial(e.target.value) } />
    </div>
    <div>
      <label>Anos</label>
      <input type="number" maxLength="2" value={ store.anos } onChange={e => store.setAnos(+e.target.value) } />
    </div>
    <div>
      <label>Rentabilidade anual</label>
      <input type="text" value={ store.taxas } onChange={e => store.setTaxas(e.target.value) } />
    </div>
    <div>
      <label>Inflação anual</label>
      <input type="text" value={ store.inflacao } onChange={e => store.setInflacao(e.target.value) } />
    </div>
  </div>
)));
