import express from 'express';
import TurbidityModel from './turbidity.model.js';
import TurbidityRepository from './turbidity.repository.js';
import TurbidityService from './turbidity.service.js';
import TurbidityController from './turbidity.controller.js';

const turbidityRouter = express.Router();

const turbidityRepository = new TurbidityRepository(TurbidityModel);
const turbidityService = new TurbidityService(turbidityRepository);
const turbidityController = new TurbidityController(turbidityService);

turbidityRouter.get('/', (req, res) => turbidityController.getAllTurbidityRecords(req, res));
turbidityRouter.get('/latest', (req, res) => turbidityController.getLatestRecords(req, res));
turbidityRouter.get('/average', (req, res) => turbidityController.getAverageTurbidity(req, res));
turbidityRouter.get('/:id', (req, res) => turbidityController.getTurbidityRecordById(req, res));
turbidityRouter.post('/', (req, res) => turbidityController.createTurbidityRecord(req, res));
turbidityRouter.put('/:id', (req, res) => turbidityController.updateTurbidityRecord(req, res));
turbidityRouter.delete('/:id', (req, res) => turbidityController.deleteTurbidityRecord(req, res));

export default turbidityRouter;
