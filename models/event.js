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
    description: DataTypes.TEXT
  }, {
    timestamps: false,
    validate: {
      dateMixUp() {
        if (this.startDate > this.endDate) {
          throw new Error("End date must proceed start date.")
        }
      },
      tooEarly() {
        if (Date.parse(this.startDate) < new Date()) {
          throw new Error("You can't schedule something that already happened.")
        }
      }
    }
  });
  Event.associate = function(models) {

  };
  return Event;
};
