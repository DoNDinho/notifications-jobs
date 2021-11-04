'use strict';
const ServiceConsumer = require('../services/service-consumer.service');

const sendMail = (body) => {
	try {
		const headers = createHeaders();
		const data = { url: process.env.SENDMAIL_FROM, headers, body };

		// TODO descomentar unavez se tenga el servicio para envío de email
		//ServiceConsumer.post(data);
	} catch (error) {
		throw error;
	}
};

const createHeaders = () => {
	const random = Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
	return {
		'transaction-id': random.toString(),
		timestamp: new Date(),
		channel: 'JOB'
	};
};

module.exports = { sendMail };
