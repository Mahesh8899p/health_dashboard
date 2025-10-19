import { Router } from 'express';
import auth from '../middleware/auth.js';
import Entry from '../models/Entry.js';

const router = Router();

//Create
router.post('/', auth, async (req, res) => {
try {
const { type, value, note, date } = req.body;
const entry = await Entry.create({
user: req.user.id,
type,
value,
note,
date: date ? new Date(date) : undefined,
});
res.status(201).json(entry);
} catch (e) {
res.status(400).json({ message: 'Invalid payload' });
}
});

//List with optional date range 
router.get('/', auth, async (req, res) => {
const { from, to, type } = req.query;
const q = { user: req.user.id };
if (type) q.type = type;
if (from || to) q.date = {};
if (from) q.date.$gte = new Date(from);
if (to) q.date.$lte = new Date(to);
const entries = await Entry.find(q).sort({ date: -1 }).limit(500);
res.json(entries);
});

//Simple stats by type
router.get('/stats', auth, async (req, res) => {
const { from, to } = req.query;
const match = { user: Entry.db.castObjectId(req.user.id) };
if (from || to) match.date = {};
if (from) match.date.$gte = new Date(from);
if (to) match.date.$lte = new Date(to);

const stats = await Entry.aggregate([
{ $match: match },
{ $group: { _id: '$type', total: { $sum: '$value' }, count: { $sum: 1 } } },
]);
res.json(stats);
});

//Delete
router.delete('/:id', auth, async (req, res) => {
const deleted = await Entry.findOneAndDelete({ _id: req.params.id, user: req.user.id });
if (!deleted) return res.status(404).json({ message: 'Not found' });
res.json({ ok: true });
});

export default router;