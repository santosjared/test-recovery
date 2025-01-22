import logger from '../logs/logger.js';
import { User } from '../models/users.js';
import { Task } from '../models/task.js';
import { status } from '../constants/index.js';

const getUser = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'password', 'status'],
            order: [['id', 'ASC']],
            where: {
                status: status.ACTIVE,
            }
        });
        res.json(users);
    } catch (error) {
        logger.error('error getUser' + error);
        res.status(500).json({ message: 'server error' });
    }
}

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await User.create({
            username,
            password,
        });
        res.json(newUser);
    } catch (error) {
        logger.error('error en crear el usuario' + error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                message: error.errors[0].message,
            });
        }
        if (error.password === 'SequelizeValidationError') {
            return res.status(400).json({
                message: error.errors[0].message,
            });
        }
        res.status(500).json({ message: 'sever error' });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;
        if (!username) {
            return res.status(400).json({
                message: 'el campo username no puede ser nulo',
            });
        }
        if (!password) {
            return res.status(400).json({
                message: 'el campo password no puede ser nulo',
            });
        }
        const user = await User.update({ username, password }, {
            where: { id },
            returning: true,
        });
        res.json(user);
    } catch (error) {
        logger.error('error en actualizar usuario' + error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                message: error.errors[0].message,
            });
        }
        if (error.password === 'SequelizeValidationError') {
            return res.status(400).json({
                message: error.errors[0].message,
            });
        }
        res.status(500).json({ message: 'server error' });
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.update({ status: status.INACTIVE }, {
            where: { id },
        });
        if(user == 0){
            return res.status(404).json({
                message: `Usuario con ${id} no encontrado`,
            });
        }
        res.json({
            message: `Usuario con ${id} es eliminado correctamente`,
        });
    } catch (error) {
        logger.error('error en eliminar el usuario' + error);
        res.status(500).json({ message: 'sever error'});
    }
}
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: `Usuario con ${id} no encontrado`,
            });
        }
        res.json(user);
    } catch (error) {
        logger.error('error en bsucar usuario conn id' + error);
        res.status(500).json({message: 'server error'});
    }
}
const activeInactive = async(req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if (!status) {
            return res.status(400).json({
                message: 'el campo status no puede ser nulo',
            });
        }
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: `Usuario con id ${id} no encontrado`,
            });
        }
        if(user.status === status){
            return res.status(400).json({
                message: `El usuario ya esta ${status}`,
            });
        }
        user.status = status;
        await user.save();
        res.json(user);
    } catch (error) {
        logger.error('error en activar o desactivar usuario' + error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                message: error.errors[0].message,
            });
        }
        if (error.password === 'SequelizeValidationError') {
            return res.status(400).json({
                message: error.errors[0].message,
            });
        }
        res.status(500).json({ message: 'server error' });
    }
}

const getTasks = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findOne({
            attributes: ['id', 'username', 'password', 'status'],
            include:[{
                model: Task,
                attributes: ['id', 'name', 'done'],
            }],
            where: { id },
        });
        res.json(user);
    }catch (error) {
        logger.error('error en getTasks' + error);
        res.status(500).json({ message: 'server error' });
    }
}

export { getUser, createUser, updateUser, deleteUser, getUserById, activeInactive, getTasks };