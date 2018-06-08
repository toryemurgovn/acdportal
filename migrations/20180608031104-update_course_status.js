'use strict';

module.exports = {

  up(db, next) {
    // TODO write your migration here
    var courses = db.collection('courses');
    var currentTime = new Date();
    courses.update({}, {
      $set: {
        status: 0
      }
    }, function () {
      courses.update({
        name: "Blockchain 101"
      }, {
        $set: {
          status: 1
        }
      });
    });
    next();
  },

  down(db, next) {
    // TODO write the statements to rollback your migration (if possible)
    next();
  }

};