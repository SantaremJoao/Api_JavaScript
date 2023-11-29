'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    
    
   
  }

  Produto.init({
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
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    validade: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mercado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      length: 11,
    },
    data_inclusao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagem: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'produto',
    timestamps: false,
  });

  return Produto;
};