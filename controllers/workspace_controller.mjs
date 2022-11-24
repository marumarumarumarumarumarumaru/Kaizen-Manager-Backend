import {Workspace} from '../models/workspace.mjs'
import {workspaceUser} from '../models/workspaceUser.mjs'
import {sequelize} from '../models/db_init.mjs'
import {Sequelize} from 'sequelize'

const Op = Sequelize.Op;

export async function deleteWorkspace(workspace_id_num) {
    await Workspace.destroy({where: {workspace_id: workspace_id_num}})
        .catch((err) => {
            console.log(err)
            return false
        })
    return true
}

export async function createWorkspace(workspace_obj) {
    await Workspace.create({
            workspace_name: workspace_obj.workspace_name
        }
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
    }).catch((err) => {
        console.log(err)
        return false
    }).catch((err) => {
        console.log(err)
        return false
    })
    return true
}


export async function updateWorkspace(workspace_id, workspace_obj) {
    await Workspace.update(
        workspace_obj,
        {where: {workspace_id: workspace_id}})
        .catch((err) => {
            console.log(err)
            return false
        })
    return true
}

export async function readWorkspace(workspace_id) {
    const result = await Workspace.findAll({
        where: {
            workspace_id: workspace_id
        }
    })
    return result[0]
}

// For Testing Only
export async function readAllWorkspaces() {
    return await Workspace.findAll()
}