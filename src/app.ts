import cors from "cors";
import dotenv from "dotenv";
import { Express, Request, Response, default as express } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { connectDB } from "./config/connectDB";
import authenticationMiddleware from "./middlewares/authentication-middleware";
import { errorHandlerMidlleware } from "./middlewares/errorHandler-middleware";
import { notFoundMiddleware } from "./middlewares/notFound-middleware";
import { AuthRoute } from "./routes/auth-route";
import { JobsRoute } from "./routes/jobs-route";
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(morgan("dev"));

// SECURITY PACKAGES
app.use(helmet());
app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.set("trust proxy", 1);
const swaggerDocs = require("../openapi.json");

// ROUTES
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/jobs", authenticationMiddleware, JobsRoute);
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
// 404 MIDDLEWARE
app.use(notFoundMiddleware);
// ERROR MIDDLEWARE
app.use(errorHandlerMidlleware);

const start = async () => {
  const port = process.env.PORT || 5001;
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server alive: ${port} : DB ESTABLISHED`);
    });
  } catch (error) {
    console.log("Something went wrong");
  }
};

start();
