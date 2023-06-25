import express from "express";
import { UsuarioRoutes } from "./UsuarioRoutes";
import { MedicoRoutes } from "./MedicoRoutes";
import { PacienteRoutes } from "./PacienteRoutes";
import { AgendaMedicoRoutes } from "./AgendaMedico";

const Routes = express.Router();

Routes.use("/usuario", UsuarioRoutes);
Routes.use("/medico", MedicoRoutes);
Routes.use("/paciente", PacienteRoutes);
Routes.use("/agendamento", AgendaMedicoRoutes);

export { Routes };
