import conn from "./connection.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
const { TJTJ } = process.env;
export default class Models {
  static async getUser(email, userName) {
    let query = "SELECT * FROM users WHERE email = ? ";
    try {
      let [user] = await conn.query(query, [email]);
      if (user.length > 0) {
        return { success: true, body: user };
      } else {
        if (userName) {
          query = "SELECT * FROM users WHERE userName = ? ";
          try {
            [user] = await conn.query(query, [userName]);
            if (user.length > 0) {
              return { success: true, body: user };
            } else {
              return { success: false };
            }
          } catch (error) {
            return { success: false };
          }
        } else {
          return { success: false };
        }
      }
    } catch (error) {
      return { success: false };
    }
  }
  static async saveUser(email, userName, pass) {
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
    const token = jwt.sign({ userId }, TJTJ, { expiresIn: "1h" });
    return token;
  }

}
