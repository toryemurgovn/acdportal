'use strict';

module.exports = {

  up(db, next) {
    // TODO write your migration here
    var courses = db.collection('courses');
    var currentTime = new Date();
    courses.insert({name: 'Blockchain 101', __v: 0, createdAt: currentTime, updatedAt: currentTime});
    courses.insert({name: 'Blockchain 102', __v: 0, createdAt: currentTime, updatedAt: currentTime});
    courses.insert({name: 'Blockchain 103', __v: 0, createdAt: currentTime, updatedAt: currentTime});    
    next();
  },

  down(db, next) {
    // TODO write the statements to rollback your migration (if possible)
    next();
  }

};