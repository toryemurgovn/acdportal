'use strict';
let bcrypt = require("bcrypt-nodejs");

module.exports = {

  up(db, next) {
    const userCollection = db.collection('users');
    let currentTime = new Date();
    let user = {
      email: "admin@admin.io",
      password: "123456",
      role: "admin",
      __v: 0,
      createdAt: currentTime,
      updatedAt: currentTime
    };
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, undefined, (err, hash) => {
        if (err) { return next(err); }
        user.password = hash;
        userCollection.insert(user);
        next();
      });
    });

    next();
  },

  down(db, next) {
    // TODO write the statements to rollback your migration (if possible)
    next();
  }

};