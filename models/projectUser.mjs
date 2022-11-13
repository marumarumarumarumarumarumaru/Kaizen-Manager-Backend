import {sequelize} from "./db_init.mjs"
import { DataTypes } from "sequelize"

export const projectUser = sequelize.define('projectUser',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  }, project_project_id: {
    type: DataTypes.INTEGER,
    foriegnKey: true
  }, user_user_id: {
    type: DataTypes.INTEGER,
    foriegnKey: true
  },
  },
  { 
    // options
    sequelize,
    modelName: 'projectUser',
    tableName: 'projectUser',
    createdAt: 'date_created',
    updatedAt: 'date_updated',
    underscored: true,
  },
  )