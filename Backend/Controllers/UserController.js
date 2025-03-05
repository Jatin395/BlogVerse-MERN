const User = require('../modules/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all inputs" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Fields Required" });
  }

  const getuser = await User.findOne({ email });
  if (getuser) {
    let ismatch;
    ismatch = await bcrypt.compare(password, getuser.password);
    if (ismatch) {
      const token = jwt.sign({ _id: getuser.id, email: getuser.email }, process.env.JET_KEY);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 36000000
      });
      return res.status(200).json({ data: token });
    } else {
      return res.status(400).json({ message: "User not Found" });
    }
  } else {
    return res.status(400).json({ message: "User not Found" });
  }
};

exports.getinfo = async (req, res) => {

  const id = req.user._id;

  const userInfo = await User.findOne({ _id: id });

  if (!userInfo) {
    return res.status(400).json({ message: "User Not Found" });
  }
  return res.status(200).json({ data: userInfo });
};

exports.logout = async (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: "User Loggout succesfully" });
}