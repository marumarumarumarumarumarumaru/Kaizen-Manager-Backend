import express from 'express'

import {createProject, deleteProject, readProject, readProjects, readAllProjects, updateProject} from "../controllers/project_controller.mjs"
import {readUserRoleInWorkspace} from "../controllers/workspaceUser_controller.mjs";
import {deleteTask, readTasks} from "../controllers/task_controller.mjs";

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
 * Failure - 400 Bad Request
 * Failure - 403 Forbidden
 */
router.post('/users/:user_id/workspaces/:workspace_id/projects', async function (req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole === 'owner' || userRole === 'pm') {
        if (req.body.project_name == null) {
            res.status(400).json({
                    'Error':
                        'The request object is missing at ' +
                        'least one of the required attributes',
                },
            )
        } else {
            await createProject({
                project_name: req.body.project_name,
                work_id: req.params.workspace_id
            })
            res.status(201).send()
        }
    } else {
        res.status(403).send()
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
 * Failure - 403 Forbidden
 * Failure - 404 Not Found
 */
router.get('/users/:user_id/workspaces/:workspace_id/projects/:project_id', async function (req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole) {
        const project = await readProject(req.params.workspace_id, req.params.project_id)

        if (!project) {
            res.status(404).json({'Error': 'No project with this project id exists'})
        } else {
            res.status(200).json(project)
        }
    } else {
        res.status(403).send()
    }
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
 * Failure - 403 Forbidden
 * Failure - 404 Not Found
 */
router.get('/users/:user_id/workspaces/:workspace_id/projects', async function (req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole) {
        const projects = await readProjects(req.params.workspace_id)

        res.status(200).json(projects)
    } else {
        res.status(403).send()
    }
})


/**
 * FOR TESTING ONLY - Endpoint to get all projects
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
 */
router.get('/projects', async function (req, res) {
    const projects = await readAllProjects()

    res.status(200).json(projects)
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
 * Failure - 403 Forbidden
 * Failure - 404 Not Found
 */
router.patch('/users/:user_id/workspaces/:workspace_id/projects/:project_id', async function(req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole === 'owner' || userRole === 'pm') {
        const project = await readProject(req.params.workspace_id, req.params.project_id)

        if (project) {
            const projectObj = {}

            if (req.body.project_name) {
                projectObj.project_name = req.body.project_name
            }

            await updateProject(req.params.project_id, projectObj)

            res.status(200).json(true)
        } else {
            res.status(404).json(false)
        }
    } else {
        res.status(403).send()
    }
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
 * Failure - 403 Forbidden
 * Failure - 404 Not Found
 */
router.delete('/users/:user_id/workspaces/:workspace_id/projects/:project_id', async function (req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole === 'owner' || userRole === 'pm') {
        const project = await readProject(req.params.workspace_id, req.params.project_id)

        if (project) {
            const projectTasks = await readTasks(req.params.project_id)

            for (const projectTask of projectTasks) {
                await deleteTask(projectTask.task_id)
            }

            await deleteProject(req.params.project_id)

            res.status(204).send()
        } else {
            res.status(404).json({'Error': 'No project with this project id exists'})
        }
    } else {
        res.status(403).send()
    }
})

/* ------------- End Endpoint Functions ------------- */


export {router}
