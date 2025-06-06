const StudentUser = require("../../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await StudentUser.findOne({ email });

    // If user doesn't exist, create superuser
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new StudentUser({
        first_name: "Admin",
        email,
        password: hashedPassword,
        role: "superuser",
        number: "0000000000",
      });

      await user.save();
      console.log("Superuser created.");
    }

    // Validate credentials
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || user.role !== "superuser") {
      return res.status(400).json({ msg: 'Credentials Not Matched!' });
    }

    // Generate token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    user.token = token;
    await user.save();

    return res.json({ token });
  } catch (error) {
    console.error("superuser.login.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

module.exports = Login;
