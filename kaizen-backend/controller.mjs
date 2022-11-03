import {Task} from './models/task.mjs'
import  {User} from './models/user.mjs'
import  {Project} from './models/project.mjs'
import {sequelize}  from "./models/db_init.mjs";


export async function createProject (project_name, project_type, project_owner){
    // Call the constructor to create an instance of the model class Exercise
    const new_project = await Project.create({
        project_name: project_name,
        project_type: project_type,
        project_owner: project_owner
}).catch((err)=>{
    console.log(err)
   })
}


export async function createUser (f_name, l_name, email_name) {
    const new_user = User.create({
        first_name: f_name,
        last_name: l_name,
        email: email_name
       
    }
       ).catch((err)=>{
        console.log(err)
       })
    }    

export async function createTask (task_name, task_type, task_owner, task_descriptions, task_status){
    // Call the constructor to create an instance of the model class Exercise
const new_task = await Task.create({
 task_name: task_name,
 task_type: task_type,
 task_owner: task_owner,
 task_descriptions: task_descriptions,
 task_status: task_status
}).catch((err)=>{
    console.log(err)
   })
}


 export async function deleteTask (task_id_num) {
    const deleted_task = await Task.destroy({where:{task_id: task_id_num}})
    .catch((err)=>{
        console.log(err)
       })
    console.log(deleted_task)
}

export async function deleteProject(project_id) {
    const deleted_project = await Project.destroy({project_id: project_id})
    .catch((err)=>{
        console.log(err)
       })
    console.log(deleted_project)
}

export async function deleteUser (user_id ){
    const deleted_user = await User.destroy({user_id: user_id})
    .catch((err)=>{
        console.log(err)
       })
    console.log(deleted_user)
}








