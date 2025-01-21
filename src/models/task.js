import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';


export const Task = sequelize.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El campo name no puede ser nulo',
            },
        },
    },
    done:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate:{
            isIn: {
                args: [[true, false]],
                msg: 'El campo done solo puede ser true o false',
            },
        },
    },
});