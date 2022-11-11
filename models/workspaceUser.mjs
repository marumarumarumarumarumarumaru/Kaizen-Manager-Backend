import {sequelize} from "./db_init.mjs"
import { DataTypes } from "sequelize"

export const workspaceUser = sequelize.define('workspaceUser',{
  role_name: DataTypes.STRING,
  },
  {
    // options
    sequelize,
    modelName: 'workspaceUser',
    tableName: 'workspaceUser',
    createdAt: 'date_created',
    updatedAt: 'date_updated',
    underscore: true,
  },
  )
