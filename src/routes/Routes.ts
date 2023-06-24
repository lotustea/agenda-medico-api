import * as express from "express";
import { UsuarioRoutes } from "./UsuarioRoutes";

const Routes = express.Router();

Routes.use("/usuario", UsuarioRoutes);


export { Routes };