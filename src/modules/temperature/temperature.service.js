import mongoose from 'mongoose';

class TemperatureService {
    constructor(temperatureRepository) {
        this.temperatureRepository = temperatureRepository;
    }

    async getAllTemperatureRecords() {
        try {
            return await this.temperatureRepository.findAll();
        } catch (error) {
            throw new Error('Error fetching temperature records: ' + error.message);
        }
    }

    async getTemperatureRecordById(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid temperature record ID');
            }

            const record = await this.temperatureRepository.findById(id);
            if (!record) throw new Error('temperature record not found');
            return record;
        } catch (error) {
            throw new Error('Error fetching temperature record: ' + error.message);
        }
    }

    async createTemperatureRecord(data) {
        try {
            if (data.value === undefined || typeof data.value !== 'number') {
                throw new Error('Temperature value must be a number');
            }

            return await this.temperatureRepository.create(data);
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new Error('Validation error: ' + error.message);
            }
            throw new Error('Error creating temperature record: ' + error.message);
        }
    }

    async updateTemperatureRecord(id, data) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid temperature record ID');
            }

            const updated = await this.temperatureRepository.update(id, data);
            if (!updated) throw new Error('temperature record not found');
            return updated;
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new Error('Validation error: ' + error.message);
            }
            throw new Error('Error updating temperature record: ' + error.message);
        }
    }

    async deleteTemperatureRecord(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid temperature record ID');
            }

            const deleted = await this.temperatureRepository.delete(id);
            if (!deleted) throw new Error('temperature record not found');
            return { message: 'temperature record deleted successfully', data: deleted };
        } catch (error) {
            throw new Error('Error deleting temperature record: ' + error.message);
        }
    }

    async getLatestRecords(limit = 10) {
        try {
            return await this.temperatureRepository.getLatest(limit);
        } catch (error) {
            throw new Error('Error fetching latest records: ' + error.message);
        }
    }

    async getAverageTemperature() {
        try {
            return await this.temperatureRepository.getAverage();
        } catch (error) {
            throw new Error('Error calculating average: ' + error.message);
        }
    }
}

export default TemperatureService;
