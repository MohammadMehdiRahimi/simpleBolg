import Joi from "joi";
import bcrypt from "bcrypt";
import Models from "../models/models.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
const { TJTJ } = process.env;
export default class Controller {
  static async register(req, res) {
    const { email, userName, pass, confirmPass } = req.body;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      userName: Joi.string().min(3).max(15).required().alphanum(),
      pass: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
      confirmPass: Joi.valid(Joi.ref("pass")).required(),
    });
    const { error } = schema.validate({
      email,
      userName,
      pass,
      confirmPass,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const existUser = await Models.getUser(email, userName);

    if (existUser.success)
      return res.status(400).json({
        success: false,
        message: "Email or UserName is already exist.",
      });
    const hashPass = await bcrypt.hash(pass, 10);
    let addStatus = await Models.addUser(email, userName, hashPass);
    if (addStatus) {
      const token = await Models.getToken(addStatus[0].insertId);
      return res.json({
        success: true,
        body: { id: addStatus[0].insertId, token },
        message: "save user successfuly",
      });
    }
  }

  static async login(req, res) {
    const { email, pass } = req.body;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      pass: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    });
    const { error } = schema.validate({ email, pass });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    try {
      // بررسی وجود کاربر
      const user = await Models.getUser(email);
      if (!user.success) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // بررسی صحت رمز عبور
      const isPasswordValid = await bcrypt.compare(pass, user.body[0].password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Email or password is incorrect",
        });
      }
      // تولید توکن JWT و ارسال آن در کوکی

      const token = await Models.getToken(user.body[0].userId);
      return res.json({
        success: true,
        body: {
          token,
          userId: user.body[0].id,
        },
        message: "Login successful",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  static async auth(req, res, next) {
    const authToken = req.headers.token;
    if (authToken) {
      jwt.verify(authToken, TJTJ, (err, user) => {
        if (err) {
          return res
            .status(403)
            .json({ success: false, message: "Authentication failed" });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }
  }
  static async getAuth(req, res) {
    const authToken = req.headers.token;
    if (authToken) {
      jwt.verify(authToken, TJTJ, (err, user) => {
        if (err) {
          return res
            .status(403)
            .json({ success: false, message: "Authentication failed" });
        } else {
          req.user = user;
          return res.json({ access: true, body: user });
        }
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }
  }
  static async getDetails(req, res) {
    const { userId } = req.user;

    if (userId) {
      try {
        const user = await Models.getUser(null, null, userId);
        if (user.body[0].profile === "" || user.body[0].profile === null) {
          user.body[0].profile = "global.png";
        }
        return res.json(user);
      } catch (error) {
        return res.json(error);
      }
    } else {
      return res.json({ success: false, message: "Id is undefined" });
    }
  }
  static async updateProfile(req, res) {
    const profileImage = req.file ? req.file.filename : null;
    let myObject = {};
    if (req.body["password"]) {
      req.body["password"] = await bcrypt.hash(req.body["password"], 10);
    }
    for (let element in req.body) {
      if (req.body[element] !== "") {
        myObject[element] = req.body[element];
      }
    }
    if (profileImage) {
      myObject.profile = profileImage;
    }
    try {
      const response = await Models.updateUser(myObject);
      if (response.user || response.users) {
        return res.json({
          success: true,
          message: "Profile Updated",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "profile can not updated",
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  static async deleteAccount(req, res) {
    const { userId } = req.user;
    console.log(userId);
    try {
      const [response] = await Models.deleteUser(userId);
      console.log(response);
      if (response.affectedRows > 0) {
        return res.json({
          success: true,
          message: "Account deleted",
        });
      } else {
        return res.json({
          success: false,
          message: "can not Account deleted",
        });
      }
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }
}
