import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs';
/* ################# Register user #####################  */
const registerUser = async (req, res) => {
  // grab data
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "all field are requierd" });
  }

  // regarder si l'email existe deja
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ error: "Email existe déja" });
  }

  // hash password
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ email, password : hashed });
    res.status(200).json({ email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ################# Login user #####################  */

const loginUser = async (req, res) => {
  res.send("Login");
};

export { registerUser, loginUser };
