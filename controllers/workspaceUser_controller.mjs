import {User} from '../models/user.mjs'
import {Workspace} from '../models/workspace.mjs'
import {workspaceUser} from '../models/workspaceUser.mjs'
import {sequelize} from '../models/db_init.mjs'
import {Sequelize} from 'sequelize'
import {readUser} from "./user_controller.mjs";
import {deleteWorkspace, readWorkspace} from "./workspace_controller.mjs";

const Op = Sequelize.Op;

async function get_user_workspace(workspace_obj) {
    const user_workspace = await readWorkspace(workspace_obj.workspace_workspace_id)
    user_workspace.dataValues.user_role = workspace_obj.role_name

    return user_workspace
}

export async function readWorkspaceForUser(user_id) {
    // get all workspaces that belong to the user
    const workspace_objs = await workspaceUser.findAll({
        where: {
            user_user_id: user_id
        }
    })

    const array_of_workspaces = []

    for (const workspace_obj of workspace_objs) {
        array_of_workspaces.push(await get_user_workspace(workspace_obj))
    }

    return array_of_workspaces
}

export async function readWorkspacesOwnedByUser(user_id) {
    // get all workspaces that are owned by the user
    const workspace_objs = await workspaceUser.findAll({
        where: {
            user_user_id: user_id,
            role_name: 'owner'
        }
    })

    const array_of_workspaces = []

    for (const workspace_obj of workspace_objs) {
        array_of_workspaces.push(await get_user_workspace(workspace_obj))
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

async function get_workspace_user(user_obj) {
    const workspace_user = await readUser(user_obj.user_user_id)
    workspace_user.dataValues.user_role = user_obj.role_name

    return workspace_user
}

export async function readUsersWorkspace(workspace_id) {
    // get all users that belong to the workspace
    const user_objs = await workspaceUser.findAll({
        where: {
            workspace_workspace_id: workspace_id
        }
    })

    const array_of_users = []

    for (const user_obj of user_objs) {
        array_of_users.push(await get_workspace_user(user_obj))
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

export async function readUserRoleInWorkspace(user_id, workspace_id) {
    const result = await workspaceUser.findAll({
        where: {
            user_user_id: user_id,
            workspace_workspace_id: workspace_id
        }
    })

    if (result[0]) {
        return result[0].dataValues.role_name
    } else {
        return null
    }
}

export async function areMultipleOwnersOfWorkspace(workspace_id) {
    const result = await workspaceUser.findAll({
        where: {
            workspace_workspace_id: workspace_id,
            role_name: 'owner'
        }
    })
    return result.length > 1
}

export async function readWorkspaceCandidatesForDeletion(user_id) {
    const workspaceCandidatesForDeletion = []

    const userWorkspaces = await readWorkspacesOwnedByUser(user_id)

    for (const userWorkspace of userWorkspaces) {
        if (!(await areMultipleOwnersOfWorkspace(userWorkspace.workspace_id))) {
            workspaceCandidatesForDeletion.push(userWorkspace)
        }
    }

    return workspaceCandidatesForDeletion
}

export async function deleteWorkspacesSolelyOwnedByUser(user_id) {
    const workspaceCandidatesForDeletion = await readWorkspaceCandidatesForDeletion(user_id)

    for (const workspaceCandidate of workspaceCandidatesForDeletion) {
        await deleteWorkspace(workspaceCandidate.workspace_id)
    }
}
