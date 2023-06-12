"use strict";

const { db } = require("../server/db");
const User = require("../server/db/models/User.js");
const Product = require("../server/db/models/Products.js");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Products
  const product = await Promise.all([
    Product.create({
      name: "Dragon Ball 5",
      price: 9000,
      quantity: 1,
      imgUrl:
        "https://p1.hiclipart.com/preview/77/394/529/esfera-del-dragon-de-5-estrella-render-hd-five-dragon-ball-illustration-png-clipart.jpg",
      description: "The Fifth Dragon Ball",
    }),
  ]);
  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cman",
      email: "cody.john@gmail.com",
      firstName: "cody",
      lastName: "johnny",
      password: "123",
    }),
    User.create({
      username: "mman",
      email: "murphy.sin@gmail.com",
      firstName: "murphy",
      lastName: "sin",
      password: "123",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    product: {
      dragonBall5: product[0],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
