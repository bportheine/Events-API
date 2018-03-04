'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        title: "TestEvent1",
        startDate: "2018-03-20",
        endDate: "2018-03-25",
        description: "This is a test for an event, so nothing worth going to..."
      },
      {
        title: "TestEvent2",
        startDate: "2017-05-12",
        endDate: "2017-05-14",
        description: "I don't know why you expected..."
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {})
  }
};
