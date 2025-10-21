import mongoose from 'mongoose';

const turbiditySchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
        min: 0,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Turbidity = mongoose.model('Turbidity', turbiditySchema);

export default Turbidity;