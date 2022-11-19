import express from 'express'

import {createProject, deleteProject, readProject, readProjects, updateProject} from "../controllers/project_controller.mjs"

const router = express()


/* ------------- Begin Project Endpoint Functions ------------- */

/**
 * Endpoint to create a project
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 *
 * Parameters passed via request body
 * @param project_name - required
 *
 * Response Statuses
 * Success - 201 Created
 * Failure - 400 Bad Request - Missing a required attribute
 */
router.post('/users/:user_id/workspaces/:workspace_id/projects', function (req, res) {
    // TODO - VERIFY USER HAS PERMISSION TO CREATE PROJECTS IN THIS WORKSPACE??
    if (req.body.project_name == null) {
        res.status(400).json({
                'Error':
                    'The request object is missing at ' +
                    'least one of the required attributes',
            },
        )
    } else {
        createProject({
            project_name: req.body.project_name,
            work_id: req.params.workspace_id
        })
            .then(() => {
                res.status(201).send()
            })
    }
})


/**
 * Endpoint to get a specific project
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 * @param project_id
 *
 * Response
 * @returns project - JSON
 * {
 *     project_id: project id,
 *     project_name: project name,
 *     work_id: workspace id (foreign key),
 *     date_created: date project created,
 *     date_updated: date project created
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 404 Not Found
 */
router.get('/users/:user_id/workspaces/:workspace_id/projects/:project_id', function (req, res) {
    // TODO - SEE ABOVE
    readProject(req.params.workspace_id, req.params.project_id)
        .then(project => {
            if (!project) {
                res.status(404).json({'Error': 'No project with this project id exists'})
            } else {
                res.status(200).json(project)
            }
        })
})


/**
 * Endpoint to get all projects for a workspace
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 *
 * Response
 * @returns projects - Array<JSON>
 * {
 *     project_id: project id,
 *     project_name: project name,
 *     work_id: workspace id (foreign key),
 *     date_created: date project created,
 *     date_updated: date project created
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 404 Not Found
 */
router.get('/users/:user_id/workspaces/:workspace_id/projects', function (req, res) {
    // TODO - SEE ABOVE
    readProjects(req.params.workspace_id)
        .then(projects => {
            res.status(200).json(projects)
        })
})


/**
 * Endpoint to edit a project
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 * @param project_id
 *
 * Parameters passed via request body
 * @param project_name - optional
 *
 * Response
 * @returns boolean
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 404 Not Found
 */
router.patch('/users/:user_id/workspaces/:workspace_id/projects/:project_id', function(req, res) {
    // TODO - SEE ABOVE
    const projectObj = {}

    if (req.body.project_name) {
        projectObj.project_name = req.body.project_name
    }

    updateProject(req.params.project_id, projectObj)
        .then(success => {
            if (success) {
                res.status(200).json(success)
            } else {
                res.status(404).json({'Error': 'No project with this project id exists'})
            }
        })
})


/**
 * Endpoint to delete a project
 *
 * Parameter passed via URL path
 * @param - user_id
 * @param - workspace_id
 * @param - project_id
 *
 * Response Statuses
 * Success - 204 No Content
 * Failure - 404 Not Found
 */
router.delete('/users/:user_id/workspaces/:workspace_id/projects/:project_id', function (req, res) {
    // TODO - SEE ABOVE
    deleteProject(req.params.project_id)
        .then(success => {
            if (success) {
                res.status(204).send()
            } else {
                res.status(404).json({'Error': 'No project with this project id exists'})
            }
        })
})

/* ------------- End Endpoint Functions ------------- */


export {router}
