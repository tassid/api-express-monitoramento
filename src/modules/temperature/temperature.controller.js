import mongoose from 'mongoose';

class TemperatureController {
    constructor(temperatureService) {
        this.temperatureService = temperatureService;
    }

    async getAllTemperatureRecords(req, res) {
        try {
            const records = await this.temperatureService.getAllTemperatureRecords();
            res.status(200).json({
                success: true,
                count: records.length,
                data: records
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching temperature records',
                error: error.message
            });
        }
    }

    async getTemperatureRecordById(req, res) {
        try {
            const { id } = req.params;
            const record = await this.temperatureService.getTemperatureRecordById(id);
            res.status(200).json({ success: true, data: record });
        } catch (error) {
            const statusCode = error.message.includes('not found') || error.message.includes('Invalid') ? 404 : 500;
            res.status(statusCode).json({ success: false, message: 'Error fetching temperature record', error: error.message });
        }
    }

    async createTemperatureRecord(req, res) {
        try {
            const { value, timestamp } = req.body;
            const data = { value };
            if (timestamp) data.timestamp = new Date(timestamp);

            const newRecord = await this.temperatureService.createTemperatureRecord(data);
            res.status(201).json({ success: true, message: 'Temperature record created successfully', data: newRecord });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Error creating temperature record', error: error.message });
        }
    }

    async updateTemperatureRecord(req, res) {
        try {
            const { id } = req.params;
            const { value, timestamp } = req.body;
            const data = {};
            if (value !== undefined) data.value = value;
            if (timestamp) data.timestamp = new Date(timestamp);

            const updated = await this.temperatureService.updateTemperatureRecord(id, data);
            res.status(200).json({ success: true, message: 'Temperature record updated successfully', data: updated });
        } catch (error) {
            const statusCode = error.message.includes('not found') || error.message.includes('Invalid') ? 404 : 400;
            res.status(statusCode).json({ success: false, message: 'Error updating temperature record', error: error.message });
        }
    }

    async deleteTemperatureRecord(req, res) {
        try {
            const { id } = req.params;
            const result = await this.temperatureService.deleteTemperatureRecord(id);
            res.status(200).json({ success: true, ...result });
        } catch (error) {
            const statusCode = error.message.includes('not found') || error.message.includes('Invalid') ? 404 : 500;
            res.status(statusCode).json({ success: false, message: 'Error deleting temperature record', error: error.message });
        }
    }

    async getLatestRecords(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const records = await this.temperatureService.getLatestRecords(limit);
            res.status(200).json({ success: true, count: records.length, data: records });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching latest records', error: error.message });
        }
    }

    async getAverageTemperature(req, res) {
        try {
            const result = await this.temperatureService.getAverageTemperature();
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error calculating average', error: error.message });
        }
    }
}

export default TemperatureController;