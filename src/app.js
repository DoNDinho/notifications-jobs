'use strict';
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
global.logger = require('./business/utils/configs/log4js.config');
const healthRoute = require('./client/routes/health');
const port = process.env.PORT;
const cron = require('node-cron');
const getCompaniesToPayService = require('./business/services/getCompaniesToPay.service');

const app = express();

// Configurando middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurando rutas
app.use(healthRoute);

app.listen(port, () => {
	logger.info('Servidor en puerto', port);

	// TODO descomentar cuando se implemente servicio de envio de correo
	// cron.schedule('*/5 * * * * *', async () => {
	// 	await getCompaniesToPayService.execute();
	// });
});
