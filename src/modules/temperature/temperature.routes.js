import express from 'express';
import TemperatureModel from './temperature.model.js';
import TemperatureRepository from './temperature.repository.js';
import TemperatureService from './temperature.service.js';
import TemperatureController from './temperature.controller.js';

const temperatureRouter = express.Router();

const temperatureRepository = new TemperatureRepository(TemperatureModel);
const temperatureService = new TemperatureService(temperatureRepository);
const temperatureController = new TemperatureController(temperatureService);

temperatureRouter.get('/', (req, res) => temperatureController.getAllTemperatureRecords(req, res));
temperatureRouter.get('/latest', (req, res) => temperatureController.getLatestRecords(req, res));
temperatureRouter.get('/average', (req, res) => temperatureController.getAverageTemperature(req, res));
temperatureRouter.get('/:id', (req, res) => temperatureController.getTemperatureRecordById(req, res));
temperatureRouter.post('/', (req, res) => temperatureController.createTemperatureRecord(req, res));
temperatureRouter.put('/:id', (req, res) => temperatureController.updateTemperatureRecord(req, res));
temperatureRouter.delete('/:id', (req, res) => temperatureController.deleteTemperatureRecord(req, res));

export default temperatureRouter;
