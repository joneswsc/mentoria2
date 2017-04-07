import { observable, computed, action } from 'mobx';

export default class {
  @observable inicial = 100000;
  @observable taxas = 10;
  @observable inflacao = 5;
  @observable idadeAtual = 48;
  @observable anos = 17;
  @observable espectativaIdadeAnos = 100;
  @observable retiradaMensal = 10000;
  @observable investimentoExtraMensal = 1000;
  @observable investimentoExtras = [{ ano: 0, mes: 1, valor: 0 }];
  @observable saldoFinal=1000000;

  @action setAnos = (val) => this.anos = val;
  @action setTaxas = (val) => this.taxas = val;
  @action setInflacao = (val) => this.inflacao = val;
  @action setInicial = (val) => this.inicial = val;
  @action setRetiradaMensal = (val) => this.retiradaMensal = val;
  @action setInvestimentoExtraMensal = (val) => this.investimentoExtraMensal = val;
  @action addInvestimentoExtra = () => this.investimentoExtras.push({ ano: 0, mes: 1, valor: 0 });
  @action removeInvestimentoExtra = (index) => this.investimentoExtras.splice(index, 1);
  @action setInvestimentoExtra = (field, index, val) => this.investimentoExtras[index][field] = val;

  @computed get investimentoMensal() {
    return 0 ; // +this.inicial * (this.taxas / 1200) ;
  }

  @computed get investimentoMensalTotal() {
    return (this.investimentoMensal + (+this.investimentoExtraMensal)).toFixed(2);
  }

  @computed get investimentos() {
    const percTaxaMensal = this.taxas / 1200;

    let saldo = +this.inicial;
    let saldoFinal = +this.inicial;
    let linhabase = +this.inicial;
    let investimentos = [{ investimentoExtra: 0, retiradaAnual:0 ,investimentoAnual:this.inicial, saldo, linhabase, juroAnual:0 }];
    let parcial;

console.log(investimentos);

    for (let ano = 0; ano < (this.espectativaIdadeAnos-this.idadeAtual); ano++) {
      let juroAnual = 0;
      let investimentoExtraAnual = 0;
      let retiradaAnual = 0;
      let investimentoAnual = 0;

      for (let mes = 1; mes <= 12; mes++) {
        let investimentoExtra = this.investimentoExtras.filter(x => (x.ano == ano && x.mes == mes))
          .reduce((acc, val) => acc + (+val.valor), 0);
        const juroMensal = saldo * percTaxaMensal;
        juroAnual += juroMensal;
        investimentoExtraAnual += investimentoExtra;

        if (ano < this.anos) {
          investimentoAnual = investimentoExtraAnual + (this.investimentoExtraMensal * (parcial || 12));
          retiradaAnual = 0;
          saldo += this.investimentoMensal + (+this.investimentoExtraMensal) + investimentoExtra + juroMensal;
          linhabase += this.investimentoMensal + (linhabase * percTaxaMensal);
          saldoFinal += this.investimentoMensal + (+this.investimentoExtraMensal) + investimentoExtra + juroMensal;
        }

        if (ano >= this.anos) {
          investimentoAnual = 0;
          retiradaAnual = retiradaAnual + this.retiradaMensal ;
          saldo = saldo - this.retiradaMensal + juroMensal;
          linhabase = linhabase - this.retiradaMensal + juroMensal;
        }

        if (saldo <= 0) {
          console.log(saldo);
          retiradaAnual = retiradaAnual + saldo;
          saldo = 0;
          if (parcial === undefined && mes !== 12) {
            parcial = mes;
          }
        }

        if (linhabase <0) {
          linhabase = 0;
        }
      }

      investimentos.push({ linhabase, juroAnual, retiradaAnual, saldo, parcial, investimentoAnual });
      if (parcial) parcial = 0;
      if (saldo <= 0) {
        break;
      }
    }
    return investimentos;
  }
}
