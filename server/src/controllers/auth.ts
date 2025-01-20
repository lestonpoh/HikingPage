import { Request, Response } from "express";
import { db } from "../connect";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const validateRegister = [
  body("username").notEmpty(),
  body("email").notEmpty().withMessage("Email cannot be empty").isEmail(),
  body("password").notEmpty().withMessage("Password cannot be empty"),
];

export const register = [
  ...validateRegister,
  (req: Request, res: Response) => {
    // validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // check if username exists
    const q = "SELECT * FROM user WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exist!");
      // hashPassword
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      const q = "INSERT INTO users (`username`,`email`,`password`) VALUE (?)";
      const reqValues = [req.body.username, req.body.email, hashedPassword];
      db.query(q, reqValues, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
    });
  },
];

const validateLogin = [
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
];

export const login = [
  ...validateLogin,
  (req: Request, res: Response) => {
    // validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // check if user exist
    const q = "SELECT * FROM user WHERE email = ?";
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");

      const checkPassword = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );

      if (!checkPassword) return res.status(400).json("Wrong password!");

      const token = jwt.sign(
        { id: data[0].id },
        process.env.JWT_SECRET as string
      );

      const { password, ...others } = data[0];

      res
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json(others);
    });
  },
];

export const logout = (req: Request, res: Response) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out");
};
