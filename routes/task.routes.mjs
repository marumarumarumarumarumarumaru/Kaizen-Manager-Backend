import express from 'express';

import {createTask, deleteTask} from "../controller.mjs";

const router = express();


/* ------------- Begin Task Endpoint Functions ------------- */


/**
 * Endpoint to create a task
 *
 * Request
 * Parameters passed via request body
 * @param taskName - required
 * @param taskType - required
 * @param taskOwner - required
 * @param taskDescription - required
 * @param taskStatus - required
 *
 * Response
 * @returns new task - JSON
 * {
 *     taskName: new task first name,
 *     taskType: new task last name,
 *     email: new task email,
 *     self: URL to get new task
 * }
 *
 * Response Statuses
 * Success - 201 Created
 * Failure - 400 Bad Request - Missing a required attribute
 */
router.post('/tasks', function(req, res) {
    if (req.body.taskName == null ||
        req.body.taskType == null ||
        req.body.taskOwner == null ||
        req.body.taskDescriptions == null ||
        req.body.taskStatus == null) {
        res.status(400).json({
                'Error':
                    'The request object is missing at ' +
                    'least one of the required attributes',
            },
        );
    } else {
        createTask(req.body.taskName,
            req.body.taskType,
            req.body.taskOwner,
            req.body.taskDescriptions,
            req.body.taskStatus)
            .then((newTask) => {
                res.status(201).json(newTask.dataValues);
            });
    }
});


/**
 * Endpoint to get all tasks
 *
 * Request
 * No parameters required
 *
 * Response
 * @returns tasks - Array<JSON>
 * {
 *     firstName: task first name,
 *     lastName: task last name,
 *     email: task email,
 *     self: URL to get task
 * }
 *
 * Response Statuses
 * Success - 200 OK
 */
// router.get('/tasks', function(req, res) {
//     getTasks(req).then((tasks) => {
//         res.status(200).json(tasks);
//     });
// });


/**
 * Endpoint to get a specific task
 *
 * Request
 * Parameter passed via URL path
 * @param id
 *
 * Response
 * @returns task - JSON
 * {
 *     firstName: task first name,
 *     lastName: task last name,
 *     email: task email,
 *     self: URL to get task
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 404 Not Found
 */
// router.get('/tasks/:id', function(req, res) {
//     getTask(req.params.id)
//         .then((task) => {
//             if (!task) {
//                 res.status(404).json({'Error': 'No task with this task id exists'});
//             } else {
//                 const formattedTask = formatTask(req, task);
//                 res.status(200).json(formattedTask);
//             }
//         });
// });


/**
 * Endpoint to edit a task
 *
 * Request
 * Parameter passed via URL path
 * @param id
 *
 * Parameters passed via request body
 * @param firstName
 * @param lastName
 * @param email
 *
 * Response
 * @returns updated task - JSON
 * {
 *     firstName: updated task first name,
 *     lastName: updated task last name,
 *     email: updated task email,
 *     self: URL to get updated task
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 404 Not Found
 */
// router.patch('/tasks/:id', function(req, res) {
//     editTask(req.params.id, req.body.firstName, req.body.lastName, req.body.email)
//         .then((updatedTask) => {
//             if (!updatedTask) {
//                 res.status(404).json({'Error': 'No task with this task id exists'});
//             } else {
//                 const formattedTask = formatTask(req, updatedTask);
//                 res.status(200).json(formattedTask);
//             }
//         });
// });


/**
 * Endpoint to delete a task
 *
 * Parameter passed via URL path
 * @param - id
 *
 * Response
 * None
 *
 * Response Statuses
 * Success - 204 No Content
 * Failure - 404 Not Found
 */
router.delete('/tasks/:id', function(req, res) {
    deleteTask(req.params.id).then((result) => {
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({'Error': 'No task with this task id exists'});
        }
    });
});


/* ------------- End Endpoint Functions ------------- */

export {router};
