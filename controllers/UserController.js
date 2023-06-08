import UserModel from '../DB/models/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import Task from '../DB/models/Task.js';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userDocument = new UserModel({
      login: req.body.login,
      password: passwordHash,
      role: 'user',
    });

    const user = await userDocument.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "tskmngrevgvakh",
      {
        expiresIn: "30d",
      }
    );

    res.send({
      user,
      token,
    });
  } catch (err) {
    res.json({
      error: err,
      message: "Register failed",
    });
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  try {
    const user = await UserModel.findOne({
      login: req.body.login,
    });
    if (!user) {
      return res.status(404).send("Wrong user data");
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.password
    );
    if (!isValidPassword) {
      return res.status(404).send("Wrong user data");
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "tskmngrevgvakh",
      {
        expiresIn: "30d",
      }
    );

    res.send({
      user,
      token,
    });
  } catch (err) {
    res.json({
      error: err,
      message: "Auth failed",
    });
  }
};

export const getMyInfos = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.send("No access");
    }
    res.send(user);
  } catch (err) {
    res.json(err);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, 'login role');
    if (!users) {
      return res.send("Bad request");
    }
    res.send(users);
  } catch (err) {
    res.json(err);
  }
}

export const deleteUserAndTasks = async (req, res) => {
  try {
    const result = await UserModel.deleteOne({ login: req.params.user });
    console.log(result);
    if (result) { 
      const tasks = await Task.deleteMany({user: req.params.user});
      if(tasks) {
        res.send(tasks);
      }
      
    } else {
      res.send({ message: 'Could not delete task' })
    }
  } catch (error) {
    res.send(error);
  }
}