import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";

const NAMESPACE = "Sample Controller";

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Sample helth check route called");

  return res.status(200).json({
    code: "200",
    message: "Sucess",
    data: [
      {
        id: 1,
        name: "Thien",
      },
      {
        id: 2,
        name: "Tran",
      },
    ],
  });
};

export default { sampleHealthCheck };
