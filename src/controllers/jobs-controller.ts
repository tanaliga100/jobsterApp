import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import { asyncMiddleware } from "../middlewares/async-middleware";
import Job from "../models/job-model";

const GET_JOBS = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    const { search, status, jobType, sort } = req.query;

    const {
      user: { userId },
    } = req;
    // GET THE JOBS ASSOCIATED WITH CURRENT USER;
    let queryObject: any = {
      createdBy: userId,
    };
    // SEARCH MECHANISMS
    if (search != undefined && search != "") {
      queryObject = {
        $or: [
          { createdBy: userId, company: { $regex: search, $options: "i" } },
          { createdBy: userId, position: { $regex: search, $options: "i" } },
        ],
      };
    }
    if (status && status !== "all") {
      queryObject.status = status;
    }
    if (jobType && jobType !== "all") {
      queryObject.jobType = jobType;
    }
    let result = Job.find(queryObject);

    // SORT
    if (sort === "latest") {
      result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
      result = result.sort("createdAt");
    }
    if (sort === "a-z") {
      result = result.sort("position");
    }
    if (sort === "z-a") {
      result = result.sort("-position");
    }
    //  PAGINATION
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    if (!result) {
      throw new NotFoundError(`WE CANNOT FIND WHAT YOU ARE LOOKING FOR `);
    }

    const jobs = await result;

    res
      .status(StatusCodes.OK)
      .json({ msg: "ALL_JOBS", jobs, totalJobs, numOfPages });
  }
);

const GET_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;
    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    if (!job) {
      throw new NotFoundError("NO JOB ASSOCIATED WITH ID :" + jobId);
    }
    res.status(StatusCodes.OK).json({ msg: "SINGLE_JOB ", job });
  }
);

const CREATE_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: "JOB_CREATED", job });
  }
);

const UPDATE_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    const {
      user: { userId },
      params: { id: jobId },
      body: { company, position },
    } = req;
    if (company === "" || position === "") {
      throw new BadRequestError("Company or Position must be specified");
    }
    const job = await Job.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!job) {
      throw new NotFoundError("NO JOB ASSOCIATED WITH ID :" + jobId);
    }
    res.status(StatusCodes.OK).json({ msg: "UPDATED_JOB ", job });
  }
);

const DELETE_JOB = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;
    const job = await Job.findOneAndDelete({
      _id: jobId,
      createdBy: userId,
    });
    if (!job) {
      throw new NotFoundError(`JOB WITH THIS ID : ${jobId} DOESNT EXIST`);
    }
    const updated = await Job.find({ createdBy: req.user.userId }).sort(
      "createdBy"
    );
    res.status(StatusCodes.OK).send({ msg: "JOB_DELETED", updated });
  }
);
export { CREATE_JOB, DELETE_JOB, GET_JOB, GET_JOBS, UPDATE_JOB };
