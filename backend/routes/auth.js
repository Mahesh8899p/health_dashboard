import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

router.post('/register', async (req, res) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password)
return res.status(400).json({ message: 'Missing fields' });

const existing = await User.findOne({ email });
if (existing) return res.status(409).json({ message: 'Email in use' });

const user = await User.create({ name, email, password });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
expiresIn: '7d',
});
res.status(201).json({ token, user: { id: user._id, name, email } });
} catch (e) {
res.status(500).json({ message: 'Server error' });
}
});

router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });

const ok = await user.comparePassword(password);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
expiresIn: '7d',
});
res.json({ token, user: { id: user._id, name: user.name, email } });
} catch (e) {
res.status(500).json({ message: 'Server error' });
}
});

export default router;