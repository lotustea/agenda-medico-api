import { ApiResponse } from "../responses/ApiResponse";
import { paginationValidation } from "../validations/paginationValidation";
import { Request, Response } from "express";
import { ListarAgendasUseCase} from "../../useCases/AgendaMedico/ListarAgendasUsecase";

class AgendaMedicoController {
  async index(req: Request, res: Response) {
    try {
      await paginationValidation.validate(req.query);
      const { page = 1, limit = 10, dataAgendamentoMin = null, dataAgendamentoMax = null } = req.query;
      const listarAgendaMedicosUseCase = await new ListarAgendasUseCase().execute(
        page as number,
        limit as number,
        dataAgendamentoMin as unknown as Date,
        dataAgendamentoMax as unknown as Date
      );

      return ApiResponse.success(res, listarAgendaMedicosUseCase);
    } catch (error: any) {
      return ApiResponse.error(res, error.errors);
    }
  }
}

export default new AgendaMedicoController();
