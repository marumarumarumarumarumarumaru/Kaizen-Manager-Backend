import { Sequelize, DataTypes } from "sequelize";
import {sequelize} from "./db_init.mjs"
import {Project} from "./project.mjs"


export const Task = sequelize.define('Task',{
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },proj_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
   task_name: DataTypes.STRING,
   task_assignee: DataTypes.INTEGER,
   task_status: DataTypes.STRING,
   task_value: DataTypes.INTEGER,
   task_descriptions: DataTypes.STRING,
   task_due_date: DataTypes.DATE,
   date_ended: DataTypes.DATE,
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
    underscored: true,
  },
);