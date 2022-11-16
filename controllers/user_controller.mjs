import {User} from '../models/user.mjs'
import { sequelize } from '../models/db_init.mjs'
import { Sequelize} from 'sequelize'
const Op = Sequelize.Op;


export async function deleteUser (user_id_num){
    await User.destroy({where:{user_id: user_id_num}})
    .catch((err)=>{
        console.log(err)
        return false
       })
    return true
}

export async function createUser (user_obj) {
    await User.create({
        first_name: user_obj.first_name,
        last_name: user_obj.last_name,
        email: user_obj.email
    }).catch((err) => {
        console.log(err)
        return false
    })
    return true
}

export async function updateUser(user_id, user_obj){
    await User.update(
       user_obj,
        { where: { user_id: user_id } })
        .catch((err)=>{
            console.log(err)
            return false
       })
       return true
}

export async function readUser(user_id){
    const user = await User.findAll({where:{
        user_id:  user_id
    }})
    return JSON.stringify(user)
}