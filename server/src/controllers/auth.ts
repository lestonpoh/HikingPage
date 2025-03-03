import { Request, Response } from "express";
import { dbConnection } from "../connect";
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
  async (req: Request, res: Response) => {
    // validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const db = await dbConnection;
      // check if username exists
      const getUserQuery = "SELECT * FROM user WHERE username = ? or email = ?";
      const [userData]: any = await db.execute(getUserQuery, [
        req.body.username,
        req.body.email,
      ]);
      if (userData.length) {
        res.status(409).json("User already exist!");
        return;
      }

      // hashPassword
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const insertUserQuery =
        "INSERT INTO user (`username`,`email`,`password`,`isAdmin`) VALUES (?,?,?,?)";
      await db.execute(insertUserQuery, [
        req.body.username,
        req.body.email,
        hashedPassword,
        1,
      ]);
      res.status(200).json("User has been created.");
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  },
];

const validateLogin = [
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
];

export const login = [
  ...validateLogin,
  async (req: Request, res: Response) => {
    // validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const db = await dbConnection;
      // check if user exist
      const getUserQuery = "SELECT * FROM user WHERE email = ?";
      const [userData]: any = await db.execute(getUserQuery, [req.body.email]);

      if (userData.length === 0) {
        res.status(404).json("User not found!");
        return;
      }
      const checkPassword = bcrypt.compareSync(
        req.body.password,
        userData[0].password
      );

      if (!checkPassword) {
        res.status(400).json("Wrong password!");
        return;
      }
      const token = jwt.sign(
        { id: userData[0].id },
        process.env.JWT_SECRET as string
      );

      res
        .cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          path: "/",
          // secure: process.env.NODE_ENV === "production",
          // domain: process.env.FRONTEND_URL,
        })
        .status(200)
        .json({
          username: userData[0].username,
          isAdmin: !!userData[0].isAdmin,
        });
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }
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

export const validateUser = async (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  if (!token) {
    res.status(401).json("Not logged in!");
    return;
  }

  try {
    const db = await dbConnection;
    const userInfo: any = await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    const getUserQuery = "SELECT username, isAdmin FROM user WHERE id = ?";
    const [userData]: any = await db.execute(getUserQuery, [userInfo.id]);

    if (userData.length === 0) {
      res.status(404).json("User not found!");
      return;
    }

    res
      .status(200)
      .json({ username: userData[0].username, isAdmin: !!userData[0].isAdmin });
    return;
  } catch (err: any) {
    if (err.name === "JsonWebTokenError") {
      res.status(403).json("Token not valid");
      return;
    } else {
      res.status(500).json(err);
      return;
    }
  }
};
