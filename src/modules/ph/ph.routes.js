import express from 'express';
import PhModel from './ph.model.js';
import PhRepository from './ph.repository.js';
import PhService from './ph.service.js';
import PhController from './ph.controller.js';

const phRouter = express.Router();

const phRepository = new PhRepository(PhModel);
const phService = new PhService(phRepository);
const phController = new PhController(phService);

phRouter.get('/', (req, res) => phController.getAllPhRecords(req, res));
phRouter.get('/latest', (req, res) => phController.getLatestRecords(req, res));
phRouter.get('/average', (req, res) => phController.getAveragePhValue(req, res));
phRouter.get('/:id', (req, res) => phController.getPhRecordById(req, res));
phRouter.post('/', (req, res) => phController.createPhRecord(req, res));
phRouter.put('/:id', (req, res) => phController.updatePhRecord(req, res));
phRouter.delete('/:id', (req, res) => phController.deletePhRecord(req, res));

export default phRouter;