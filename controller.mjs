import {Task} from './models/task.mjs'
import {User} from './models/user.mjs'
import {Project} from './models/project.mjs'

// Todo - Refactor into separate controller files in controllers directory. e.g. controllers/project.controller.mjs
export async function createProject (project_name, project_type, project_owner){
    return await Project.create({
        project_name: project_name,
        project_type: project_type,
        project_owner: project_owner
}).catch((err)=>{
    console.log(err)
   })
}


export async function createUser (f_name, l_name, email_name) {
    return await User.create({
        first_name: f_name,
        last_name: l_name,
        email: email_name
    }).catch((err) => {
        console.log(err)
    })
}

export async function createTask (task_name, task_type, task_owner, task_descriptions, task_status){
    return await Task.create({
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
    await Task.destroy({where:{task_id: task_id_num}})
    .catch((err)=>{
        console.log(err)
        return false
       })
    return true
}

export async function deleteProject(project_id_num) {
    await Project.destroy({where:{project_id: project_id_num}})
    .catch((err)=>{
        console.log(err)
        return false
       })
    return true
}


export async function deleteUser (user_id_num){
    await User.destroy({where:{user_id: user_id_num}})
    .catch((err)=>{
        console.log(err)
        return false
       })
    return true
}
/*
user_id: user_id of record we want to update
user_obj: User object with all fields filled in, only
updated fields will be changed
returns: True on success, False on failure
*/
export async function updateUser(user_id, user_obj){

    //maybe parse object for nulls here and pass in resultant object

    User.update(
        {first_name: user_obj.first_name,
        last_name: user_obj.last_name,
        email: user_obj.email},
        { where: { user_id: user_id } })
        .catch((err)=>{
            console.log(err)
            return false
       })
       return true
}

export async function updateTask(){
    
}
export async function updateProject(){
    
}

export async function readProject(){
  
}

export async function readUser(){
  
}

export async function readTask(){
  
}





