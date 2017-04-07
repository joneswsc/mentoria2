import React from 'react';
import { observer, inject } from 'mobx-react';
export default inject(["store"])(observer(({ className, store }) => (
  <div className={ className }>
    <div>
      <h3>Básicos</h3>
      <label>Aporte Inicial</label>
      <input type="text" maxLength="7" value={ store.inicial } onChange={e => store.setInicial(e.target.value) } />
    </div>

    <div>
      <label>Tempo investimento</label>
      <input type="number" maxLength="2" value={ store.anos } onChange={e => store.setAnos(+e.target.value) } />
    </div>
    <div>
      <label>%Rentabilidade</label>
      <input type="text" value={ store.taxas } onChange={e => store.setTaxas(e.target.value) } />
    </div>
    <div>
      <label>Retiradas mensais</label>
      <input type="text" value={ store.retiradaMensal } onChange={e => store.setRetiradaMensal(e.target.value) } />
    </div>
  </div>
)));
