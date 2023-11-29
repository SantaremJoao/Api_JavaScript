'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
    }
  }

  Usuario.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 255,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 255,
    },
    cpf_cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 14,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 9,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 255,
    },
    data_nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        length: 255,
    },
    tipo_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        length: 1,
    },
  }, {
    sequelize,
    modelName: 'usuario',
    timestamps: false,
  });

  return Usuario;
};