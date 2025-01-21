import { Task } from '../models/task.js';
import logger from '../logs/logger.js';

const getTasks = async (req, res) => {
    const {userId} = req.user;
    try {
        const tasks = await Task.findAll({
            attributes:['id','name','done'],
            order:[['name','ASC']],
            where:{
                userId,
            }
        });
        res.json(tasks);
    } catch (error) {
        logger.error('error en getTasks' + error);
        res.status(500).json({ message: 'server error' });
    }
}

const createTask = async (req, res) => {
    const {userId} = req.user;
    const { name } = req.body;
    try {
        const newTask = await Task.create({
            name,
            userId,
        });
        res.json(newTask);
    } catch (error) {
        logger.error('error en crear la tarea' + error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                message: error.errors[0].message,
            });
        }
        res.status(500).json({ message: 'server error' });
    }
}

const getTask = async (req, res) => {
    const { id } = req.params;
    const {userId} = req.user;
    try {
        const task = await Task.findOne({
            attributes: ['id', 'name', 'done'],
            where: { id, userId },
        });
        res.json(task);
    } catch (error) {
        logger.error('error en getTask' + error);
        res.status(500).json({ message: 'server error' });
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const {userId} = req.user;
    try {
        const task = await Task.update({ name}, {
            where: { id, userId },
            returning: true,
        });
        if(task[0] === 0){
            return res.status(404).json({message:'task not found'});
        }
        res.json(task);
    } catch (error) {
        logger.error('error en updateTask' + error);
        res.status(500).json({ message: 'server error' });
    }
}

const taskDone = async (req, res) => {
    const { id } = req.params;
    const {userId} = req.user;
    const {done} = req.body;
    try {
        const task = await Task.update({ done}, {
            where: { id, userId },
            returning: true,
        });
        if(task[0] === 0){
            return res.status(404).json({message:'task not found'});
        }
        res.json(task);
    } catch (error) {
        logger.error('error en taskDone' + error);
        res.status(500).json({ message: 'server error' });
    }
}
 const deleteTask = async (req, res) => {
    const { id } = req.params;
    const {userId} = req.user;
    try {
        const task = await Task.destroy({
            where: { id, userId },
        });
        if(task === 0){
            return res.status(404).json({message:'task not found'});
        }
        res.json({message:'task deleted successfully'});
    } catch (error) {
        logger.error('error en deleteTask' + error);
        res.status(500).json({ message: 'server error' });
    }
}

export { getTasks, createTask, getTask, updateTask, taskDone, deleteTask };