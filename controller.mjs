import {Task} from './models/task.mjs'
import {User} from './models/user.mjs'
import {Project} from './models/project.mjs'
import { Workspace } from './models/workspace.mjs'
import { workspaceUser } from './models/workspaceUser.mjs'
import { projectUser } from './models/projectUser.mjs'
import { sequelize } from './models/db_init.mjs'
import {JSON, Sequelize} from 'sequelize'
const Op = Sequelize.Op;

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

// Todo - Refactor into separate controller files in controllers directory. e.g. controllers/project.controller.mjs
export async function createProject (project_obj){
    console.log("---------------------------------------------")
    console.log(project_obj)
    console.log("---------------------------------------------")
    await Project.create({
        project_name: project_obj.project_name,
        project_owner: project_obj.use_id,
        work_id: project_obj.work_id})
        //get the next project_id
    let project = await Project.findAll({
            attributes: [[sequelize.fn('MAX', sequelize.col('project_id')), 'max_id']],
            raw: true
        })
        console.log('--------------------------------------')
        console.log(JSON.stringify(project))
        console.log(project[0].max_id)
        console.log('--------------------------------------')
        sleep(1000)
        await projectUser.create({
        user_user_id: project_obj.use_id,
        role: "owner",
        project_project_id: project[0].max_id // need to get the newly created project id here
            }).catch((err)=>{
                console.log(err)
            })
        .catch((err)=>{
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

export async function readProjects(workspace_id){
    await Project.findAll({where:{
        work_id:  workspace_id
    }})

  
}
async function get_user_ids(user_objs){
    let users_in_workspace = []
    for(const user of user_objs){
        console.log(user)
    users_in_workspace.push(user.user_id)}
}
export async function readUsersWorkspace(workspace_id){
const user_objs = await workspaceUser.findAll({where:{
                        workspace_workspace_id: workspace_id
                    }})

//build list of user_ids in the workspace
const users_in_workspace = await get_user_ids(user_objs)
const users = await User.findAll({where:{
                        user_id:{
                        [Op.in]: users_in_workspace
                        } 
                    }})
}

export async function readUsersProject(project_id){
 
}

export async function readTasks(project_id){
    Task.findAll({where:{
        proj_id:  project_id
    }})
}

export async function readWorkspace(){
    
}






