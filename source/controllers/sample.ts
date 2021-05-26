import { Request, Response, NextFunction } from "express";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
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
  const name = req.query.name;
  const config: AxiosRequestConfig = {
    method: "get",
    url: "https://restcountries.eu/rest/v2/name/" + name,
  };

  axios(config)
    .then(function (response: AxiosResponse) {
      return res.status(200).json({
        code: "200",
        message: "Sucess",
        data: response.data,
      });
    })
    .catch(function (error: Error) {
      console.log(error.message);
      return res.status(500).json({
        code: "500",
        message: "Not Found",
      });
    });
};

export default { sampleHealthCheck, getCountryInfo };
