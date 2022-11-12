import {createTask, createProject, readUsersProject, createUser, createWorkspace, readProjects, readUsersWorkspace, readWorkspaceForUser} from './controller.mjs'
                    
for(let i= 0; i < 100; i++){
    await createTask({
        proj_id: i,
        use_id: i+1,
        task_name: `taskname${i}`,
        task_owner: "corey",
        task_status: "complete", 
        task_value: i - 2,
        date_ended: 0,
        task_descriptions:"build a log cabin"
    })
}

for(let i= 1; i < 100; i++){
    await createUser({first_name: `corey${i}`,
    last_name: `gallagher${i}`,
    email: `corey${i}@gmail.com`})
}

for(let i= 1; i < 100; i++){
    let use_id = i % 10
    if (use_id ==0){
        use_id += 1
    }
    await createWorkspace({workspace_name: `workspacename1${i}`,
    use_id: use_id % 10})
}

// for(let i= 1; i < 100; i++){
//     let use_id = i
//     let works_id = i % 10
//     if (works_id == 0){
//         works_id +=1
//     }
//     await createProject({work_id: works_id,
//         project_name: "projectname1",
//         use_id: use_id })
// }

// for(let i= 1; i < 10; i++){
//     await readProjects(i)
// }

// for(let i= 1; i < 10; i++){
//     await readUsersWorkspace(i)
// }

// for(let i= 1; i < 10; i++){
//     await readUsersProject(i)
// }

// for(let i=1; i < 10; i++){
//     await readWorkspaceForUser(i)
// }