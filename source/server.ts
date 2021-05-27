import http from "http";
import bodyParser from "body-parser";
import express from "express";
import logging from "./config/logging";
import config from "./config/config";
import sampleRoutes from "./routes/sample";
import apiRoutes from "./routes/api";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

//const API_SERVICE_URL = "https://jsonplaceholder.typicode.com/";
const API_SERVICE_URL = "http://[::1]:8008";
const NAMESPACE = "Server";
const router = express();

/** Log the request */
// router.use((req, res, next) => {
//   /** Log the req */
//   logging.info(
//     NAMESPACE,
//     `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
//   );
//   res.on("finish", () => {
//     /** Log the res */
//     logging.info(
//       NAMESPACE,
//       `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
//     );
//   });

//   next();
// });

router.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

/** Routes go here */
router.use("/api", apiRoutes);
router.use("/sample", sampleRoutes);

const options = {
  target: API_SERVICE_URL,
  changeOrigin: false,
  secure: false,
  pathRewrite: {
    [`^/proxy`]: "",
  },
};
router.use("/proxy/*", createProxyMiddleware(options));

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(router);

// httpServer.listen(config.server.port, () =>
//   logging.info(
//     NAMESPACE,
//     `Server is running ${config.server.hostname}:${config.server.port}`
//   )
// );

httpServer.listen(config.server.port);
