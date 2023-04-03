import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UnAuthenticatedError } from "../errors";
import BadRequestError from "../errors/BadRequestError";
import { asyncMiddleware } from "../middlewares/async-middleware";
import User from "../models/user-model";

const REGISTER = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    console.log("REQ_USER", req.user);
    console.log("REQ_BODY", req.body);
    const { name, email, password } = req.body;
    // PASSWORD HASHED IN MODEL SCHEMA
    const user = await User.create({ ...req.body });
    // TOKEN GENERATED IN MODEL SCHEMA
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      msg: "USER_REGISTERED",
      user: {
        name: user.name,
        lastName: user.lastName,
        location: user.location,
        email: user.email,
        token,
      },
    });
  }
);

const LOGIN = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    console.log("REQ_USER", req.user);
    console.log("REQ_BODY", req.body);
    const { email, password } = req.body;
    // CHECK REQUEST BODY
    if (!email || !password) {
      throw new BadRequestError("Please provide all values");
    }
    // FIND EXISTING EMAIL
    const user = await User.findOne({ email });
    // IF NOT FOUND THROW ERROR
    if (!user) {
      throw new UnAuthenticatedError(
        `No user associated with the email: ${email}`
      );
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError(`Password dont match`);
    }
    // RELEASED TOKEN HERE
    const token = user.createJWT();
    // SEND BACK RESPONSE TO THE CLIENT
    res.status(StatusCodes.OK).json({
      msg: "USER_LOGIN",
      user: {
        name: user.name,
        lastName: user.lastName,
        location: user.location,
        email: user.email,
        token,
      },
    });
  }
);

const UPDATE_USER = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    const { name, email, location, lastName } = req.body;
    if (!email || !lastName || !location || !name) {
      throw new BadRequestError("Please provide all the values");
    }
    const user: any = await User.findOne({ _id: req.user.id });
    user.name = name;
    user.email = email;
    user.location = location;
    user.lastName = lastName;
    await user.save();
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
      msg: "USER_UPDATED",
      user: {
        name: user.name,
        lastName: user.lastName,
        location: user.location,
        email: user.email,
        token,
      },
    });
  }
);
export { LOGIN, REGISTER, UPDATE_USER };
