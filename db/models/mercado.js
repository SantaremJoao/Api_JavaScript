'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mercado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
      // For example, if the 'Produto' model has a foreign key 'mercado_id' referencing the 'Mercado' model's 'id' field, you can define the association as follows:
      // Mercado.hasMany(models.Produto, { foreignKey: 'mercado_id' });
    }
  }

  Mercado.init({
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
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 14,
      unique: true,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 9,
    },
    usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'mercado',
    timestamps: false,
  });

  return Mercado;
};