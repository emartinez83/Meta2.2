'use strict';
const {
  Model
} = require('sequelize');
const Proyecto = require('./proyecto')
module.exports = (sequelize, DataTypes) => {
  class DonadoresProyectos extends Model {
    static associate(models) {
      // define association here
      DonadoresProyectos.belongsTo(models.donadores, {
        foreignKey: 'donadorId',
        as: 'donador',
      });

      DonadoresProyectos.belongsTo(Proyecto, {
        foreignKey: 'proyectoId',
        as: 'proyecto',
      })
    }
  }
  DonadoresProyectos.init({
    donadorId: {
      Type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'Donadores',
        key: 'id',
      },
    },
    proyectoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Proyecto',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'DonadoresProyectos',
  });
  return DonadoresProyectos;
};

