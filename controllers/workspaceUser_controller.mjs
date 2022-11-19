import {User} from '../models/user.mjs'
import {Workspace} from '../models/workspace.mjs'
import {workspaceUser} from '../models/workspaceUser.mjs'
import {sequelize} from '../models/db_init.mjs'
import {Sequelize} from 'sequelize'

const Op = Sequelize.Op;

async function get_workspace_ids(workspace_objs) {
    let workspaces_for_user = []
    for (const workspace of workspace_objs) {
        workspaces_for_user.push(workspace.workspace_workspace_id)
    }
    return workspaces_for_user
}

export async function readWorkspaceForUser(user_id) {
    // get all workspaces that belong to the user
    const workspace_objs = await workspaceUser.findAll({
        where: {
            user_user_id: user_id
        }
    })

    //build list of user_ids in the workspace
    const workspace_for_user = await get_workspace_ids(workspace_objs)

    //find all workspace records where workspace_id is matched to the user
    const workspaces = await Workspace.findAll({
        where: {
            workspace_id: {
                [Op.in]: workspace_for_user
            }
        }
    }).catch(err => {
        console.log(err)
    }).catch(err => {
        console.log(err)
    }).catch(err => {
        console.log(err)
    })
    let array_of_workspaces = []
    for (const work of workspaces) {
        array_of_workspaces.push(work.dataValues)
    }
    return array_of_workspaces

}


export async function addUserToWorkspace(user_id, workspace_id, userWork_obj) {
    await workspaceUser.create({
        user_user_id: user_id,
        workspace_workspace_id: workspace_id,
        role_name: userWork_obj.role_name
    }).catch(err => {
        console.log(err)
        return false
    })
    return true
}

export async function deleteUserFromWorkspace(user_id, workspace_id) {
    await workspaceUser.destroy({
        where: {
            [Op.and]: [
                {user_user_id: user_id},
                {workspace_workspace_id: workspace_id}
            ]
        }
    })
        .catch((err) => {
            console.log(err)
            return false
        })
    return true
}

async function get_user_ids(user_objs) {
    let users_in_workspace = []
    for (const user of user_objs) {
        users_in_workspace.push(user.user_user_id)
    }
    return users_in_workspace
}

export async function readUsersWorkspace(workspace_id) {
    // get all users that belong to the workspace
    const user_objs = await workspaceUser.findAll({
        where: {
            workspace_workspace_id: workspace_id
        }
    })
    //build list of user_ids in the workspace
    const users_in_workspace = await get_user_ids(user_objs)
    //find all user records where user_id is in the workspace
    const users = await User.findAll({
        where: {
            user_id: {
                [Op.in]: users_in_workspace
            }
        }
    }).catch(err => {
        console.log(err)
    }).catch(err => {
        console.log(err)
    }).catch(err => {
        console.log(err)
    })
    let array_of_users = []
    for (const user of users) {
        array_of_users.push(user.dataValues)
    }
    return array_of_users
}


export async function updateUserInWorkspace(user_id, workspace_id, workspaceUser_obj) {
    await workspaceUser.update(
        workspaceUser_obj,
        {
            where: {
                [Op.and]: [
                    {user_user_id: user_id},
                    {workspace_workspace_id: workspace_id}
                ]
            }
        })
        .catch((err) => {
            console.log(err)
            return false
        })
    return true
}
