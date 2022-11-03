import {createTask, createProject, createUser} from './controller.mjs'

const user  =  createUser('test_name', 'test_lname', 'testmail')
const project = createProject('projname', 'projtypefun', 'projownertest')
const task = createTask("task1", "insertdata","corey","this is a long task", "not done")