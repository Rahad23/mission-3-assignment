import express, { Request, Response } from "express";

import errorHandler from "./middlewares/globalErrorHandaler";
import { Server } from "http";
import notFound from "./middlewares/notFounds";
import router from "./router";
const app = express();
app.use(express.json());
//product router

app.use("/api", router);

let server: Server;
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "mission-3-assignment. sever running" });
});

//global error handler
app.use(errorHandler);
//global route not found error
app.use(notFound);

export default app;

process.on("UnhandledRejection", () => {
  console.log("😈 UnhandledRejection shuting down....");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("😈 uncaughtException shuting down....");
  process.exit(1);
});
