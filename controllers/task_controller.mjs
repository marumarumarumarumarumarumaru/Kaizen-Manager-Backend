import {Task} from '../models/task.mjs'
import {sequelize} from '../models/db_init.mjs'
import {Sequelize} from 'sequelize'

const Op = Sequelize.Op;

export async function updateTask(task_id, task_obj) {
    await Task.update(
        task_obj,
        {where: {task_id: task_id}})
        .catch((err) => {
            console.log(err)
            return false
        })
    return true
}

export async function readTask(project_id, task_id) {
    const result = await Task.findAll({
        where: {
            proj_id: project_id,
            task_id: task_id
        }
    })
    return result[0]
}

export async function readTasks(project_id) {
    return await Task.findAll({
        where: {
            proj_id: project_id
        }
    })
}

export async function deleteTask(task_id_num) {
    await Task.destroy({where: {task_id: task_id_num}})
        .catch((err) => {
            console.log(err)
            return false
        })
    return true
}

export async function createTask(task_obj) {
    return await Task.create({
        proj_id: task_obj.proj_id, //FK
        task_assignee: task_obj.task_assignee,
        task_name: task_obj.task_name,
        task_value: task_obj.task_value,
        task_due_date: task_obj.task_due_date,
        task_descriptions: task_obj.task_descriptions,
        task_status: task_obj.task_status,
        date_ended: task_obj.date_ended
    }).catch((err) => {
        console.log(err)
    })
}

// For Testing Only
export async function readAllTasks() {
    return await Task.findAll()
}

// returns list of task objects from a project that were not marked as done before the previous two weeks
export async function readTasksInTimeframe(proj_id, timeframe) {
    const tasks_in_timeframe = await Task.findAll(
        {where: {proj_id: proj_id}}
    ).catch((err) => {
        console.log(err)
    })
    let tasks = []
    for (const task of tasks_in_timeframe) {
        let date_ended = task.dataValues.date_ended
        let cutoff_date = new Date()
        cutoff_date.setDate(cutoff_date.getDate() - timeframe)
        if (!date_ended || date_ended >= cutoff_date) {
            tasks.push(task)
        }
    }
    return tasks
}