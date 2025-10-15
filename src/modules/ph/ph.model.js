import mongoose from 'mongoose';

const phSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
        min: 0,
        max: 14,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, 
});

const Ph = mongoose.model('Ph', phSchema);

export default Ph;