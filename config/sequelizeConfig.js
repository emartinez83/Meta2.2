const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql', // El tipo de base de datos que estás utilizando
    host: 'localhost', // La ubicación del servidor de la base de datos
    username: 'root', // Tu nombre de usuario de la base de datos
    password: 'erickson12', // Tu contraseña de la base de datos
    database: 'meta2_2', // El nombre de la base de datos
});

module.exports = sequelize;
