import {Task} from '../models/task.mjs'
import { sequelize } from '../models/db_init.mjs'
import { Sequelize} from 'sequelize'
const Op = Sequelize.Op;

export async function updateTask(task_id, task_obj){
    await Task.update(
       task_obj,
        { where: { task_id: task_id } })
        .catch((err)=>{
            console.log(err)
            return false
       })
       return true
}

export async function readTasks(project_id){
    const tasks = await Task.findAll({where:{
        proj_id:  project_id
    }})
    return JSON.stringify(tasks)
}

export async function deleteTask (task_id_num) {
    await Task.destroy({where:{task_id: task_id_num}})
    .catch((err)=>{
        console.log(err)
        return false
       })
    return true
}

export async function createTask (task_obj){
    await Task.create({
        proj_id: task_obj.proj_id, //FK
        task_assignee: task_obj.task_assignee, //FK
        task_name: task_obj.task_name,
        task_value: task_obj.task_value,
        task_due_date: task_obj.task_due_date,
        task_descriptions: task_obj.task_descriptions,
        task_status: task_obj.task_status,
        date_ended: task_obj.date_ended
    }).catch((err)=>{
        console.log(err)
        return false
    })
    return true
}

export async function readTasksLastTwoWeeks(proj_id){
    let current_time = sequelize.fn('NOW')
    const tasks_completed = await Task.findAll({where:{
        [Op.and]:[
            {proj_id : proj_id},
            {date_created:{
                [Op.or]:{
                    [Op.lt]: current_time,
                    [Op.gt]: current_time - 14
                }
            }}
        ]
    }})
    console.log(tasks_completed)
}