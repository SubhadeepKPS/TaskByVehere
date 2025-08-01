const db = require("../config/dbpool.cjs");

const UserModel = {
  async createUser(userData) {
    const { name, email, password, profileUrl, role } = userData;
    const [user] = await db.query(
      "INSERT INTO users (name, email, password, profileUrl, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, profileUrl, role]
    );
    return userData;
  },

  async getAllUsers() {
    const [users] = await db.query("SELECT * FROM users");
    return users;
  },

  async updateUser(id, userData) {
    const [updatedUser] = await db.query("UPDATE users SET ? WHERE id = ?", [
      userData,
      id,
    ]);
    return updatedUser;
  },

  async deleteUser(id) {
    const [deletedUser] = await db.query("DELETE FROM users WHERE id = ?", [
      id,
    ]);
    return deletedUser;
  },
};

module.exports = UserModel;
