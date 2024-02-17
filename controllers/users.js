const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all users
const getAll = async (req, res, next) => {
  mongodb.getDb().db().collection('users').find().toArray((lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// Get by ID
const getSingle = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to find a user.');
  }
  const idString = req.params.id;
  console.log('Received id parameter:', idString);

  try {
    const userId = new ObjectId(idString);
    console.log('Converted ObjectId:', userId);

    const result = await mongodb
      .getDb()
      .db()
      .collection('users')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    console.error('Error converting ObjectId:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create new user
const createUser = async (req, res, next) => {
  try {
    // Extract user data from the request body
    const { username, email, password, profile } = req.body;

    // Insert the new user into the MongoDB collection
    const result = await mongodb.getDb().db().collection('users').insertOne({
      username,
      email,
      password,
      profile: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        age: profile.age,
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
        goals: profile.goals
      }
    });

    // Send a success response
    res
      .status(201)
      .json({
        message: 'User created successfully',
        userId: result.insertedId,
      });
  } catch (error) {
    // Handle any errors
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

// Update user info
const updateUser = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to update a user.');
  }
  const userId = new ObjectId(req.params.id);
  const newUserData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    profile: {
      firstName: req.body.profile.firstName,
      lastName: req.body.profile.lastName,
      age: req.body.profile.age,
      gender: req.body.profile.gender,
      height: req.body.profile.height,
      weight: req.body.profile.weight,
      goals: req.body.profile.goals
    }
  };

  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('users')
      .replaceOne({ _id: userId }, newUserData);

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'User replaced successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error replacing user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete User
const deleteUser = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to update a user.');
  }
  try {
    const userId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db()
      .collection('users')
      .deleteOne({ _id: userId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
