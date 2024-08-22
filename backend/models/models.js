import conn from "./connection.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
const { TJTJ } = process.env;
export default class Models {
  static async getUser(email, userName, userId) {
    let query;

    if (email !== null) {
      query = "SELECT * FROM users WHERE email = ? ";
      try {
        let [user] = await conn.query(query, [email]);
        if (user.length > 0) {
          return { success: true, body: user };
        } else {
          return { success: false, message: "email not found" };
        }
      } catch (error) {
        return { success: false, message: "email not found" };
      }
    } else if (userName !== null) {
      query = "SELECT * FROM users WHERE userName = ? ";
      try {
        let [user] = await conn.query(query, [userName]);
        if (user.length > 0) {
          return { success: true, body: user };
        } else {
          return { success: false, message: "userName not found" };
        }
      } catch (error) {
        return { success: false, message: "userName not found" };
      }
    } else if (userId !== null) {
      query = `SELECT users.userId As userId , users.email As email ,  users.userName As userName ,
user.userAbout As about ,  user.category As category , user.profile As profile  FROM 
users INNER JOIN user ON users.userId = ? AND user.userId= ?;`;
      try {
        let [user] = await conn.query(query, [userId, userId]);
        if (user.length > 0) {
          return { success: true, body: user };
        } else {
          return { success: false, message: "id is not found" };
        }
      } catch (error) {
        return { success: false, message: error.message };
      }
    }
  }
  static async addUser(email, userName, pass) {
    const query =
      "INSERT INTO users(email , userName , password) VALUES(? , ? ,?)";
    let addStatus;
    try {
      addStatus = await conn.query(query, [email, userName, pass]);
      return addStatus;
    } catch (error) {
      return error.message;
    }
  }
  static async getToken(userId) {
    const token = jwt.sign({ userId }, TJTJ, {
      noTimestamp: true,
      expiresIn: "1h",
    });
    return token;
  }
  static async updateUser(myObject) {
    const { userName, password, email, about, category, profile, userId } =
      myObject;
    let query = "";
    let userFlag = false;
    let usersFlag = false;
    let usersQuery = "";
    let userQuery = "";
    let resualt = { user: null, users: null };
    if (userName) {
      usersQuery += `userName = '${userName}',`;
      usersFlag = true;
    }
    if (password) {
      usersFlag = true;
      usersQuery += `password = '${password}',`;
    }
    if (email) {
      usersFlag = true;
      usersQuery += `email = '${email}',`;
    }
    if (about) {
      userFlag = true;
      userQuery += ` userAbout = '${about}',`;
    }
    if (category) {
      userFlag = true;
      userQuery += ` category = '${category}',`;
    }
    if (profile) {
      userFlag = true;
      userQuery += ` profile = '${profile}',`;
    }
    userQuery = userQuery.trim().split(",");
    userQuery.splice(userQuery.length - 1, 1);
    userQuery = userQuery.join(",");
    usersQuery = usersQuery.trim().split(",");
    usersQuery.splice(usersQuery.length - 1, 1);
    usersQuery = usersQuery.join(",");
    if (userFlag) {
      query = `UPDATE user SET ${userQuery}  WHERE userId = ${userId}`;
      try {
        const [response] = await conn.query(query);
        if (response.affectedRows !== 0) {
          resualt = { ...resualt, user: true };
        }
      } catch (error) {
        return error;
      }
    }

    if (usersFlag) {
      query = `UPDATE users SET ${usersQuery}  WHERE userId = ${userId}`;
      try {
        const response = await conn.query(query);
        if (response.affectedRows !== 0) {
          resualt = { ...resualt, users: true };
        }
      } catch (error) {
        return error;
      }
    }
    return resualt;
  }
  static async deleteUser(userId) {
    let query = "DELETE FROM users WHERE userId= ?";
    try {
      try {
        const response = await conn.query(query, [userId]);
        return response;
      } catch (error) {
        return error;
      }
    } catch (error) {
      return error;
    }
  }
}
