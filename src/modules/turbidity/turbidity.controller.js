class TurbidityController {
    constructor(turbidityService) {
        this.turbidityService = turbidityService;
    }

    async getAllTurbidityRecords(req, res) {
        try {
            const records = await this.turbidityService.getAllTurbidityRecords();
            res.status(200).json({ success: true, count: records.length, data: records });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching turbidity records', error: error.message });
        }
    }

    async getTurbidityRecordById(req, res) {
        try {
            const { id } = req.params;
            const record = await this.turbidityService.getTurbidityRecordById(id);
            res.status(200).json({ success: true, data: record });
        } catch (error) {
            const statusCode = error.message.includes('not found') || error.message.includes('Invalid') ? 404 : 500;
            res.status(statusCode).json({ success: false, message: 'Error fetching turbidity record', error: error.message });
        }
    }

    async createTurbidityRecord(req, res) {
        try {
            const { value, timestamp } = req.body;
            const data = { value };
            if (timestamp) data.timestamp = new Date(timestamp);

            const newRecord = await this.turbidityService.createTurbidityRecord(data);
            res.status(201).json({ success: true, message: 'Turbidity record created successfully', data: newRecord });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Error creating turbidity record', error: error.message });
        }
    }

    async updateTurbidityRecord(req, res) {
        try {
            const { id } = req.params;
            const { value, timestamp } = req.body;
            const data = {};
            if (value !== undefined) data.value = value;
            if (timestamp) data.timestamp = new Date(timestamp);

            const updated = await this.turbidityService.updateTurbidityRecord(id, data);
            res.status(200).json({ success: true, message: 'Turbidity record updated successfully', data: updated });
        } catch (error) {
            const statusCode = error.message.includes('not found') || error.message.includes('Invalid') ? 404 : 400;
            res.status(statusCode).json({ success: false, message: 'Error updating turbidity record', error: error.message });
        }
    }

    async deleteTurbidityRecord(req, res) {
        try {
            const { id } = req.params;
            const result = await this.turbidityService.deleteTurbidityRecord(id);
            res.status(200).json({ success: true, ...result });
        } catch (error) {
            const statusCode = error.message.includes('not found') || error.message.includes('Invalid') ? 404 : 500;
            res.status(statusCode).json({ success: false, message: 'Error deleting turbidity record', error: error.message });
        }
    }

    async getLatestRecords(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const records = await this.turbidityService.getLatestRecords(limit);
            res.status(200).json({ success: true, count: records.length, data: records });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching latest records', error: error.message });
        }
    }

    async getAverageTurbidity(req, res) {
        try {
            const result = await this.turbidityService.getAverageTurbidity();
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error calculating average', error: error.message });
        }
    }
}

export default TurbidityController;