'use strict';
const sendMailRquestConverter = (emailData) => {
	const { idTemplate, from, to, subject, params } = emailData;

	const requestMail = {
		data: {
			id_template: idTemplate,
			email_info: {
				from_description: from,
				to,
				subject
			},
			list_params: {
				params
			}
		}
	};

	return requestMail;
};

module.exports = { sendMailRquestConverter };
