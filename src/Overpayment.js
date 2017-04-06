import React from 'react';
import { observer, inject } from 'mobx-react';

export default inject(["store"])(observer(({ className, store }) => (
  <div className={className}>
    <div>
      <h2>Adicionais</h2>
      <label>Aportes Mensais</label>
      <input type="text" maxLength="5" value={store.investimentoExtraMensal} onChange={ e => store.setInvestimentoExtraMensal(e.target.value) }/>
    </div>
    <div><label></label></div>
    <div>
      <label>Aportes Avulsas</label>
    </div>
    <div>
      <label>Ano______Mes______Valor</label>

    </div>
    {store.investimentoExtras.map(({ ano, mes, valor }, i) => (
      <div key={i}>
        <input type="number" min="0" max={store.anos} value={ano} onChange={ e => store.setInvestimentoExtra("ano", i, e.target.value) } />
        <input type="number" min="1" max="12" value={mes} onChange={ e => store.setInvestimentoExtra("mes", i, e.target.value) } />
        <input type="text" value={valor} onChange={ e => store.setInvestimentoExtra("valor", i, e.target.value) } />

        {i === store.investimentoExtras.length - 1 ?
          <button className="btn btn-xs" onClick={ () => store.addInvestimentoExtra() }>+</button> :
          <button className="btn btn-xs" onClick={ () => store.removeInvestimentoExtra(i) }>X</button>}
      </div>))
    }

  </div>
)));
