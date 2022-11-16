import { Sequelize, DataTypes } from "sequelize"
import {sequelize} from "./db_init.mjs"

export const Project =  sequelize.define('Project', {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },work_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
  
   project_name: DataTypes.STRING,
   date_created: DataTypes.DATE,
   date_updated: DataTypes.DATE
  },
  {
    // options
    sequelize,
    modelName: 'Project',
    tableName: 'Project',
    createdAt: 'date_created',
    updatedAt: 'date_updated',
    underscored: true,
  },
)