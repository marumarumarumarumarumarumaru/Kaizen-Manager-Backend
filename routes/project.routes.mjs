import express from 'express';

import {createProject, deleteProject} from "../controllers/project_controller.mjs";

const router = express();


/* ------------- Begin Project Endpoint Functions ------------- */


/**
 * Endpoint to create a project
 *
 * Request
 * Parameters passed via request body
 *
 * Response
 * @returns new project - JSON
 * {
 *
 * }
 *
 * Response Statuses
 * Success - 201 Created
 * Failure - 400 Bad Request - Missing a required attribute
 */
router.post('/projects', function(req, res) {
    if (req.body.projectName == null ||
        req.body.projectType == null ||
        req.body.projectOwner == null) {
        res.status(400).json({
                'Error':
                    'The request object is missing at ' +
                    'least one of the required attributes',
            },
        );
    } else {
        createProject(req.body.projectName, req.body.projectType, req.body.projectOwner)
            .then((newProject) => {
                res.status(201).json(newProject.dataValues);
            });
    }
});


/**
 * Endpoint to get all projects
 *
 * Request
 * No parameters required
 *
 * Response
 * @returns projects - Array<JSON>
 * {
 *     firstName: project first name,
 *     lastName: project last name,
 *     email: project email,
 *     self: URL to get project
 * }
 *
 * Response Statuses
 * Success - 200 OK
 */
// router.get('/projects', function(req, res) {
//     getProjects(req).then((projects) => {
//         res.status(200).json(projects);
//     });
// });


/**
 * Endpoint to get a specific project
 *
 * Request
 * Parameter passed via URL path
 * @param id
 *
 * Response
 * @returns project - JSON
 * {
 *     firstName: project first name,
 *     lastName: project last name,
 *     email: project email,
 *     self: URL to get project
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 404 Not Found
 */
// router.get('/projects/:id', function(req, res) {
//     getProject(req.params.id)
//         .then((project) => {
//             if (!project) {
//                 res.status(404).json({'Error': 'No project with this project id exists'});
//             } else {
//                 const formattedProject = formatProject(req, project);
//                 res.status(200).json(formattedProject);
//             }
//         });
// });


/**
 * Endpoint to edit a project
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
 * @returns updated project - JSON
 * {
 *     firstName: updated project first name,
 *     lastName: updated project last name,
 *     email: updated project email,
 *     self: URL to get updated project
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 404 Not Found
 */
// router.patch('/projects/:id', function(req, res) {
//     editProject(req.params.id, req.body.firstName, req.body.lastName, req.body.email)
//         .then((updatedProject) => {
//             if (!updatedProject) {
//                 res.status(404).json({'Error': 'No project with this project id exists'});
//             } else {
//                 const formattedProject = formatProject(req, updatedProject);
//                 res.status(200).json(formattedProject);
//             }
//         });
// });


/**
 * Endpoint to delete a project
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
router.delete('/projects/:id', function(req, res) {
    deleteProject(req.params.id).then((result) => {
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({'Error': 'No project with this project id exists'});
        }
    });
});


/* ------------- End Endpoint Functions ------------- */

export {router};
