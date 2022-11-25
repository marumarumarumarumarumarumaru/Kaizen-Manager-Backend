import express from "express";

import {createWorkspace, deleteWorkspace, readWorkspace, readAllWorkspaces, updateWorkspace} from "../controllers/workspace_controller.mjs";
import {addUserToWorkspace, deleteUserFromWorkspace, readUserRoleInWorkspace, readWorkspaceCandidatesForDeletion, readWorkspaceForUser, updateUserInWorkspace} from "../controllers/workspaceUser_controller.mjs";
import {deleteProject, readProjects} from "../controllers/project_controller.mjs";
import {readUser} from "../controllers/user_controller.mjs";

const router = express()


/* ------------- Begin Workspace Endpoint Functions ------------- */

/**
 * Endpoint to create a workspace
 *
 * Request
 * Parameter passed via URL path
 * @param user_id
 *
 * Parameters passed via request body
 * @param workspace_name - required
 *
 * Response
 * @returns workspace - JSON
 * {
 *     workspace_id: workspace id,
 *     workspace_name: workspace name,
 *     date_created: date workspace created,
 *     date_updated: date workspace created
 * }
 *
 * Response Statuses
 * Success - 201 Created
 * Failure - 400 Bad Request
 */
router.post('/users/:user_id/workspaces/', async function (req, res) {
    if (req.body.workspace_name == null) {
        res.status(400).json({
                'Error':
                    'The request object is missing at ' +
                    'least one of the required attributes',
            },
        )
    } else {
        const newWorkspace = await createWorkspace({
            workspace_name: req.body.workspace_name,
            use_id: req.params.user_id
        })

        res.status(201).json(newWorkspace)
    }
})


/**
 * Endpoint to get a specific workspace
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 *
 * Response
 * @returns workspace - JSON
 * {
 *     workspace_id: workspace id,
 *     workspace_name: workspace name,
 *     date_created: date workspace created,
 *     date_updated: date workspace created
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 403 Forbidden
 * Failure - 404 Not Found
 */
router.get('/users/:user_id/workspaces/:workspace_id', async function (req, res) {
    const workspace = await readWorkspace(req.params.workspace_id)

    if (workspace) {
        const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

        if (userRole) {
            res.status(200).json(workspace)
        } else {
            res.status(403).send()
        }
    } else {
        res.status(404).json({'Error': 'No workspace with this workspace id exists'})
    }
})


/**
 * Endpoint to get all workspaces for a specific user
 *
 * Request
 * Parameter passed via URL path
 * @param user_id
 *
 * Response
 * @returns workspaces - Array<JSON>
 * {
 *     workspace_id: workspace id,
 *     workspace_name: workspace name,
 *     user_role: user's role in the workspace,
 *     date_created: date workspace created,
 *     date_updated: date workspace created
 * }
 *
 * Response Statuses
 * Success - 200 OK
 */
router.get('/users/:user_id/workspaces', async function (req, res) {
    const workspaces = await readWorkspaceForUser(req.params.user_id)

    res.status(200).json(workspaces)
})


/**
 * Endpoint to get all workspaces that would be candidates for deletion if the user was to be deleted
 *
 * Request
 * Parameter passed via URL path
 * @param user_id
 *
 * Response
 * @returns workspace candidates for deletion - Array<JSON>
 * {
 *     workspace_id: workspace id,
 *     workspace_name: workspace name,
 *     user_role: user's role in the workspace,
 *     date_created: date workspace created,
 *     date_updated: date workspace created
 * }
 *
 * Response Statuses
 * Success - 200 OK
 */
router.get('/users/:user_id/workspace-candidates-for-deletion', async function (req, res) {
    const workspaces = await readWorkspaceCandidatesForDeletion(req.params.user_id)

    res.status(200).json(workspaces)
})


/**
 * FOR TESTING ONLY - Endpoint to get all workspaces
 *
 * Response
 * @returns workspaces - Array<JSON>
 * {
 *     workspace_id: workspace id,
 *     workspace_name: workspace name,
 *     date_created: date workspace created,
 *     date_updated: date workspace created
 * }
 *
 * Response Statuses
 * Success - 200 OK
 */
router.get('/workspaces', async function (req, res) {
    const workspaces = await readAllWorkspaces()

    res.status(200).json(workspaces)
})


/**
 * Endpoint to add a user to a workspace
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 * @param user_id_to_be_added
 *
 * Parameters passed via request body
 * @param user_role - required
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 400 Bad Request
 * Failure - 403 Forbidden
 * Failure - 404 Not Found
 */
router.put('/users/:user_id/workspaces/:workspace_id/users/:user_id_to_be_added', async function (req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole === 'owner') {
        if (req.body.user_role) {
            const userToBeAdded = await readUser(req.params.user_id_to_be_added)

            if (userToBeAdded) {
                await addUserToWorkspace(req.params.user_id_to_be_added, req.params.workspace_id, {
                    role_name: req.body.user_role
                })

                res.status(200).send()
            } else {
                res.status(404).json({'Error': 'Either the user or workspace ID does not exist'})
            }
        } else {
            res.status(400).json({
                    'Error':
                        'The request object is missing at ' +
                        'least one of the required attributes',
                },
            )
        }
    } else {
        res.status(403).send()
    }
})


/**
 * Endpoint to update a user's role in a workspace
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 * @param user_id_to_be_updated
 *
 * Parameters passed via request body
 * @param user_role - required
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 400 Bad Request
 * Failure - 403 Forbidden
 * Failure - 404 Not Found
 */
router.patch('/users/:user_id/workspaces/:workspace_id/users/:user_id_to_be_updated', async function (req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole === 'owner') {
        if (req.body.user_role) {
            const userToBeUpdated = await readUser(req.params.user_id_to_be_updated)

            if (userToBeUpdated) {
                await updateUserInWorkspace(req.params.user_id_to_be_updated, req.params.workspace_id, {
                    role_name: req.body.user_role
                })

                res.status(200).json(true)
            } else {
                res.status(404).json(false)
            }
        } else {
            res.status(400).json({
                    'Error':
                        'The request object is missing at ' +
                        'least one of the required attributes',
                },
            )
        }
    } else {
        res.status(403).send()
    }
})


/**
 * Endpoint to delete a user from a workspace
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 * @param user_id_to_be_deleted
 *
 * Response Statuses
 * Success - 204 No Content
 * Failure - 403 Forbidden
 * Failure - 404 Not Found
 */
router.delete('/users/:user_id/workspaces/:workspace_id/users/:user_id_to_be_deleted', async function (req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole === 'owner') {
        const userToBeDeleted = await readUser(req.params.user_id_to_be_deleted)

        if (userToBeDeleted) {
            await deleteUserFromWorkspace(req.params.user_id_to_be_deleted, req.params.workspace_id)

            res.status(204).send()
        } else {
            res.status(404).json({'Error': 'Either the user or workspace ID does not exist'})
        }
    } else {
        res.status(403).send()
    }
})


/**
 * Endpoint to edit a workspace name
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 *
 * Parameters passed via request body
 * @param workspace_name - optional
 *
 * Response
 * @returns boolean
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 403 Forbidden
 * Failure - 404 Not Found
 */
router.patch('/users/:user_id/workspaces/:workspace_id', async function (req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole === 'owner') {
        const workspace = await readWorkspace(req.params.workspace_id)

        if (workspace) {
            const workspaceObj = {}

            if (req.body.workspace_name) {
                workspaceObj.workspace_name = req.body.workspace_name
            }

            await updateWorkspace(req.params.workspace_id, workspaceObj)
            res.status(200).json(true)
        } else {
            res.status(404).json(false)
        }
    } else {
        res.status(403).send()
    }
})


/**
 * Endpoint to delete a workspace
 *
 * Parameters passed via URL path
 * @param - user_id
 * @param - workspace_id
 *
 * Response Statuses
 * Success - 204 No Content
 * Failure - 403 Forbidden
 * Failure - 404 Not Found
 */
router.delete('/users/:user_id/workspaces/:workspace_id', async function (req, res) {
    const workspace = await readWorkspace(req.params.workspace_id)

    if (workspace) {
        const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

        if (userRole === 'owner') {
            const workspaceProjects = await readProjects(req.params.workspace_id)

            for (const workspaceProject of workspaceProjects) {
                await deleteProject(workspaceProject.project_id)
            }

            await deleteWorkspace(req.params.workspace_id)

            res.status(204).send()
        } else {
            res.status(403).send()
        }
    } else {
        res.status(404).json({'Error': 'No workspace with this workspace id exists'})
    }
})

/* ------------- End Endpoint Functions ------------- */


export {router}
