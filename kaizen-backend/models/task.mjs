import { Sequelize, DataTypes } from "sequelize";
import {sequelize} from "./db_init.mjs"



export const Task = sequelize.define('Task',{
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   task_name: DataTypes.STRING,
   task_owner: DataTypes.STRING,
   task_type: DataTypes.STRING,
   task_status: DataTypes.STRING,
   task_descriptions: DataTypes.STRING,
   date_created: DataTypes.DATE,
   date_updated: DataTypes.DATE
  },
  {
    // options
    sequelize,
    modelName: 'Task',
    tableName: 'Task',
    createdAt: 'date_created',
    updatedAt: 'date_updated',
    underscore: true,
  },
);


