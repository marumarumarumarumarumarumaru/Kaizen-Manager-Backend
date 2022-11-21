import express from "express";

import {createWorkspace, deleteWorkspace, readWorkspace, updateWorkspace} from "../controllers/workspace_controller.mjs";
import {addUserToWorkspace, deleteUserFromWorkspace, readWorkspaceForUser, updateUserInWorkspace} from "../controllers/workspaceUser_controller.mjs";

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
 * Response Statuses
 * Success - 201 Created
 * Failure - 400 Bad Request - Missing a required attribute
 */
router.post('/users/:user_id/workspaces/', function (req, res) {
    if (req.body.workspace_name == null) {
        res.status(400).json({
                'Error':
                    'The request object is missing at ' +
                    'least one of the required attributes',
            },
        )
    } else {
        createWorkspace({
            workspace_name: req.body.workspace_name,
            use_id: req.params.user_id
        })
            .then(() => {
                res.status(201).send()
            })
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
 * Failure - 404 Not Found
 */
router.get('/users/:user_id/workspaces/:workspace_id', function (req, res) {
    // TODO - PASS JWT AS user_id FOR AUTHORIZATION???
    readWorkspace(req.params.workspace_id)
        .then(workspace => {
            if (!workspace) {
                res.status(404).json({'Error': 'No workspace with this workspace id exists'})
            } else {
                res.status(200).json(workspace)
            }
        })
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
 *     date_created: date workspace created,
 *     date_updated: date workspace created
 * }
 *
 * Response Statuses
 * Success - 200 OK
 */
router.get('/users/:user_id/workspaces', function (req, res) {
    // TODO - PASS JWT AS user_id FOR AUTHORIZATION???
    readWorkspaceForUser(req.params.user_id)
        .then(workspaces => {
            res.status(200).json(workspaces)
        })
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
 * Failure - 400 Bad Request - Missing a required attribute
 * Failure - 404 Not Found
 */
router.put('/users/:user_id/workspaces/:workspace_id/users/:user_id_to_be_added', function (req, res) {
    // TODO - AUTH
    if (req.body.user_role) {
        addUserToWorkspace(req.params.user_id_to_be_added, req.params.workspace_id, {
            role_name: req.body.user_role
        })
            .then(success => {
                if (success) {
                    res.status(200).end()
                } else {
                    res.status(404).json({'Error': 'Either the user or workspace ID does not exist'})
                }
            })
    } else {
        res.status(400).json({
                'Error':
                    'The request object is missing at ' +
                    'least one of the required attributes',
            },
        )
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
 * Failure - 400 Bad Request - Missing a required attribute
 * Failure - 404 Not Found
 */
router.patch('/users/:user_id/workspaces/:workspace_id/users/:user_id_to_be_updated', function (req, res) {
    // TODO - AUTH
    if (req.body.user_role) {
        updateUserInWorkspace(req.params.user_id_to_be_updated, req.params.workspace_id, {
            role_name: req.body.user_role
        })
            .then(success => {
                if (success) {
                    res.status(200).end()
                } else {
                    res.status(404).json({'Error': 'Either the user or workspace ID does not exist'})
                }
            })
    } else {
        res.status(400).json({
                'Error':
                    'The request object is missing at ' +
                    'least one of the required attributes',
            },
        )
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
 * Failure - 404 Not Found
 */
router.delete('/users/:user_id/workspaces/:workspace_id/users/:user_id_to_be_deleted', function (req, res) {
    // TODO - AUTH
    deleteUserFromWorkspace(req.params.user_id_to_be_deleted, req.params.workspace_id)
        .then(success => {
            if (success) {
                res.status(204).end()
            } else {
                res.status(404).json({'Error': 'Either the user or workspace ID does not exist'})
            }
        })
})


/**
 * Endpoint to edit a workspace
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
 * Failure - 404 Not Found
 */
router.patch('/users/:user_id/workspaces/:workspace_id', function (req, res) {
    const workspaceObj = {}

    if (req.body.workspace_name) {
        workspaceObj.workspace_name = req.body.workspace_name
    }

    updateWorkspace(req.params.workspace_id, workspaceObj)
        .then(success => {
            if (success) {
                res.status(200).json(success)
            } else {
                res.status(404).json({'Error': 'No workspace with this workspace id exists'})
            }
        })
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
 * Failure - 404 Not Found
 */
router.delete('/users/:user_id/workspaces/:workspace_id', function (req, res) {
    // TODO USE AUTH TO DETERMINE IF USER IS OWNER OF WORKSPACE, PLUS LOGIC TO PASS ALONG OWNERSHIP - MAY REQUIRE PATH CHANGE OR REQUEST BODY
    deleteWorkspace(req.params.workspace_id)
        .then(success => {
            if (success) {
                res.status(204).end()
            } else {
                res.status(404).json({'Error': 'No workspace with this workspace id exists'})
            }
        })
})

/* ------------- End Endpoint Functions ------------- */


export {router}
