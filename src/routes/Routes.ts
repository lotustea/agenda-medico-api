import express from "express";
import { UsuarioRoutes } from "./UsuarioRoutes";
import { MedicoRoutes } from "./MedicoRoutes";
import { PacienteRoutes } from "./PacienteRoutes";
import { AgendamentoRoutes } from "./AgendamentoRoutes";

const Routes = express.Router();

Routes.use("/usuario", UsuarioRoutes);
Routes.use("/medico", MedicoRoutes);
Routes.use("/paciente", PacienteRoutes);
Routes.use("/agendamento", AgendamentoRoutes);

export { Routes };
