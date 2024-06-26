const User = require("../model/User");
const bcrypt = require("bcryptjs");

const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No User Found" });
  }
  return res.status(200).json({ users });
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User is already exist" });
  }
  const hashPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res
    .status(201)
    .json({ message: "User is Successfully Created", user });
};
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User is not exist" });
  }
  const isPasswordCorrecty = bcrypt.compareSync(
    password,
    existingUser.password
  );
  if (!isPasswordCorrecty) {
    return res.status(400).json({ message: "Incorrect Passowrd" });
  }
  return res.status(200).json({ message: "Login Successfull" });
};

module.exports = {
  loginUser,
  signup,
  getAllUser,
};
