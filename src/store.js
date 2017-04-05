import { observable, computed, action } from 'mobx';

export default class {
  @observable inicial = 100000;
  @observable taxas = 10;
  @observable inflacao = 5;
  @observable anos = 17;
  @observable investimentoExtraMensal = 0;
  @observable investimentoExtras = [{ ano: 0, mes: 1, valor: 0 }];

  @action setAnos = (val) => this.anos = val;
  @action setTaxas = (val) => this.taxas = val;
  @action setInflacao = (val) => this.inflacao = val;
  @action setInicial = (val) => this.inicial = val;
  @action setInvestimentoExtraMensal = (val) => this.investimentoExtraMensal = val;
  @action addInvestimentoExtra = () => this.investimentoExtras.push({ ano: 0, mes: 1, valor: 0 });
  @action removeInvestimentoExtra = (index) => this.investimentoExtras.splice(index, 1);
  @action setInvestimentoExtra = (field, index, val) => this.investimentoExtras[index][field] = val;

  @computed get investimentoMensal() {
    return +this.inicial * (this.taxas / 1200) / (1 - Math.pow(1 / (1 + this.taxas / 1200), this.anos * 12));
  }

  @computed get investimentoMensalTotal() {
    return (this.investimentoMensal + (+this.investimentoExtraMensal)).toFixed(2);
  }

  @computed get investimentos() {
    const percTaxaMensal = this.taxas / 1200;

    let saldo = +this.inicial;
    let linhabase = +this.inicial;
    let investimentos = [{ investimentoExtra: 0, saldo, linhabase }];
    let parcial;

    for (let ano = 0; ano < this.anos; ano++) {
      let juroAnual = 0;
      let investimentoExtraAnual = 0;
      for (let mes = 1; mes <= 12; mes++) {
        const investimentoExtra = this.investimentoExtras.filter(x => (x.ano == ano && x.mes == mes))
          .reduce((acc, val) => acc + (+val.valor), 0);
        const juroMensal = saldo * percTaxaMensal;
        juroAnual += juroMensal;
        investimentoExtraAnual += investimentoExtra;
        saldo -= this.investimentoMensal + (+this.investimentoExtraMensal) + investimentoExtra - juroMensal;
        linhabase -= this.investimentoMensal - (linhabase * percTaxaMensal);

        if (saldo <= 0) {
          saldo = 0;
          if (parcial === undefined && mes !== 12) {
            parcial = mes;
          }
        }
      }

      investimentos.push({ linhabase, juroAnual, saldo, parcial, investimentoExtra: investimentoExtraAnual + (this.investimentoExtraMensal * (parcial || 12)) });
      if (parcial) parcial = 0;
    }
    return investimentos;
  }
}
