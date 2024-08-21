import Joi from "joi";
import bcrypt from "bcrypt";
import Models from "../models/models.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { resolveSoa } from "dns";
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
    let addStatus = await Models.saveUser(email, userName, hashPass);
    if (addStatus) {
      return res.json({
        success: true,
        body: { id: addStatus[0].insertId },
        message: "save user successfuly",
      });
    }
  }
  // static async login(req, res) {
  //   const { email, pass } = req.body;
  //   const schema = Joi.object({
  //     email: Joi.string().email().required(),
  //     pass: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  //   });
  //   const { error } = schema.validate({
  //     email,
  //     pass,
  //   });
  //   if (error) {
  //     return res.status(400).json({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  //   try {
  //     const user = await Models.getUser(email);
  //     if (user.success) {
  //       const truthPass = await bcrypt.compare(pass, user.body[0].password);
  //       if (truthPass) {
  //         try {
  //           const token = await Models.getToken(user.body[0].id);
  //           res.cookie("token", token);
  //           res.json({
  //             success: true,
  //             body: {
  //               token,
  //               userName: user.body[0].userName,
  //             },
  //             message: "login true",
  //           });
  //         } catch (error) {
  //           return res.status(400).json({
  //             success: false,
  //             message: error.message,
  //           });
  //         }
  //       } else {
  //         return res.status(400).json({
  //           success: false,
  //           message: "userName or password is incorrect",
  //         });
  //       }
  //     } else {
  //       return res.status(404).json({
  //         success: false,
  //         message: "userName or password is incorrect",
  //       });
  //     }
  //   } catch (error) {
  //     return res.status(400).json({ success: false, message: error.message });
  //   }
  // }

  // static async auth(req, res, next) {
  //   const authToken = req.cookies.token;
  //   console.log(authToken);
  //   if (authToken) {
  //     const token = authToken.split(" ")[1];
  //     jwt.verify(token, TJTJ, (err, user) => {
  //       console.log(user);
  //       if (err) {
  //         return res
  //           .status(403)
  //           .json({ success: false, message: "Authentication failed" });
  //       } else {
  //         req.user = user;
  //         next();
  //       }
  //     });
  //   } else {
  //     return res
  //       .status(401)
  //       .json({ success: false, message: "No token provided" });
  //   }
  // }

  static async login(req, res) {
    const { email, pass } = req.body;

    // اعتبارسنجی ورودی‌ها
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
      const token = await Models.getToken(user.body[0].id);

      return res.json({
        success: true,
        body: {
          token,
          userName: user.body[0].userName,
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
    console.log(req.headers.token);
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
}
