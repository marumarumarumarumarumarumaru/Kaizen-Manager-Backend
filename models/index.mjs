import Sequelize  from "sequelize";
import {sequelize}  from "./db_init.mjs";
import {User} from "../models/user.mjs"
import {Project} from "../models/project.mjs"
import {Task} from "../models/task.mjs"
import {Workspace} from "../models/workspace.mjs"
import {workspaceUser} from "../models/workspaceUser.mjs"
  
  //M2M workspace to user
  Workspace.belongsToMany(User, {
    through: "workspaceUser"
  });

  
  User.belongsToMany(Workspace, {
    through: "workspaceUser"
  });

  
  // O:M project to task
  Project.hasMany(Task,{
    foreignKey: 'proj_id'
  });
  
  //O:M workspace to project
  Workspace.hasMany(Project,{
    foreignKey: 'work_id'
  });

export const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = User;
db.project = Project;
db.task = Task;
db.workspace = Workspace;
db.workspaceUser = workspaceUser;


await db.sequelize.sync()
  