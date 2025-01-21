import jwt from 'jsonwebtoken';
import  logger  from '../logs/logger.js';


export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ status:401,error:'unauthorized',message: 'Acceso denegado, necesita autenticarse'});
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET,
            (error, decoded) => {
                if (error) {
                    logger.error('Error al verificar el token' + error);
                    return res.status(401).send({ status:401,error:'unauthorized',message: 'Acceso denegado, necesita autenticarse'});
                }
                req.user = decoded;
                next();
            }
        );
    } catch (ex) {
        res.status(400).send({ error: 'Invalid token.' });
    }
};
