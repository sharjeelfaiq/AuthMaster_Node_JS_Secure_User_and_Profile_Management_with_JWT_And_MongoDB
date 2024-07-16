import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const updateUserById = async (req, res) => {
  try {
    const user = await updateUser(req.params.userId, req.body);
    res.send({ message: "User updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const user = await deleteUser(req.params.userId);
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
