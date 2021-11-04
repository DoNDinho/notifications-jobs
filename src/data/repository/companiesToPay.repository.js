'use strict';
const Runner = require('../database/oracle/runner/runner');
const sqlProcedures = require('../database/oracle/sql_procedures');

const getCompaniesToPay = async () => {
	try {
		const database = new Runner();
		const procedure = sqlProcedures.getCompaniesToPay();
		const result = await database.runCursorProcedure(procedure);
		return result;
	} catch (error) {
		throw error;
	}
};

module.exports = { getCompaniesToPay };
