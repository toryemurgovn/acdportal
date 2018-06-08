'use strict';

module.exports = {

  up(db, next) {
    var courses = db.collection('courses');
    var currentTime = new Date();
    courses.insert({name: 'Blockchain 101', status: 1, __v: 0, createdAt: currentTime, updatedAt: currentTime});
    courses.insert({name: 'Blockchain 102', status: 0, __v: 0, createdAt: currentTime, updatedAt: currentTime});
    courses.insert({name: 'Blockchain 103', status: 0, __v: 0, createdAt: currentTime, updatedAt: currentTime});    
    next();
  },

  down(db, next) {
    // TODO write the statements to rollback your migration (if possible)
    next();
  }

};