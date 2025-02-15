import { pool } from "../config/database.js";

export const insertUser = async (firstName, lastName, email, password) => {
  await pool.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, email, password]
  );
};

export const getUserByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

export const getUserById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

export const getMemberByUserId = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM members WHERE user_id = $1",
    [id]
  );
  return rows[0];
};

export const insertMember = async (userId) => {
  await pool.query("INSERT INTO MEMBERS (user_id) VALUES ($1)", [userId]);
};

export const updateMemberToAdmin = async (userId) => {
  await pool.query("UPDATE members SET admin = $1 WHERE user_id = $2", [
    true,
    userId,
  ]);
};

export const insertPost = async (userId, title, message) => {
  await pool.query(
    "INSERT INTO posts (user_id, title, message) VALUES ($1, $2, $3)",
    [userId, title, message]
  );
};

export const getAllPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

export const deletePost = async (postId) => {
  await pool.query("DELETE FROM posts WHERE id = $1", [postId]);
};
