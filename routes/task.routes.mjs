import express from 'express'

import {createTask, deleteTask, readTask, readTasks, readAllTasks, updateTask, readTasksInTimeframe} from "../controllers/task_controller.mjs"
import {readUserRoleInWorkspace} from "../controllers/workspaceUser_controller.mjs";

const router = express()


/* ------------- Begin Task Endpoint Functions ------------- */

/**
 * Endpoint to create a task
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 * @param project_id
 *
 * Parameters passed via request body
 * @param task_name - required
 * @param task_value - required
 * @param task_status - required
 * @param task_assignee - optional
 * @param task_descriptions - optional
 * @param task_due_date - optional
 *
 * Response
 * @returns task - JSON
 * {
 *     task_id: task id,
 *     task_name: task name,
 *     task_value: task value,
 *     task_status: task status,
 *     task_assignee: id of the user assigned to the task,
 *     task_descriptions: task descriptions,
 *     task_due_date: task due date,
 *     date_ended: date that the task was marked completed
 *     proj_id: project id (foreign key)
 * }
 *
 * Response Statuses
 * Success - 201 Created
 * Failure - 400 Bad Request
 * Failure - 403 Forbidden
 */
router.post('/users/:user_id/workspaces/:workspace_id/projects/:project_id/tasks', async function(req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole) {
        if (req.body.task_name == null ||
            req.body.task_value == null ||
            req.body.task_status == null) {
            res.status(400).json({
                    'Error':
                        'The request object is missing at ' +
                        'least one of the required attributes',
                },
            )
        } else {
            const taskObj = {}

            taskObj.task_name = req.body.task_name
            taskObj.task_value = req.body.task_value
            taskObj.task_status = req.body.task_status
            taskObj.proj_id = req.params.project_id
            taskObj.task_assignee = req.body.task_assignee ? req.body.task_assignee : null
            taskObj.task_descriptions = req.body.task_descriptions ? req.body.task_descriptions : null
            taskObj.task_due_date = req.body.task_due_date ? req.body.task_due_date : null
            taskObj.date_ended = null

            const newTask = await createTask(taskObj)

            res.status(201).json(newTask)
        }
    } else {
        res.status(403).send()
    }
})


/**
 * Endpoint to get a specific task
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 * @param project_id
 * @param task_id
 *
 * Response
 * @returns task - JSON
 * {
 *     task_id: task id,
 *     task_name: task name,
 *     task_value: task value,
 *     task_status: task status,
 *     task_assignee: id of the user assigned to the task,
 *     task_descriptions: task descriptions,
 *     task_due_date: task due date,
 *     date_ended: date that the task was marked completed
 *     proj_id: project id (foreign key)
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 403 Forbidden
 * Failure - 404 Not Found
 */
router.get('/users/:user_id/workspaces/:workspace_id/projects/:project_id/tasks/:task_id', async function(req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole) {
        const task = await readTask(req.params.project_id, req.params.task_id)
        if (!task) {
            res.status(404).json({'Error': 'No task with this task id exists'})
        } else {
            res.status(200).json(task)
        }
    } else {
        res.status(403).send()
    }
})


/**
 * Endpoint to get all tasks in a project
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 * @param project_id
 *
 * Response
 * @returns tasks - Array<JSON>
 * {
 *     task_id: task id,
 *     task_name: task name,
 *     task_value: task value,
 *     task_status: task status,
 *     task_assignee: id of the user assigned to the task,
 *     task_descriptions: task descriptions,
 *     task_due_date: task due date,
 *     date_ended: date that the task was marked completed
 *     proj_id: project id (foreign key)
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 403 Forbidden
 */
router.get('/users/:user_id/workspaces/:workspace_id/projects/:project_id/tasks', async function(req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole) {
        const tasks = await readTasks(req.params.project_id)

        res.status(200).json(tasks)
    } else {
        res.status(403).send()
    }
})


/**
 * FOR TESTING ONLY - Endpoint to get all tasks
 *
 * Response
 * @returns tasks - Array<JSON>
 * {
 *     task_id: task id,
 *     task_name: task name,
 *     task_value: task value,
 *     task_status: task status,
 *     task_assignee: id of the user assigned to the task,
 *     task_descriptions: task descriptions,
 *     task_due_date: task due date,
 *     date_ended: date that the task was marked completed
 *     proj_id: project id (foreign key)
 * }
 *
 * Response Status
 * Success - 200 OK
 */
router.get('/tasks', async function(req, res) {
    const tasks = await readAllTasks()

    res.status(200).json(tasks)
})


/**
 * Endpoint to get all tasks that were open during the past two weeks
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 * @param project_id
 *
 * Response
 * @returns cumulative task value per day - Array<Number>
 *
 * Response Statuses
 * Success - 200 OK
 */
// TODO - BETTER URL ENDPOINT NAMING, NEED TO BREAK DOWN THE VALUES BY DAY
router.get('/users/:user_id/workspaces/:workspace_id/projects/:project_id/tasks/prev_two_weeks', async function (req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole) {
        const tasks = await readTasksInTimeframe(req.params.project_id, 3)

        res.status(200).json(tasks)
    } else {
        res.status(403).send()
    }

})


/**
 * Endpoint to edit a task
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 * @param project_id
 * @param task_id
 *
 * Parameters passed via request body
 * @param task_name - optional
 * @param task_value - optional
 * @param task_status - optional
 * @param task_assignee - optional
 * @param task_descriptions - optional
 * @param task_due_date - optional
 * @param date_ended - optional
 *
 * Response
 * @returns boolean
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 403 Forbidden
 * Failure - 404 Not Found
 */
router.patch('/users/:user_id/workspaces/:workspace_id/projects/:project_id/tasks/:task_id', async function(req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole) {
        const task = await readTask(req.params.project_id, req.params.task_id)

        if (task) {
            const taskObj = {}

            // Parse the request body to get only the attributes that are being updated
            if (req.body.task_name) {
                taskObj.task_name = req.body.task_name
            }
            if (req.body.task_value) {
                taskObj.task_value = req.body.task_value
            }
            if (req.body.task_status) {
                taskObj.task_status = req.body.task_status
            }
            if (req.body.task_assignee) {
                taskObj.task_assignee = req.body.task_assignee
            }
            if (req.body.task_descriptions) {
                taskObj.task_descriptions = req.body.task_descriptions
            }
            if (req.body.task_due_date) {
                taskObj.task_due_date = req.body.task_due_date
            }
            if (req.body.date_ended) {
                taskObj.date_ended = req.body.date_ended
            }

            await updateTask(req.params.task_id, taskObj)

            res.status(200).json(true)
        } else {
            res.status(404).json(false)
        }
    } else {
        res.status(403).send()
    }
})


/**
 * Endpoint to delete a task
 *
 * Request
 * Parameters passed via URL path
 * @param user_id
 * @param workspace_id
 * @param project_id
 * @param task_id
 *
 * Response Statuses
 * Success - 204 No Content
 * Failure - 403 Forbidden
 * Failure - 404 Not Found
 */
router.delete('/users/:user_id/workspaces/:workspace_id/projects/:project_id/tasks/:task_id', async function(req, res) {
    const userRole = await readUserRoleInWorkspace(req.params.user_id, req.params.workspace_id)

    if (userRole) {
        const task = await readTask(req.params.project_id, req.params.task_id)

        if (task) {
            await deleteTask(req.params.task_id)

            res.status(204).send()
        } else {
            res.status(404).json({'Error': 'No task with this task id exists'})
        }
    } else {
        res.status(403).send()
    }
})

/* ------------- End Endpoint Functions ------------- */


export {router}
