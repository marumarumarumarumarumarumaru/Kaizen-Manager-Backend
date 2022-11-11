
import Sequelize  from "sequelize";
import {sequelize}  from "./db_init.mjs";
import {User} from "../models/user.mjs"
import {Project} from "../models/project.mjs"
import {Task} from "../models/task.mjs"
import {Workspace} from "../models/workspace.mjs"
import {projectUser} from "../models/projectUser.mjs"
import {workspaceUser} from "../models/workspaceUser.mjs"


// M:M project and user
Project.belongsToMany(User, {
    through: "projectUser",
    foreignKey: "user_id"
  });
  
  User.belongsToMany(Project, {
    through: "projectUser",
    foreignKey: "project_id"
  });


  //M2M workspace to user

  Workspace.belongsToMany(User, {
    through: "workspaceUser",
    foreignKey: "user_id"
  });
  
  User.belongsToMany(Workspace, {
    through: "workspaceUser",
    foreignKey: "workspace_id"
  });
  
  // O:M project to task
  Task.belongsTo(Project, {
    allowNull: false
  });
  Project.hasMany(Task);
  
  //O:M workspace to project
  Project.belongsTo(Workspace)
  Workspace.hasMany(Project)

export const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = User;
db.project = Project;
db.task = Task;
db.projectUser = projectUser
db.workspace = Workspace
db.workspaceUser = workspaceUser



await db.sequelize.sync({ force: true });
  
