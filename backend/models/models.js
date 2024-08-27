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
    let query = `INSERT INTO users(email , userName , password) VALUES(? , ? ,?);`;
    let result = {};
    let addStatus;
    try {
      addStatus = await conn.query(query, [email, userName, pass]);

      if (addStatus[0].insertId > 0) {
        result.userId = addStatus[0].insertId;
        result.usersDb = true;
        query = `INSERT INTO user(userId) VALUES(?);`;
        try {
          addStatus = await conn.query(query, [result.userId]);
          if (addStatus[0].insertId > 0) {
            result.userDB = true;
            try {
              query = `INSERT INTO posts(userId) VALUES(?);`;
              addStatus = await conn.query(query, [result.userId]);

              if (addStatus[0].insertId > 0) {
                result.postsDb = true;
                return { success: true, result };
              } else {
                return { success: false, message: "can not add in userDB" };
              }
            } catch (error) {
              return { sucess: false, message: error.message + "posts" };
            }
          } else {
            return { success: false, message: "can not add in userDB" };
          }
        } catch (error) {
          return { sucess: false, message: error.message + "user" };
        }
      } else {
        return { success: false, message: "can not add in usersDB" };
      }
    } catch (error) {
      return { sucess: false, message: error.message + "users" };
    }
  }
  static async getToken(userId) {
    const token = jwt.sign({ userId }, TJTJ, {
      noTimestamp: true,
      expiresIn: "1d",
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
  static async getPosts(userId, postId) {
    if (userId != null) {
      const query = "SELECT * FROM posts WHERE userId = ? ;";
      try {
        const [posts] = await conn.query(query, [userId]);
        return posts;
      } catch (error) {
        return error;
      }
    } else if (postId !== null) {
      const query = "SELECT * FROM posts WHERE postId = ? ;";
      try {
        const [post] = await conn.query(query, [postId]);
        return post;
      } catch (error) {
        return error;
      }
    } else {
      try {
        const query = "SELECT * FROM posts ;";
        try {
          const [posts] = await conn.query(query);
          return posts;
        } catch (error) {
          return error;
        }
      } catch (error) {
        return error;
      }
    }
  }
  static async deletePost(postid) {
    const query = "DELETE FROM posts WHERE postId= ?";
    try {
      const response = await conn.query(query, [postid]);
      return response;
    } catch (error) {
      return error;
    }
  }
  static async addPost(userId, title, text, postImage, postId) {
    if (postId === undefined) {
      const query =
        "INSERT INTO posts(userId , title , text , postImage ) Values(? , ? , ? ,?);";
      try {
        const result = await conn.query(query, [
          userId,
          title,
          text,
          postImage,
        ]);
        return result;
      } catch (error) {
        return error;
      }
    } else {
      const query =
        "UPDATE posts SET userId = ?,title = ?  ,text= ? , postImage = ? WHERE postID = ?;";
      try {
        const result = await conn.query(query, [
          userId,
          title,
          text,
          postImage,
          postId,
        ]);
        return result;
      } catch (error) {
        return error;
      }
    }
  }
  static async getUserName(postId) {
    try {
      let query = `SELECT userId FROM posts WHERE postId = ?;  `;
      const [[{ userId }]] = await conn.query(query, [postId]);

      try {
        query = "SELECT userName FROM users WHERE userId = ? ;";
        const [[{ userName }]] = await conn.query(query, [userId]);
        return userName;
      } catch (error) {
        return error;
      }
      return userId;
    } catch (error) {
      return error;
    }
  }
}
