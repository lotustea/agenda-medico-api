import { ApiResponse } from "../responses/ApiResponse";
import { paginationValidation } from "../validations/paginationValidation";
import { Request, Response } from "express";
import { ListarMedicosUseCase } from "../../useCases/Medico/ListarMedicosUsecase";
import { VisualizarMedicoUseCase } from "../../useCases/Medico/VisualizarMedicoUsecase";
import { AlterarMedicoUseCase } from "../../useCases/Medico/AlterarMedicoUsecase";
import { ExcluirMedicoUseCase } from "../../useCases/Medico/ExcluirMedicoUsecase";

class MedicoController {
  async index(req: Request, res: Response) {
    try {
      await paginationValidation.validate(req.query);
      const { page = 1, limit = 10, nome = null } = req.query;
      const listarMedicosUseCase = await new ListarMedicosUseCase().execute(
        page as number,
        limit as number,
        nome as string
      );

      return ApiResponse.success(res, listarMedicosUseCase);
    } catch (error: any) {
      return ApiResponse.error(res, error.errors);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;

      const visualizarMedicoUseCase =
        await new VisualizarMedicoUseCase().execute(id);

      return ApiResponse.success(res, visualizarMedicoUseCase);
    } catch (error: any) {
      return ApiResponse.error(res, error.errors);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const data = req.body;

      const alterarMedicoUseCase =
        await new AlterarMedicoUseCase().execute(id, data);

      return ApiResponse.success(res, alterarMedicoUseCase);
    } catch (error: any) {
      return ApiResponse.error(res, error.errors);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;

      const excluirMedicoUseCase =
        await new ExcluirMedicoUseCase().execute(id);

      return ApiResponse.success(res, excluirMedicoUseCase);
    } catch (error: any) {
      return ApiResponse.error(res, error.errors);
    }
  }
}

export default new MedicoController();
