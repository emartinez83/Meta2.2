const { DataTypes, Sequelize } = require('sequelize');
const Proyecto = require('../models/proyecto');

// Crea una instancia de Sequelize con tu configuración
const sequelize = new Sequelize({
  dialect: 'mysql', // El tipo de base de datos que estás utilizando
  host: 'localhost', // La ubicación del servidor de la base de datos
  username: 'root', // Tu nombre de usuario de la base de datos
  password: 'erickson12', // Tu contraseña de la base de datos
  database: 'meta2_2', // El nombre de la base de datos
});

const Donadores = sequelize.define('Donadores', {
  rfc: {
    type: DataTypes.STRING
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  proyectosAsociados: {
    type: DataTypes.TEXT,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidadDonada: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

Donadores.belongsToMany(Proyecto, {
  through: 'DonadoresProyectos',
  foreignKey: 'proyectoId',
  as: 'proyecto',
});

module.exports = Donadores;
