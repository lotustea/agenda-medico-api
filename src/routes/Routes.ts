import * as express from "express";
import expressSwaggerGenerator from "express-swagger-generator";

const Routes = express.Router();


const expressSwagger = expressSwaggerGenerator(Routes);
const options = {
  swaggerDefinition: {
    info: {
      description: "API - Agenda Medico",
      title: "Swagger",
      version: "1.0.0",
    },
    host: "localhost:3333",
    basePath: "/api/",
    produces: ["application/json"],
    consumes: ["application/json"],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "",
      },
    },
  },
  basedir: __dirname,
  files: ["/*.ts", "/*.js"]
};
expressSwagger(options);


export { Routes };