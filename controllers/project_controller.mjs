import {Project} from '../models/project.mjs'
import {Sequelize} from 'sequelize'

const Op = Sequelize.Op;

export async function createProject(project_obj) {
    await Project.create({
        project_name: project_obj.project_name,
        work_id: project_obj.work_id
    })
        .catch((err) => {
            console.log(err)
            return false
        })
    return true
}

export async function deleteProject(project_id_num) {
    await Project.destroy({where: {project_id: project_id_num}})
        .catch((err) => {
            console.log(err)
            return false
        })
    return true
}

export async function updateProject(project_id, project_obj) {
    await Project.update(
        project_obj,
        {where: {project_id: project_id}})
        .catch((err) => {
            console.log(err)
            return false
        })
    return true
}

export async function readProject(workspace_id, project_id) {
    const result = await Project.findAll({
        where: {
            work_id: workspace_id,
            project_id: project_id
        }
    })
    return result[0]
}

export async function readProjects(workspace_id) {
    return await Project.findAll({
        where: {
            work_id: workspace_id
        }
    })
}

// For Testing Only
export async function readAllProjects() {
    return await Project.findAll()
}