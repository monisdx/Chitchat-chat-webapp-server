import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existinguser = await User.findOne({ email });

    if (!existinguser)
      return res.status(404).json({ message: "user doesn't exit" });

    const ispasswordcorrect = await bcrypt.compare(
      password,
      existinguser.password
    );

    if (!ispasswordcorrect)
      return res.status(400).json({ message: "invalid credensials" });

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmpassword, name } = req.body;

  try {
    const existinguser = await User.findOne({ email });

    if (existinguser)
      return res.status(400).json({ message: "user already exit" });

    if (password !== confirmpassword)
      return res.status(400).json({ message: "password doesn't matched" });

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashPassword, name });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

export const getUsersBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const search = new RegExp(searchQuery, "i");
    // console.log(req.userId);
    // const users = await User.find({ {_id: { $ne: req.userId } } ,$or: [{name: search},{email: search}]});
    // const users = await User.find({_id: req.userId});
    const users = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        { $or: [{ name: search }, { email: search }] },
      ],
    });
   
    // console.log(users);

    res.json({ data: users });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// get users to whom alreay chatted/chatroom exists
// search for users using username/name
