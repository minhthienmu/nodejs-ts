import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

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

const getCountryInfo = (req: Request, res: Response, next: NextFunction) => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: "https://restcountries.eu/rest/v2/name/vietnam",
  };

  axios(config)
    .then(function (response: AxiosResponse) {
      return res.status(200).json({
        code: "200",
        message: "Sucess",
        data: response.data,
      });
    })
    .catch(function (error) {
      return res.status(500);
    });
};

export default { sampleHealthCheck, getCountryInfo };
