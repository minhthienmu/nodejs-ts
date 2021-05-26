import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const access_token_secret =
  "c7ee923a448307b4d03f86721244f7f7439de25b68f47d59121a05d004495eb48ee5bacf89fd881157bbdc06d7db57dbb2066b0ab059c679969bc843205fb6df";

const data = [{ name: "Thien", age: 23 }];

const login = (req: Request, res: Response) => {
  //Authenticate user

  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET || access_token_secret
  );
  res.json({ accessToken: accessToken });
};

const getData = (req: Request, res: Response) => {
  return res.status(200).json({
    code: "200",
    message: "Sucess",
    data: data,
  });
};

const checkLogin = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[0];

  if (token == null) return res.sendStatus(401);
  console.log(token);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET || access_token_secret,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
};

export default { login, getData, checkLogin };
