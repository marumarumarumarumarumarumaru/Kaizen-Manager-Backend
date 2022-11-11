
import Sequelize  from "sequelize";
import {sequelize}  from "./db_init.mjs";
import {User} from "../models/user.mjs"
import {Project} from "../models/project.mjs"
import {Task} from "../models/task.mjs"
import {Workspace} from "../models/workspace.mjs"
import {projectUser} from "../models/projectUser.mjs"
import {createAssociations} from "./associations.mjs"



export const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.project = Project;
db.task = Task;
db.projectUser = projectUser
db.workspace = Workspace

// createAssociations(db)

// M:M project and user
db.project.belongsToMany(db.user, {
    through: "projectUser",
    foreignKey: "user_id"
  });
  
  db.user.belongsToMany(db.project, {
    through: "projectUser",
    foreignKey: "project_id"
  });
  // O:M project to task
  db.task.belongsTo(db.project);
  db.project.hasMany(db.task, {
    as: "tasks"
  });
  
  //O:M workspace to project
  db.project.belongsTo(db.workspace)
  db.workspace.hasMany(db.project)

  db.sequelize.sync().then(()=> {
    console.log("syncing db")
  });
  
