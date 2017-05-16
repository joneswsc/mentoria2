import React from 'react';
import { observer, inject } from 'mobx-react';

export default inject(["store"])(observer(({ className, store }) => (
  <div className={className}>

  <br/><br/><br/>

    <div>
      <label>Depositos Mensais</label>
      <input type="text" maxLength="5" value={store.depositoMensal} onChange={ e => store.setDepositoMensal(e.target.value) }/>
    </div>
    <div>
      <label>Depositos/Saques Avulsas</label>
    </div>
    <div>
      <label>Ano____Mes___Valor</label>
    </div>
    {store.investimentoExtras.map(({ ano, mes, valor }, i) => (
      <div key={i}>
        <input id="intervalo" type="number" min="0" max={(store.idadeAposentadoria-store.idadeAtual)} value={ano} onChange={ e => store.setInvestimentoExtra("ano", i, e.target.value) } />
        <input id="intervalo" type="number" min="1" max="12" value={mes} onChange={ e => store.setInvestimentoExtra("mes", i, e.target.value) } />
        <input type="text" value={valor} onChange={ e => store.setInvestimentoExtra("valor", i, e.target.value) } />

        {i === store.investimentoExtras.length - 1 ?
          <button className="btn btn-xs" onClick={ () => store.addInvestimentoExtra() }>+</button> :
          <button className="btn btn-xs" onClick={ () => store.removeInvestimentoExtra(i) }>X</button>}
      </div>))
    }

  </div>
)));
