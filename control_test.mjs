import {createTask, createProject, createUser, createWorkspace} from './controller.mjs'

const user  =  createUser({first_name: "corey",
                            last_name: "gallagher",
                            email: "email@test.com"})

const project = createProject({work_id: 17327327,
                                project_name: "projectname1",
                                use_id: 1})


const task = createTask({proj_id: 18239129,
                        use_id: 49289123,
                        task_name: "taskname1",
                        task_owner: "corey",
                        task_status: "complete", 
                        task_value: 7,
                        date_ended: 0,
                        task_descriptions:"build a log cavbin"})

                        
const workspace = createWorkspace({workspace_name: "taskname1",
                                    use_id: 1})
