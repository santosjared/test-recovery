
import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import { status } from '../constants/index.js';
import { Task } from './task.js';
import { encriptar } from '../common/bycript.js';
import logger from '../logs/logger.js';

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'El campo username no puede ser nulo',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El campo password no puede ser nulo',
            },
        },
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: status.ACTIVE,
        validate: {
            isIn: {
                args: [[status.ACTIVE, status.INACTIVE]],
                msg: 'El campo status solo puede ser "active" o "inactive"',
            },
        },
    },
});
User.hasMany(Task)
Task.belongsTo(User)

User.beforeCreate(async (user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) { 
        logger.error(error.message);    
        throw new Error('Error al encriptar la contraseña');
    }
});

User.beforeUpdate(async (user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña');
    }
});