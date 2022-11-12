import {sequelize} from "./db_init.mjs"
import { DataTypes } from "sequelize"

export const workspaceUser = sequelize.define('workspaceUser',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  workspace_workspace_id: {
    type: DataTypes.INTEGER,
    foriegnKey: true
  }, user_user_id: {
    type: DataTypes.INTEGER,
    foriegnKey: true
  },
  role_name: DataTypes.STRING,
  },
  {
    // options
    sequelize,
    modelName: 'workspaceUser',
    tableName: 'workspaceUser',
    createdAt: 'date_created',
    updatedAt: 'date_updated',
    underscored: true,
  },
  )
