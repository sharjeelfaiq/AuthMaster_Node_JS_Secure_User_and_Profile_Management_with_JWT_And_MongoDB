import User from "../models/user.model.js";

export const getUsers = async () => {
  try {
    const users = await User.find();
    if (!users.length) throw new Error("No users found");
    return users;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error(`User with ID ${userId} does not exist`);
    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user with ID ${userId}: ${error.message}`);
  }
};

export const updateUser = async (userId, updateData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) throw new Error(`User with ID ${userId} does not exist`);
    return updatedUser;
  } catch (error) {
    throw new Error(`Failed to update user with ID ${userId}: ${error.message}`);
  }
};

export const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) throw new Error(`User with ID ${userId} does not exist`);
    return deletedUser;
  } catch (error) {
    throw new Error(`Failed to delete user with ID ${userId}: ${error.message}`);
  }
};
