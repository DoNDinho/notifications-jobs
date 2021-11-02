'use strict';
const oracledb = require('oracledb');

const getCompaniesToPay = () => {
	return {
		name: 'SP_LISTAR_EMPRESAS_POR_PAGAR',
		statement: `BEGIN SP_LISTAR_EMPRESAS_POR_PAGAR(:P_RECORDSET, :P_CODIGO, :P_MENSAJE); END;`,
		bind: {
			P_RECORDSET: { type: oracledb.DB_TYPE_CURSOR, dir: oracledb.BIND_OUT },
			P_CODIGO: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT },
			P_MENSAJE: { type: oracledb.DB_TYPE_VARCHAR, dir: oracledb.BIND_OUT }
		}
	};
};

module.exports = { getCompaniesToPay };
