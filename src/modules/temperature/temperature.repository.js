class TemperatureRepository {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        return await this.model.find().sort({ timestamp: -1 }).lean();
    }

    async findById(id) {
        return await this.model.findById(id).lean();
    }

    async create(data) {
        const newRecord = new this.model(data);
        return await newRecord.save();
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id).lean();
    }

    async getLatest(limit = 10) {
        return await this.model.find().sort({ timestamp: -1 }).limit(limit).lean();
    }

    async getAverage() {
        const result = await this.model.aggregate([
            { $group: { _id: null, avgValue: { $avg: '$value' }, count: { $sum: 1 } } }
        ]);
        return result[0] || { avgValue: 0, count: 0 };
    }
}

export default TemperatureRepository;
