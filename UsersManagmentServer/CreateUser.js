const Users = require('./models/Users');

async function createUser(username, password, email) {
  try {
    const user = new Users({
      username: username,
      password: password,
      email: email
    });

    const savedUser = await user.save();
    console.log('User created successfully:', savedUser);
    return savedUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

function createUserRoute(app) {
  app.post('/users', async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const user = await createUser(username, password, email);
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
}

module.exports = { createUser, createUserRoute };