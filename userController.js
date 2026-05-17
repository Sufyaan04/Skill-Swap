const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      skillsOffered: user.skillsOffered,
      skillsWanted: user.skillsWanted
    });

  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.name = req.body.name ?? user.name;
    user.profilePic = req.body.profilePic ?? user.profilePic;
    user.skillsOffered = req.body.skillsOffered ?? user.skillsOffered;
    user.skillsWanted = req.body.skillsWanted ?? user.skillsWanted;

    const updatedUser = await user.save();

    return res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      skillsOffered: updatedUser.skillsOffered,
      skillsWanted: updatedUser.skillsWanted
    });

  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


// 🔹 SEARCH USERS BY SKILL
exports.searchUserBySkill = async (req, res) => {
  try {
    const { skill } = req.query;

    if (!skill) {
      return res.status(400).json({ msg: "Skill query is required" });
    }

    const users = await User.find({
      skillsOffered: { $regex: skill, $options: "i" }
    }).select("-password");

    return res.status(200).json(users);

  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};