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
      name: "Dragon Balls",
      price: 9000,
      quantity: 7,
      imgUrl:"https://cdn.shopify.com/s/files/1/0441/9405/products/Dragon_Ball_Stickers_Seven_Dragon_Balls_Z_GT_Super_1400x.jpg?v=1549034462",
      description: "The fifth dragon ball out of seven, becareful what you wish for.",
    }),
    Product.create({
      name: 'Compact Web Shooter',
      price: 15,
      quantity: 100,
      imgUrl: 'https://i.pinimg.com/564x/07/49/77/074977054d817666ee26d5518ec320b3.jpg',
      description: 'Shoot webs and swing around like your favorite web head!',
    }),
    Product.create({
      name: 'Nichirin Sword',
      price: 500,
      quantity: 20,
      imgUrl: 'https://gbf.wiki/images/thumb/2/20/Weapon_b_1040912700.png/462px-Weapon_b_1040912700.png',
      description: 'Planning on hunting some demons? Make sure you pick up one of these!',
    }),
    Product.create({
      name: 'Lokakaka Fruit',
      price: 1000,
      quantity: 100,
      imgUrl: 'https://progameguides.com/wp-content/uploads/2021/09/Rokakaka-fruit-Roblox-Project-Star.png?resize=500%2C500',
      description: 'Eat this to heal serious wounds in exchange for losing something of equal value.',
    }),
    Product.create({
      name: 'Devil Fruit',
      price: 50000,
      quantity: 10,
      imgUrl: 'https://ih1.redbubble.net/image.1148097706.8075/st,small,507x507-pad,600x600,f8f8f8.jpg',
      description: 'Eat this and gain power beyond belief.',
    }),
    Product.create({
      name: 'Stand Arrow',
      price: 50000,
      quantity: 1,
      imgUrl: 'https://staticdelivery.nexusmods.com/mods/3174/images/thumbnails/85/85-1585932190-669867691.png',
      description: 'Pierce yourself with this arrow and you will be gifted a stand.',
    }),
    Product.create({
      name: 'Paladins Necklace',
      price: 10000,
      quantity: 1,
      imgUrl: 'https://i.redd.it/57poc8ghf3m71.png',
      description: 'Protects the user from offensive spells.',
    }),
    Product.create({
      name: 'Captain America Shield',
      price: 100000,
      quantity: 1,
      imgUrl: 'https://static.wixstatic.com/media/07f052_889c8636f7bf4b5d8f1d22af1f58d259~mv2.jpg/v1/fill/w_2500,h_2027,al_c/07f052_889c8636f7bf4b5d8f1d22af1f58d259~mv2.jpg',
      description: 'The shield of a well renouned super soildier.',
    }),
    Product.create({
      name: 'Pokeball',
      price: 100,
      quantity: 1000,
      imgUrl: 'https://ssb.wiki.gallery/images/7/7b/Pok%C3%A9_Ball_Origin.png',
      description: 'A basic Pokeball',
    }),
    Product.create({
      name: 'Great Ball',
      price: 200,
      quantity: 1000,
      imgUrl: 'https://cdn.shopify.com/s/files/1/0253/3294/0882/products/GreatBall1.png?v=1666201398',
      description: 'A Great Pokeball, has 1.5x catch rate of a normal Pokeball.',
    }),
    Product.create({
      name: 'Ultra Ball',
      price: 350,
      quantity: 100,
      imgUrl: 'https://cdn.shopify.com/s/files/1/0253/3294/0882/products/UltraBall1.png?v=1666201529',
      description: 'A Ultra Pokeball, has 2x the catch rate of a normal Pokeball.',
    }),
    Product.create({
      name: 'Master Ball',
      price: 10000,
      quantity: 1,
      imgUrl: 'https://playerverse.com/wp-content/uploads/2021/03/master_ball_pokemon_sword_and_shield_masterball_1577726001_28ef8f31.png',
      description: 'The Master Pokeball, catches with 100% gaurentee.',
    }),
    // Product.create({
    //   name: '',
    //   price: ,
    //   quantity: ,
    //   imgUrl: '',
    //   description: '',
    // }),
  ]);
  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cman",
      email: "cody.john@gmail.com",
      firstName: "cody",
      lastName: "johnny",
      password: "123",
      isAdmin: true,
    }),
    User.create({
      username: "mman",
      email: "murphy.sin@gmail.com",
      firstName: "murphy",
      lastName: "sin",
      password: "123",
    }),
    User.create({
      username: "Son-Goku",
      email: "Bestf4ghter@yahoo.com",
      firstName: "Kakarot",
      lastName: "Sayian",
      password: "ChiChi123",
    }),
    User.create({
      username: "PirateKing",
      email: "Pir4teK1ng@hotmail.com",
      firstName: "Monkey",
      lastName: "Luffy",
      password: "ThousandSunny",
    }),
    // User.create({
    //   username: "",
    //   email: "",
    //   firstName: "",
    //   lastName: "",
    //   password: "",
    // }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${product.length} products`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      goku: users[2],
      luffy: users[3],
    },
    product: {
      dragonBall5: product[0],
      webShooter: product[1],
      nichirinSword: product[2],
      lokakakaFruit: product[3],
      devilFruit: product[4],
      standArrow: product[5],
      palNecklace: product[6],
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
