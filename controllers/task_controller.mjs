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
        task_assignee: task_obj.task_assignee, 
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

// retruns list of task objects from a project that were not marked as done before the previous two weeks
export async function readTasksLastTwoWeeks(proj_id){
    const tasks_in_timeframe = await Task.findAll(
        {where:{proj_id : proj_id}}
        ).catch((err)=>{
            console.log(err)
        })
    let tasks = []
    for(const task of tasks_in_timeframe){
        let date_ended = task.dataValues.date_ended
        let cutoff_date = new Date()
        cutoff_date.setDate(cutoff_date.getDate() - 14)
        if (date_ended >= cutoff_date){
            tasks.push(task.dataValues)
        }
    }
    return tasks
}