const router = require('express').Router()
const Users = require('../db/models/User.js')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// POST /api/users
router.post('/', async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const newUser = await User.create({ username, email });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const updatedUser = await User.findByPk(id);
    
    if (!updatedUser) {
      return res.sendStatus(404);
    }
    
    updatedUser.username = username;
    updatedUser.email = email;
    
    await updatedUser.save();
    
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByPk(id);
    
    if (!deletedUser) {
      return res.sendStatus(404);
    }
    
    await deletedUser.destroy();
    
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;