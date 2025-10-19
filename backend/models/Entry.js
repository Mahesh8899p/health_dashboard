import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema(
{
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
type: {
type: String,
enum: ['calories', 'workout', 'sleep', 'steps'],
required: true,
},
value: { type: Number, required: true }, 
date: { type: Date, default: () => new Date() },
},
{ timestamps: true }
);

export default mongoose.model('Entry', entrySchema);