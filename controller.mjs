import {Task} from './models/task.mjs'
import {User} from './models/user.mjs'
import {Project} from './models/project.mjs'
import { Workspace } from './models/workspace.mjs'
import { workspaceUser } from './models/workspaceUser.mjs'
import { projectUser } from './models/projectUser.mjs'
import { sequelize } from './models/db_init.mjs'
import { Sequelize} from 'sequelize'
const Op = Sequelize.Op;


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

export async function createWorkspace (workspace_obj){
    console.log("---------------------------------------------")
    console.log(workspace_obj)
    console.log("---------------------------------------------")
    await Workspace.create({
        workspace_name: workspace_obj.workspace_name}
        )
                //get the next project_id
    let workspace = await Workspace.findAll({
        attributes: [[sequelize.fn('MAX', sequelize.col('workspace_id')), 'max_id']],
        raw: true
    })
    await workspaceUser.create({
        user_user_id: workspace_obj.use_id,
        role_name: "owner",
        workspace_workspace_id: workspace[0].max_id// need to get the newly created workspace id here CPK
    }).catch((err)=>{
        console.log(err)
}).catch((err)=>{
    console.log(err)
})
}

export async function createUser (user_obj) {
    console.log("---------------------------------------------")
    console.log(user_obj)
    console.log("---------------------------------------------")
    await User.create({
        first_name: user_obj.first_name,
        last_name: user_obj.last_name,
        email: user_obj.email
    }).catch((err) => {
        console.log(err)
        return false
    })
    return true
}

export async function createTask (task_obj){
    console.log("---------------------------------------------")
    console.log(task_obj)
    console.log("---------------------------------------------")
    await Task.create({
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
        return false
    })
    return true
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
    const projects = await Project.findAll({where:{
        work_id:  workspace_id
    }})
    return JSON.stringify(projects)
}
 async function get_user_ids(user_objs){
    let users_in_workspace = []
    for(const user of user_objs){
        users_in_workspace.push(user.user_user_id)
    }
    return users_in_workspace
}
export async function readUsersWorkspace(workspace_id){
    // get all users that belong to the workspace
    const user_objs = await workspaceUser.findAll({where:{
                            workspace_workspace_id: workspace_id
                        }})
    //build list of user_ids in the workspace
    const users_in_workspace = await get_user_ids(user_objs)
    //find all user records where user_id is in the workspace
    const users = await User.findAll({where:{
                            user_id:{
                            [Op.in]: users_in_workspace
                            } 
                        }}).catch(err =>{
                            console.log(err)
                        }).catch(err =>{
                            console.log(err)
                        }).catch(err =>{
                            console.log(err)
                        })
    return users
}

export async function readUsersProject(project_id){
 
}

async function get_workspace_ids(workspace_objs){
    let workspaces_for_user = []
    for(const workspace of workspace_objs){
        workspaces_for_user.push(workspace.workspace_workspace_id)
    }
    return workspaces_for_user
}

export async function readWorkspaceForUser(user_id){
        // get all users that belong to the workspace
        const workspace_objs = await workspaceUser.findAll({where:{
            user_user_id: user_id
        }})

    //build list of user_ids in the workspace
    const workspace_for_user = await get_workspace_ids(workspace_objs)

    //find all workspace records where workspace_id is matched to the user
    const users = await Workspace.findAll({where:{
            workspace_id:{
            [Op.in]: workspace_for_user
            } 
        }}).catch(err =>{
            console.log(err)
        }).catch(err =>{
            console.log(err)
        }).catch(err =>{
            console.log(err)
        })
    return users

}
export async function readTasks(project_id){
    const tasks = await Task.findAll({where:{
        proj_id:  project_id
    }})
    console.log(JSON.stringify(tasks))
    return JSON.stringify(tasks)
}

export async function readWorkspace(){
    
}


