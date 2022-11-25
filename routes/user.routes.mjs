import express from 'express'

import {createUser, deleteUser, readUser, readUserByEmail, readUsers, updateUser} from "../controllers/user_controller.mjs"
import {deleteWorkspacesSolelyOwnedByUser, readUserRoleInWorkspace, readUsersWorkspace} from "../controllers/workspaceUser_controller.mjs";

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
 * Success - 201 Created
 * Failure - 400 Bad Request
 */
router.post('/users', async function (req, res) {
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
        const newUser = await createUser({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        })

        res.status(201).json(newUser)
    }
})


/**
 * Endpoint to get a specific user by id
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
router.get('/users/:user_id', async function (req, res) {
    const user = await readUser(req.params.user_id)

    if (!user) {
        res.status(404).json({'Error': 'No user with this user id exists'})
    } else {
        res.status(200).json(user)
    }
})


/**
 * Endpoint to get a specific user by email
 *
 * Request
 * Parameter passed via request body
 * @param email
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
router.post('/users/by-email', async function (req, res) {
    const user = await readUserByEmail(req.body.email)

    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).send()
    }
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
 */
router.get('/users', async function (req, res) {
    const users = await readUsers()

    res.status(200).json(users)
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
 *     user_role: user's role in the workspace,
 *     date_created: date user created,
 *     date_updated: date user created
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 403 Forbidden
 */
router.get('/users/:user_id/workspaces/:workspace_id/users', async function (req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole) {
        const users = await readUsersWorkspace(req.params.workspace_id)
        res.status(200).json(users)
    } else {
        res.status(403).send()
    }
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
router.patch('/users/:user_id', async function (req, res) {
    const user = await readUser(req.params.user_id)

    if (user) {
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

        await updateUser(req.params.user_id, userObj)

        res.status(200).json(true)
    } else {
        res.status(404).json(false)
    }
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
router.delete('/users/:user_id', async function (req, res) {
    const user = await readUser(req.params.user_id)

    if (user) {
        await deleteWorkspacesSolelyOwnedByUser(req.params.user_id)

        await deleteUser(req.params.user_id)

        res.status(204).send()
    } else {
        res.status(404).json({'Error': 'No user with this user id exists'})
    }
})

/* ------------- End Endpoint Functions ------------- */


export {router}
