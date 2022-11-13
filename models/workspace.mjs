import { Sequelize, DataTypes } from "sequelize"
import {sequelize} from "./db_init.mjs"

export const Workspace =  sequelize.define('Workspace', {
    workspace_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
   workspace_name: DataTypes.STRING,
   date_created: DataTypes.DATE,
   date_updated: DataTypes.DATE
  },
  {
    // options
    sequelize,
    modelName: 'Workspace',
    tableName: 'Workspace',
    createdAt: 'date_created',
    updatedAt: 'date_updated',
    underscored: true,
  },
)