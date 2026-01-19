import { ApiResponse } from "../responses/ApiResponse";
import { paginationValidation } from "../validations/paginationValidation";
import { Request, Response } from "express";
import { ListarPacientesUseCase } from "../../useCases/Paciente/ListarPacientesUsecase";
import { VisualizarPacienteUseCase } from "../../useCases/Paciente/VisualizarPacienteUsecase";
import { AlterarPacienteUseCase } from "../../useCases/Paciente/AlterarPacienteUsecase";
import { ExcluirPacienteUseCase } from "../../useCases/Paciente/ExcluirPacienteUsecase";

class PacienteController {
  async index(req: Request, res: Response) {
    try {
      await paginationValidation.validate(req.query);
      const { page = 1, limit = 10, nome = null } = req.query;
      const listarPacientesUseCase = await new ListarPacientesUseCase().execute(
        page as number,
        limit as number,
        nome as string
      );

      return ApiResponse.success(res, listarPacientesUseCase);
    } catch (error: any) {
      return ApiResponse.error(res, error.errors);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;

      const visualizarPacienteUseCase =
        await new VisualizarPacienteUseCase().execute(id);

      return ApiResponse.success(res, visualizarPacienteUseCase);
    } catch (error: any) {
      return ApiResponse.error(res, error.errors);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const data = req.body;

      const alterarPacienteUseCase =
        await new AlterarPacienteUseCase().execute(id, data);

      return ApiResponse.success(res, alterarPacienteUseCase);
    } catch (error: any) {
      return ApiResponse.error(res, error.errors);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;

      const excluirPacienteUseCase =
        await new ExcluirPacienteUseCase().execute(id);

      return ApiResponse.success(res, excluirPacienteUseCase);
    } catch (error: any) {
      return ApiResponse.error(res, error.errors);
    }
  }
}

export default new PacienteController();
