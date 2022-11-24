import Sequelize from "sequelize"


export const sequelize = process.env.CLOUD_DEPLOYMENT ? new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    dialect: 'mysql',
    dialectOptions: {
        socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    },
}) : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'sqlite',
    storage: 'data/dev-db.sqlite3'
})
