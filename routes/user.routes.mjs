import express from 'express'

import {createUser, deleteUser, readUser, readUsers, updateUser} from "../controllers/user_controller.mjs"
import {readUsersWorkspace} from "../controllers/workspaceUser_controller.mjs";

const router = express()


/* ------------- Begin User Endpoint Functions ------------- */

/**
 * Endpoint to create a user
 *
 * Request
 * Parameters passed via request body
 * @param first_name - required
 * @param last_name - required
 * @param email - required
 *
 * Response Statuses
 * Success - 201 Created
 * Failure - 400 Bad Request - Missing a required attribute
 */
router.post('/users', function (req, res) {
    if (req.body.first_name == null ||
        req.body.last_name == null ||
        req.body.email == null) {
        res.status(400).json({
                'Error':
                    'The request object is missing at ' +
                    'least one of the required attributes',
            },
        )
    } else {
        createUser({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        })
            .then(() => {
                res.status(201).send()
            })
    }
})


/**
 * Endpoint to get a specific user
 *
 * Request
 * Parameter passed via URL path
 * @param user_id
 *
 * Response
 * @returns user - JSON
 * {
 *     user_id: user id,
 *     first_name: user first name,
 *     last_name: user last name,
 *     email: user email,
 *     date_created: date user created,
 *     date_updated: date user created
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 404 Not Found
 */
router.get('/users/:user_id', function (req, res) {
    readUser(req.params.user_id)
        .then(user => {
            if (!user) {
                res.status(404).json({'Error': 'No user with this user id exists'})
            } else {
                res.status(200).json(user)
            }
        })
})


/**
 * Endpoint to get all users
 *
 * Request
 * No parameters required
 *
 * Response
 * @returns users - Array<JSON>
 * {
 *     user_id: user id,
 *     first_name: user first name,
 *     last_name: user last name,
 *     email: user email,
 *     date_created: date user created,
 *     date_updated: date user created
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 403 Forbidden - The user doesn't have permission to view users of other workspaces
 */
router.get('/users', function (req, res) {
    readUsers()
        .then(users => {
            res.status(200).json(users)
        })
})


/**
 * Endpoint to get all users that belong to a workspace
 *
 * Parameters passed via URL path
 * @param - user_id
 * @param - workspace_id
 *
 * Response
 * @returns users - Array<JSON>
 * {
 *     user_id: user id,
 *     first_name: user first name,
 *     last_name: user last name,
 *     email: user email,
 *     date_created: date user created,
 *     date_updated: date user created
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 403 Forbidden - The user doesn't have permission to view users of other workspaces
 */
router.get('/users/:user_id/workspaces/:workspace_id/users', function (req, res) {
    // TODO - ADD AUTH
    readUsersWorkspace(req.params.workspace_id)
        .then(users => {
            res.status(200).json(users)
    })
})


/**
 * Endpoint to edit a user
 *
 * Request
 * Parameter passed via URL path
 * @param user_id
 *
 * Parameters passed via request body
 * @param first_name - optional
 * @param last_name - optional
 * @param email - optional
 *
 * Response
 * @returns boolean
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 404 Not Found
 */
router.patch('/users/:user_id', function (req, res) {
    const userObj = {}

    // Parse the request body to get only the attributes that are being updated
    if (req.body.first_name) {
        userObj.first_name = req.body.first_name
    }
    if (req.body.last_name) {
        userObj.last_name = req.body.last_name
    }
    if (req.body.email) {
        userObj.email = req.body.email
    }

    updateUser(req.params.user_id, userObj)
        .then(success => {
            if (success) {
                res.status(200).json(success)
            } else {
                res.status(404).json({'Error': 'No user with this user id exists'})
            }
        })
})


/**
 * Endpoint to delete a user
 *
 * Parameter passed via URL path
 * @param - user_id
 *
 * Response Statuses
 * Success - 204 No Content
 * Failure - 404 Not Found
 */
router.delete('/users/:user_id', function (req, res) {
    deleteUser(req.params.user_id)
        .then(success => {
            if (success) {
                res.status(204).end()
            } else {
                res.status(404).json({'Error': 'No user with this user id exists'})
            }
        })
})

/* ------------- End Endpoint Functions ------------- */


export {router}
