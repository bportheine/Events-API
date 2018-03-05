'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    title:  DataTypes.STRING,
    startDate: {
      type: DataTypes.STRING,
      validate: { isDate: true }
    },
    endDate: {
      type: DataTypes.STRING,
      validate: { isDate: true }
    },
    description: DataTypes.STRING
  }, {});
  Event.associate = function(models) {

  };
  return Event;
};
