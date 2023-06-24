import { ApiResponse } from "../responses/ApiResponse";
import { paginationValidation } from "../validations/paginationValidation";
import { Request, Response } from "express";
import { ListarMedicosUseCase } from "../../useCases/Medico/ListarMedicosUsecase";

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
}

export default new MedicoController();
