import {createTask, updateTask, deleteTask, readTasksLastTwoWeeks, readTasks} from './controllers/task_controller.mjs'
import {createUser, updateUser, deleteUser, readUser} from './controllers/user_controller.mjs'
import {createProject, updateProject, deleteProject, readProjects} from './controllers/project_controller.mjs'
import {createWorkspace, updateWorkspace, deleteWorkspace, readWorkspace} from './controllers/workspace_controller.mjs'
import {addUserToWorkspace, deleteUserFromWorkspace, updateUserInWorkspace, readUsersWorkspace, readWorkspaceForUser} from './controllers/workspaceUser_controller.mjs'


async function test_user_workspace(){
    for(let i = 1; i < 4; i ++){
        await createUser({first_name: `corey${i}`,
        last_name: `gallagher${i}`,
        email: `corey${i}@gmail.com`})
    }
    await createWorkspace({workspace_name: `workspacename1`,
    use_id: 1})

    let users_in_workspace = await readUsersWorkspace(1)
    console.log('----------------------------------')
    console.log('One user in workspace')
    console.log('----------------------------------')
    console.log(users_in_workspace)

    for(let i = 2; i < 4; i ++){
        await addUserToWorkspace(i,1,{role_name:'member'})
    }
    users_in_workspace = await readUsersWorkspace(1)
    console.log('----------------------------------')
    console.log('Three users in workspace')
    console.log('----------------------------------')
    console.log(users_in_workspace)

    await deleteUserFromWorkspace(3,1)
    users_in_workspace = await readUsersWorkspace(1)
    console.log('----------------------------------')
    console.log('Two users in workspace')
    console.log('----------------------------------')
    console.log(users_in_workspace)

    await createWorkspace({workspace_name: 'test1',
                            use_id:1})

    await createWorkspace({workspace_name: 'test1',
                            use_id:1})

    console.log('-----------------------------------------')
    console.log("USER 1 is in the following workspaces")
    console.log(await readWorkspaceForUser(1))
}


async function test_updates(){
    for(let i = 1; i < 4; i ++){
        await createUser({first_name: `corey${i}`,
        last_name: `gallagher${i}`,
        email: `corey${i}@gmail.com`})
    }
    await createWorkspace({workspace_name: 'testspace',
                            use_id: 1})
    console.log('-------------------------------------------------------')
    console.log('Original Workspace')
    console.log(await readWorkspaceForUser(1))
    console.log('-------------------------------------------------------')
    await updateWorkspace(1, {workspace_name: 'updatedspace'})
    console.log('Updated Workspace')
    console.log(await readWorkspaceForUser(1))


    console.log('-------------------------------------------------------')
    await createProject({project_name: 'created proj',
                        work_id: 1})
    console.log('-------------------------------------------------------')
    console.log('Original Project')
    console.log(await readProjects(1))
    await updateProject(1, {project_name: 'update proj'})
    console.log('-------------------------------------------------------')
    console.log("updated project")
    console.log(await readProjects(1))


    console.log('-------------------------------------------------------')
    console.log("original user")
    console.log(await readUsersWorkspace(1))
    await updateUser(1,{email: 'updatedemail@email.com'})
    console.log('-------------------------------------------------------')
    console.log("updated user")
    console.log(await readUsersWorkspace(1))
    console.log('-------------------------------------------------------')
    await createTask({proj_id: 1,
                task_name: `taskname1`,
                task_due_date: 2,
                task_assignee: 1,
                task_status: "complete", 
                task_value: 12,
                date_ended: 0,
                task_descriptions:"build a log cabin"
            })
    console.log('original_task')
    console.log(await readTasks(1))
    console.log('-------------------------------------------------------')
    await updateTask(1, {task_value: 18, task_name: 'UPDATED'})
    console.log('updated task')
    console.log(await readTasks(1))
    console.log('-------------------------------------------------------')

}

async function test_update_user_role(){
    await updateUserInWorkspace(1,1,{role_name: 'member'})
}

async function test_reads_user_workspace(){
    console.log('-------------------------------------------------')
    console.log('USER with ID 1 is ')
    console.log(await readUser(1))
    console.log('-------------------------------------------------')
    await createWorkspace({use_id:1, workspace_name:'test2'})
    console.log('WORKSPACE with ID 2 is ')
    console.log(await readWorkspace(2))

}

async function test_delete_cascading_workspace(){
    //Create new user workspace and tasks to check workspace cascade
    await createUser({first_name: 'corey',
                        last_name: 'gallagher',
                        email: 'cgalla16@hotmail.com'})
    await createWorkspace({workspace_name: 'workspacedelete',
                            use_id: 1})
    await createProject({project_name:'gonna delete',
                        work_id:1})
    await createTask({task_name: 'name1',
                        task_assignee: 1,
                        task_value:17,
                        proj_id: 1,
                        task_descriptions: 'blah blah',
                        task_status:'done',
                        task_due_date: 1,
                        })
    console.log('Project and task BEFORE DELETEION')
    console.log('--------------------------------------------------')
    console.log(await readProjects(1))
    console.log(await readTasks(1))
    await deleteWorkspace(1)
    console.log('Project and task after DELETEION')
    console.log('--------------------------------------------------')
    console.log(await readProjects(1))
    console.log(await readTasks(1))
}
// these functions are uncommented and run one by one to test functionality 
// of the db


// test_updates()
// test_user_workspace()
// test_update_user_role()

// create a fresh db for this one
// test_delete_cascading_workspace()
// test_reads_user_workspace()

