import {createTask, createProject, createUser} from './controller.mjs'

const user  =  createUser('test_name', 'test_lname', 'testmail')
const project = createProject('projname', 'projownertest')
const task = createTask("taskname1","corey","complete", 7,"build a log cavbin")
