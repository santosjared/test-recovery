import { comparar } from '../common/bycript.js';
import { User } from '../models/users.js';
import logger from '../logs/logger.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Usuario incorrecta' });
        }
        if (!(await comparar(password, user.password))) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }
        const secret = process.env.JWT_SECRET;
        const seconds = process.env.JWT_EXPIRES_SECONDS;
        const payload = { userId: user.id };
        const token = jwt.sign(payload, secret, { expiresIn: eval(seconds) });
        res.json({ token });
    } catch (error) {
        logger.error('error en login' + error);
        res.status(500).json({ message: 'server error' });
    }
}

export { login };