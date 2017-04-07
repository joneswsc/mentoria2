import React from 'react';
import { observer, inject } from 'mobx-react';

import Table from './Table';

export default inject(({ store : { investimentos }}) => ({ investimentos }))
	(observer(({ className, investimentos }) => {
		const output = investimentos
			.filter(ano => ano.saldo > 0 || ano.juroAnual > 0)
			.reduce((acc, ano, index) => ({
				juroTotal: acc.juroTotal + ano.juroAnual,
				investimentoExtraTotal: acc.investimentoExtraTotal + ano.investimentoAnual,
				retiradaTotal: acc.retiradaTotal + ano.retiradaAnual,
				rows: acc.rows.concat([
					[ano.parcial ? ano.parcial + "m" : index ,
					Math.round(ano.juroAnual || 0),
					Math.round(ano.investimentoAnual),
					Math.round(-ano.retiradaAnual),
					Math.round(ano.saldo)]])
			}), { juroTotal: 0, retiradaTotal:0, investimentoExtraTotal: 0, investimentoExtraTotal: 0,rows: [] });

		return <Table className={className}
			headings={["Anos", "Juros", "Aporte",  "Retirada", "Saldo"]}
			rows={output.rows}
			totals={[" ", Math.round(output.juroTotal), Math.round(output.investimentoExtraTotal),Math.round(-output.retiradaTotal), " "]} />;
	})
);
