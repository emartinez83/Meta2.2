const { DataTypes, Sequelize } = require('sequelize');
const Donadores = require('../models/donadores');
// Crea una instancia de Sequelize con tu configuración

const sequelize = new Sequelize({
    dialect: 'mysql', // El tipo de base de datos que estás utilizando
    host: 'localhost', // La ubicación del servidor de la base de datos
    username: 'root', // Tu nombre de usuario de la base de datos
    password: 'erickson12', // Tu contraseña de la base de datos
    database: 'meta2_2', // El nombre de la base de datos
});

const Proyecto = sequelize.define('Proyecto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    donatario: {
        type: DataTypes.STRING,
    },
    donadores: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    cantidadDonada: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
});

Proyecto.belongsToMany(Donadores,{
    through: 'DonadoresProyectos',
    foreignKey: 'proyectoId',
    as: 'donadores',
});

module.exports = Proyecto;
