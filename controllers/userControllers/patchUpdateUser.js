const User = require("../../models/user");

const patchUpdateUser = async (req, res) => {
  try {
    const { firstname, lastname, phone } = req.body;

    const updateFields = {};

    if (firstname) updateFields.firstname = firstname;

    if (lastname) updateFields.lastname = lastname;

    if (phone) updateFields.phone = phone;

    if (Object.keys(updateFields).length === 0)
      return res.status(400).json({ message: "No fields to update" });

    const user = await User.findOneAndUpdate({ email: req.user.email }, updateFields, { new: true });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = patchUpdateUser;
