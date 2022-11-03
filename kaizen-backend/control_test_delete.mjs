//this file tests the delete functionality of the db
import {deleteProject, deleteUser, deleteTask} from './controller.mjs'

const user  =  deleteUser(1)
const project = deleteProject(1)
const task = deleteTask(1)