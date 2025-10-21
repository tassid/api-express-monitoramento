import mongoose from 'mongoose';

const temperatureSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

export default Temperature;
