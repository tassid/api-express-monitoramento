class PhController {
    constructor(phService) {
        this.phService = phService; 
    }

    async getAllPhRecords(req, res) {
        try {
            const records = await this.phService.getAllPhRecords();
            res.status(200).json({
                success: true,
                count: records.length,
                data: records
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error fetching pH records', 
                error: error.message 
            });
        }
    }

    async getPhRecordById(req, res) {
        try {
            const { id } = req.params;
            const record = await this.phService.getPhRecordById(id);
            res.status(200).json({
                success: true,
                data: record
            });
        } catch (error) {
            const statusCode = error.message.includes('not found') || error.message.includes('Invalid') ? 404 : 500;
            res.status(statusCode).json({ 
                success: false,
                message: 'Error fetching pH record', 
                error: error.message 
            });
        }
    }

    async createPhRecord(req, res) {
        try {
            const { value, timestamp } = req.body;
            const data = { value };
            
            if (timestamp) {
                data.timestamp = new Date(timestamp);
            }

            const newRecord = await this.phService.createPhRecord(data);
            res.status(201).json({
                success: true,
                message: 'pH record created successfully',
                data: newRecord
            });
        } catch (error) {
            res.status(400).json({ 
                success: false,
                message: 'Error creating pH record', 
                error: error.message 
            });
        }
    }

    async updatePhRecord(req, res) {
        try {
            const { id } = req.params;
            const { value, timestamp } = req.body;
            
            const data = {};
            if (value !== undefined) data.value = value;
            if (timestamp) data.timestamp = new Date(timestamp);

            const updated = await this.phService.updatePhRecord(id, data);
            res.status(200).json({
                success: true,
                message: 'pH record updated successfully',
                data: updated
            });
        } catch (error) {
            const statusCode = error.message.includes('not found') || error.message.includes('Invalid') ? 404 : 400;
            res.status(statusCode).json({ 
                success: false,
                message: 'Error updating pH record', 
                error: error.message 
            });
        }
    }

    async deletePhRecord(req, res) {
        try {
            const { id } = req.params;
            const result = await this.phService.deletePhRecord(id);
            res.status(200).json({
                success: true,
                ...result
            });
        } catch (error) {
            const statusCode = error.message.includes('not found') || error.message.includes('Invalid') ? 404 : 500;
            res.status(statusCode).json({ 
                success: false,
                message: 'Error deleting pH record', 
                error: error.message 
            });
        }
    }

    async getLatestRecords(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const records = await this.phService.getLatestRecords(limit);
            res.status(200).json({
                success: true,
                count: records.length,
                data: records
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error fetching latest records', 
                error: error.message 
            });
        }
    }

    async getAveragePhValue(req, res) {
        try {
            const result = await this.phService.getAveragePhValue();
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error calculating average', 
                error: error.message 
            });
        }
    }
}

export default PhController;