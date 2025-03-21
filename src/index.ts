import express, { Request, Response, Application, NextFunction } from "express";
import { purwadhikaDB } from "./data-source";
import { PORT as port } from "./config";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import helmet from "helmet";


// import router
import itemRouter from "./routers/item.router";
import purchaserequestRouter from "./routers/purchaserequest.router";
import userRouter from "./routers/user.router";

const PORT = port || 3000;
const app: Application = express();

// use middleware
app.use(helmet());
app.use(express.json());
app.use(morgan("combined", {
  stream: fs.createWriteStream(path.join(__dirname, "access.log")),
})
);


// error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });  
});


app.use("/items", itemRouter);
app.use("/purchase-requests", purchaserequestRouter);
app.use("/users", userRouter);

// start server and connect to database
purwadhikaDB.initialize()
.then(() => {
  console.log("Database connected!");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error(err);
});

