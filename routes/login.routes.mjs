import express from 'express'
import jwtDecode from "jwt-decode";

import {createUser, readUserByEmail} from "../controllers/user_controller.mjs";

const router = express()


/* ------------- Begin Login Endpoint Functions ------------- */

/**
 * Endpoint to log a user in
 *
 * Request
 * Parameters passed via request body
 * @param credential - required
 *
 * Response Statuses
 * Success - 200 OK
 * Success - 201 Created
 */
router.post('/login', async function (req, res) {
    const jwtToken = jwtDecode(req.body.credential)

    const user = await readUserByEmail(jwtToken.email)

    if (user) {
        res.status(200).json(user)
    } else {
        await createUser({
            first_name: jwtToken.given_name,
            last_name: jwtToken.family_name,
            email: jwtToken.email
        })

        const new_user = await readUserByEmail(jwtToken.email)

        res.status(201).json(new_user)
    }
})

/* ------------- End Endpoint Functions ------------- */


export {router}
