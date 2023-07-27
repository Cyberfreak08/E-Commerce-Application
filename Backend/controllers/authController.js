const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_TOKEN } = process.env;

module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      name,
      email,
      password: hash,
    });

    const accessToken = jwt.sign({ id: createdUser.id }, JWT_TOKEN, {
      expiresIn: 3600,
    });

    res.json({
      accessToken,
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please enter all fields!" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User does not exist please sign up!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials check email and password!" });

    const accessToken = jwt.sign({ id: user.id }, JWT_TOKEN, { expiresIn: 3600 });

    res.json({
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.get_user = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};
