'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InstructorAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InstructorAttendance.init({
    instructorId: DataTypes.INTEGER,
    checkInTime: DataTypes.DATE,
    checkOutTime: DataTypes.DATE,
    isCheckedIn: DataTypes.BOOLEAN,
    monthId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InstructorAttendance',
  });
  return InstructorAttendance;
};