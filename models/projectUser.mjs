import {sequelize} from "./db_init.mjs"
import { DataTypes } from "sequelize"

export const projectUser = sequelize.define('projectUser',{

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
