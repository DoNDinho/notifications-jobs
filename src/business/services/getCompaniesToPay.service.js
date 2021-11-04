const companiesToPayRepository = require('../../data/repository/companiesToPay.repository');
const sendMailRepository = require('../../data/repository/send-mail.repository');
const { sendMailRquestConverter } = require('../converter/send-mail.converter');

const execute = async () => {
	const companiesToPay = await getCompaniesToPay();
	const params = await Promise.all(companiesToPay.map((companies) => buildEmailParams(companies)));
	const requestsMail = await Promise.all(
		params.map((param) => {
			const emailData = {
				idTemplate: process.env.GET_COMPANIES_TO_PAY_TEMPLATE,
				from: process.env.SENDMAIL_FROM,
				to: param.email,
				subject: process.env.GET_COMPANIES_TO_PAY_SUBJECT,
				params: param.params
			};

			return sendMailRquestConverter(emailData);
		})
	);

	Promise.allSettled(requestsMail.map((request) => sendMailRepository.sendMail(request)));
};

const getCompaniesToPay = async () => {
	try {
		const result = await companiesToPayRepository.getCompaniesToPay();
		return result;
	} catch (error) {
		throw error;
	}
};

const buildEmailParams = (item) => {
	return {
		email: item.EMAIL,
		params: [
			{
				name: 'nombreEmpresa',
				value: item.NOMBRE
			},
			{
				name: 'fechaVencimiento',
				value: item.FECHAVENCIMIENTO // TODO Formatear fecha a YYYY-MM-DD
			},
			{
				name: 'idContrato',
				value: item.ID_CONTRATO.toString()
			},
			{
				name: 'idPago',
				value: item.ID_PAGO.toString()
			},
			{
				name: 'totalPagar',
				value: item.TOTALPAGAR.toString()
			}
		]
	};
};

module.exports = { execute };
