//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");

//associations could go here!

//are we missing model export for Product?

module.exports = {
  db,
  models: {
    User,
  },
};
