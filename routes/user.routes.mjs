import express from 'express';

import {createUser, deleteUser} from "../controller.mjs";

const router = express();


/* ------------- Begin User Endpoint Functions ------------- */


/**
 * Endpoint to create a user
 *
 * Request
 * Parameters passed via request body
 * @param firstName - required
 * @param lastName - required
 * @param email - required
 *
 * Response
 * @returns new user - JSON
 * {
 *     firstName: new user first name,
 *     lastName: new user last name,
 *     email: new user email,
 *     self: URL to get new user
 * }
 *
 * Response Statuses
 * Success - 201 Created
 * Failure - 400 Bad Request - Missing a required attribute
 */
router.post('/users', function(req, res) {
   if (req.body.firstName == null ||
        req.body.lastName == null ||
        req.body.email == null) {
    res.status(400).json({
      'Error':
          'The request object is missing at ' +
          'least one of the required attributes',
    },
    );
  } else {
    createUser(req.body.firstName, req.body.lastName, req.body.email)
        .then((newUser) => {
          // const formattedUser = formatUser(req, newUser);
          res.status(201).json(newUser.dataValues);
        });
  }
});


/**
 * Endpoint to get all users
 *
 * Request
 * No parameters required
 *
 * Response
 * @returns users - Array<JSON>
 * {
 *     firstName: user first name,
 *     lastName: user last name,
 *     email: user email,
 *     self: URL to get user
 * }
 *
 * Response Statuses
 * Success - 200 OK
 */
// router.get('/users', function(req, res) {
//   getUsers(req).then((users) => {
//     res.status(200).json(users);
//   });
// });


/**
 * Endpoint to get a specific user
 *
 * Request
 * Parameter passed via URL path
 * @param id
 *
 * Response
 * @returns user - JSON
 * {
 *     firstName: user first name,
 *     lastName: user last name,
 *     email: user email,
 *     self: URL to get user
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 404 Not Found
 */
// router.get('/users/:id', function(req, res) {
//   getUser(req.params.id)
//       .then((user) => {
//         if (!user) {
//           res.status(404).json({'Error': 'No user with this user id exists'});
//         } else {
//           const formattedUser = formatUser(req, user);
//           res.status(200).json(formattedUser);
//         }
//       });
// });


/**
 * Endpoint to edit a user
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
 * @returns updated user - JSON
 * {
 *     firstName: updated user first name,
 *     lastName: updated user last name,
 *     email: updated user email,
 *     self: URL to get updated user
 * }
 *
 * Response Statuses
 * Success - 200 OK
 * Failure - 404 Not Found
 */
// router.patch('/users/:id', function(req, res) {
//   editUser(req.params.id, req.body.firstName, req.body.lastName, req.body.email)
//       .then((updatedUser) => {
//         if (!updatedUser) {
//           res.status(404).json({'Error': 'No user with this user id exists'});
//         } else {
//           const formattedUser = formatUser(req, updatedUser);
//           res.status(200).json(formattedUser);
//         }
//       });
// });


/**
 * Endpoint to delete a user
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
router.delete('/users/:id', function(req, res) {
  deleteUser(req.params.id).then((result) => {
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).json({'Error': 'No user with this user id exists'});
    }
  });
});


/* ------------- End Endpoint Functions ------------- */

export {router};
