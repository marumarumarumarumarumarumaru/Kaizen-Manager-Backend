
// Initializes each table

export function createAssociations(db){

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

db.sequelize.sync().then(()=> {
  console.log("syncing db")
});
}






