import { ApiResponse } from "../responses/ApiResponse";
import { paginationValidation } from "../validations/paginationValidation";
import { Request, Response } from "express";
import { ListarPacientesUseCase } from "../../useCases/Paciente/ListarPacientesUsecase";

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
}

export default new PacienteController();
