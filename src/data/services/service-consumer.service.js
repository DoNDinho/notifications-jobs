'use strict';
const axios = require('axios');

module.exports = class ServiceConsumer {
	static post(data) {
		const { url, headers, body } = data;
		const response = axios.post(url, body, { headers });
		return response.data;
	}
};
