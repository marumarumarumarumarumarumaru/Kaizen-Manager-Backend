import {sequelize} from "./db_init.mjs"
import { DataTypes } from "sequelize"

export const projectUser = sequelize.define('projectUser',{
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }
  },
  {
    // options
    sequelize,
    modelName: 'projectUser',
    tableName: 'projectUser',
    createdAt: 'date_created',
    updatedAt: 'date_updated',
    underscore: true,
  },
  )
