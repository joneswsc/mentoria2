import React from 'react';
import { observer, inject } from 'mobx-react';
export default inject(["store"])(observer(({ className, store }) => (
  <div className={ className }>
    <div>
      <label>Idade Atual:</label>
      <input type="number" maxLength="7" value={ store.idadeAtual } onChange={e => store.setIdadeAtual(e.target.value) } />
    </div>
    <div>
      <label>Aporte Inicial:</label>
      <input type="number" maxLength="7" value={ store.aporteInicial } onChange={e => store.setAporteInicial(e.target.value) } />
    </div>
    <div>
      <label>Deposito Mensal:</label>
      <input type="number" maxLength="5" value={store.depositoMensal} onChange={ e => store.setDepositoMensal(e.target.value) }/>
    </div>
    <div>
      <label>Taxa de Rentabilidade anual:</label>
      <input type="number" value={ store.taxaRentabilidade } onChange={e => store.setTaxaRentabilidade(e.target.value) } />
    </div>
    <div>
      <label>Inflação anual:</label>
      <input type="number" value={ store.inflacao } onChange={e => store.setInflacao(e.target.value) } />
    </div>
    <div>
      <label>Idade que pretende aposentar:</label>
      <input type="number" value={ store.idadeAposentadoria } onChange={e => store.setIdadeAposentadoria(e.target.value) } />
    </div>
    <div>
      <label>Retirada mensal após aposentadoria:</label>
      <input type="number" value={ store.retiradaMensal } onChange={e => store.setRetiradaMensal(e.target.value) } />
    </div>
    {store.investimentoExtras.map(({ ano, mes, valor }, i) => (
      <div key={i}>
        <label>Depositos/saques Avulsas: [Ano][Mes][Valor]</label>
        <input id="anomes" type="number" min="0" max={store.idadeAposentadoria} value={ano} onChange={ e => store.setInvestimentoExtra("ano", i, e.target.value) } />
        <input id="anomes" type="number" min="1" max="12" value={mes} onChange={ e => store.setInvestimentoExtra("mes", i, e.target.value) } />
        <input type="number" value={valor} onChange={ e => store.setInvestimentoExtra("valor", i, e.target.value) } />

        {i === store.investimentoExtras.length - 1 ?
          <button className="btn btn-xs" onClick={ () => store.addInvestimentoExtra() }>+</button> :
          <button className="btn btn-xs" onClick={ () => store.removeInvestimentoExtra(i) }>X</button>}
      </div>))
    }
  </div>
)));
