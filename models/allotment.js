/**
 * @Created 28/07/2021 - 22:56 PM
 * @Project ipo-result-backend
 * @Author Jiwan Sapkota - sapkotazeewan13@gmail.com
 */
module.exports = function(sequelize, DataTypes) {
    const Allotment= sequelize.define('Allotment', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      company: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      boid: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      qty: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },{ 
      timestamps: false,
    });
    return Allotment;
  };