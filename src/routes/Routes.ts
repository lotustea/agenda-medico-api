import * as express from "express";
import { UsuarioRoutes } from "./UsuarioRoutes";
import { MedicoRoutes } from "./MedicoRoutes";
import { PacienteRoutes } from "./PacienteRoutes";

const Routes = express.Router();

Routes.use("/usuario", UsuarioRoutes);
Routes.use("/medico", MedicoRoutes);
Routes.use("/paciente", PacienteRoutes);

export { Routes };