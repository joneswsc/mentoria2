import { observable, computed, action } from 'mobx';

export default class {
  @observable idadeAtual = 32;
  @observable aporteInicial = 200000;
  @observable depositoMensal = 1000;
  @observable taxaRentabilidade = 10;
  @observable inflacao = 5;

  @observable idadeAposentadoria = 60;
  @observable retiradaMensal = 8000;
  @observable anos = 28;

  @observable espectativaIdadeAnos = 120;
  @observable saldoFinal=0;

  @observable investimentoExtras = [{ ano: 0, mes: 0, valor: 0 }];

  @action setAnos = (val) => this.anos = val;
  @action setIdadeAtual = (val) => this.idadeAtual = val;
  @action setAporteInicial = (val) => this.aporteInicial = val;
  @action setDepositoMensal = (val) => this.depositoMensal = val;
  @action setTaxaRentabilidade = (val) => this.taxaRentabilidade = val;
  @action setInflacao = (val) => this.inflacao = val;
  @action setIdadeAposentadoria = (val) => this.idadeAposentadoria = val;
  @action setRetiradaMensal = (val) => this.retiradaMensal = val;
  @action addInvestimentoExtra = () => this.investimentoExtras.push({ ano: 0, mes: 0, valor: 0 });
  @action removeInvestimentoExtra = (index) => this.investimentoExtras.splice(index, 1);
  @action setInvestimentoExtra = (field, index, val) => this.investimentoExtras[index][field] = val;

  @computed get investimentoMensal() {
    return 0 ; // +this.inicial * (this.taxas / 1200) ;
  }

  @computed get investimentoMensalTotal() {
    return (this.investimentoMensal + (+this.depositoMensal)).toFixed(2);
  }

  @computed get investimentos() {
    const percTaxaMensal = this.taxaRentabilidade / 1200;

    let saldo = +this.aporteInicial;
    let saldoFinal = +this.aporteInicial;
    let saldoRent = +this.aporteInicial;
    let saldoRentImp = +this.aporteInicial;
    let linhabase = +this.aporteInicial;
    let investimentos = [{ investimentoExtra: 0, impostoAnual:0, retiradaAnual:0 ,investimentoAnual:this.aporteInicial, saldo, linhabase, juroAnual:0, idade: +this.idadeAtual, saldoRent, saldoRentImp }];
    let parcial;
    let idade;
    let taxaimpostoAnual = 0.15;
    let taxaRentAnual = 1 + (this.taxaRentabilidade/100);
    let taxaRentMensal = taxaRentAnual ** (1/12);
    let taxaRentImpAnual = 1 + ((this.taxaRentabilidade/100) * (1-taxaimpostoAnual));
    let taxaRentImpMensal = taxaRentImpAnual ** (1/12);
    let taxaRentImpInflacaoAnual = 1 + ((this.taxaRentabilidade/100) * (1-taxaimpostoAnual)) - (this.inflacao/100);
    //console.log('this.taxaRentabilidade:' + this.taxaRentabilidade + '; taxaimpostoAnual:' + taxaimpostoAnual + '; inflacao: ' + this.inflacao + 'taxaRentImpInflacaoAnual:' + taxaRentImpInflacaoAnual);
    let taxaRentImpInflacaoMensal = taxaRentImpInflacaoAnual  ** (1/12);
    let nummeses = 0;
    let qtdmeses = (+this.idadeAposentadoria-this.idadeAtual) * 12;
    //console.log('taxaRentImpInflacaoMensal:' + taxaRentImpInflacaoMensal);

    for (let ano = 1; ano < (+this.espectativaIdadeAnos-this.idadeAtual); ano++) {
      let juroAnual = 0;
      let investimentoExtraAnual = 0;
      let retiradaAnual = 0;
      let impostoAnual = 0;
      let contaMes = 0;
      let investimentoAnual = 0;
      let idade = +(this.idadeAtual) + ano;

      for (let mes = 1; mes <= 12; mes++) {
        let investimentoExtra = this.investimentoExtras.filter(x => (x.ano == ano && x.mes == mes))
           .reduce((acc, val) => acc + (+val.valor), 0);
        const juroMensal = saldo * percTaxaMensal;

        juroAnual += juroMensal;
        investimentoExtraAnual += investimentoExtra;
        nummeses += 1;

        // console.log(nummeses + ':' + qtdmeses + " - " + investimentos);


        if (nummeses <= qtdmeses) {
          contaMes = +this.depositoMensal;}
        else {
          contaMes = -this.retiradaMensal;
        }

        if (nummeses <= qtdmeses) {

          saldo = (saldo *  taxaRentImpInflacaoMensal) + contaMes + investimentoExtra;
          saldoRent = (saldo *  taxaRentImpInflacaoMensal) + contaMes + investimentoExtra;
          saldoRentImp = (saldo *  taxaRentImpInflacaoMensal) + contaMes + investimentoExtra;
          linhabase = saldo;
          saldoFinal = (saldoFinal *  taxaRentImpInflacaoMensal) + contaMes + investimentoExtra;

          investimentoAnual = investimentoExtraAnual + (this.depositoMensal * (parcial || 12));
          retiradaAnual = 0;
          impostoAnual = 0;
        }

        if (nummeses > qtdmeses) {
          investimentoAnual = 0;

          retiradaAnual = retiradaAnual + contaMes;
          impostoAnual = 0;

          saldo = (saldo *  taxaRentImpInflacaoMensal) + contaMes + investimentoExtra;
          saldoRent = (saldo *  taxaRentImpInflacaoMensal) + contaMes + investimentoExtra;
          saldoRentImp = (saldo *  taxaRentImpInflacaoMensal) + contaMes + investimentoExtra;
        }

        //console.log('Ano: ' + ano + ' Mes: '+ mes + ' ContaMed:' + contaMes + ' Saldo:' + saldo);


        if (saldo <= 0) {
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

      investimentos.push({ linhabase, impostoAnual, juroAnual, retiradaAnual, saldo, parcial, investimentoAnual, idade, saldoRent, saldoRentImp });
      if (parcial) {
         parcial = 0;
      }

      if (saldo <= 0) {
        break;
      }
    }

    return investimentos;
  }
}
