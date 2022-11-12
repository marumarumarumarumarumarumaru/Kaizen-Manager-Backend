import {Task} from './models/task.mjs'
import {User} from './models/user.mjs'
import {Project} from './models/project.mjs'
import { Workspace } from './models/workspace.mjs'
import { workspaceUser } from './models/workspaceUser.mjs'
import { projectUser } from './models/projectUser.mjs'

// Todo - Refactor into separate controller files in controllers directory. e.g. controllers/project.controller.mjs
export async function createProject (project_obj){
    console.log("---------------------------------------------")
    console.log(project_obj)
    console.log("---------------------------------------------")
    await Project.create({
        project_name: project_obj.project_name,
        project_owner: project_obj.use_id,
        work_id: project_obj.work_id
        }).catch((err)=>{
            console.log(err)
        })
   await projectUser.create({
    user_user_id: project_obj.use_id,
    role: "owner",
    project_project_id: 1 // need to get the newly created project id here
    }).catch((err)=>{
        console.log(err)
    })
    }

export async function createWorkspace (workspace_obj ){
    console.log("---------------------------------------------")
    console.log(workspace_obj)
    console.log("---------------------------------------------")
    await Workspace.create({
        workspace_name: workspace_obj.workspace_name}
        ).catch((err)=>{
            console.log(err)
    })
    await workspaceUser.create({
        user_user_id: workspace_obj.use_id,//CPK
        role_name: "owner",
        workspace_workspace_id: 1// need to get the newly created workspace id here CPK
    }).catch((err)=>{
        console.log(err)
})
}

export async function createUser (user_obj) {
    console.log("---------------------------------------------")
    console.log(user_obj)
    console.log("---------------------------------------------")
    return await User.create({
        first_name: user_obj.first_name,
        last_name: user_obj.last_name,
        email: user_obj.email
    }).catch((err) => {
        console.log(err)
    })
}

export async function createTask (task_obj){
    console.log("---------------------------------------------")
    console.log(task_obj)
    console.log("---------------------------------------------")
    return await Task.create({
        proj_id: task_obj.proj_id, //FK
        task_assignee: task_obj.use_id, //FK
        task_name: task_obj.task_name,
        task_owner: task_obj.task_owner,
        task_value: task_obj.task_value,
        task_descriptions: task_obj.task_descriptions,
        task_status: task_obj.task_status,
        date_ended: task_obj.date_ended
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
    User.update(
       user_obj,
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

export async function readWorkspace(){
    
}






