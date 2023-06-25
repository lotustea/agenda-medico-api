import { Request, Response } from 'express';
import { ApiResponse } from "../responses/ApiResponse";
import { paginationValidation } from "../validations/paginationValidation";
import { ListarAgendamentosUseCase } from "../../useCases/AgendaMedico/ListarAgendamentosUsecase";
import { AgendaMedicoDTO } from "../dto/AgendaMedicoDTO";
import { CadastrarAgendamentoUseCase } from "../../useCases/AgendaMedico/CadastrarAgendamentoUsecase";
import { AlterarAgendamentoUseCase } from "../../useCases/AgendaMedico/AlterarAgendamentoUsecase";
import { alterarAgendamentoValidation } from "../validations/AgendaMedico/alterarAgendamentoValidation";
import { cadastrarAgendamentoValidation } from "../validations/AgendaMedico/cadastrarAgendamentoValidation";
import { ExcluirAgendamentoUseCase } from "../../useCases/AgendaMedico/ExcluirAgendamentoUsecase";
import { Usuario } from "entities/Usuario";

class AgendaMedicoController {
    async index(req: Request, res: Response) {
        try {
            await paginationValidation.validate(req.query);
            const {
                page = 1,
                limit = 10,
                dataAgendamentoMin = null,
                dataAgendamentoMax = null,
            } = req.query;
            const listarAgendaMedicosUseCase =
                await new ListarAgendamentosUseCase().execute(
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

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            await cadastrarAgendamentoValidation.validate(data);

            const dto = new AgendaMedicoDTO(data).toEntity();
            const cadastrarAgendamentoUseCase =
                await new CadastrarAgendamentoUseCase().execute(dto);

            return ApiResponse.success(res, cadastrarAgendamentoUseCase);
        } catch (error: any) {
            return ApiResponse.error(res, error.errors);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const data = req.body;
            const id = req.params.id as unknown as number;
            const usuario = req.user as Usuario;
            await alterarAgendamentoValidation.validate(data);

            const dto = new AgendaMedicoDTO(data).toEntity();
            const alterarAgendamentoUseCase =
                await new AlterarAgendamentoUseCase().execute(id, dto, usuario);

            return ApiResponse.success(res, alterarAgendamentoUseCase);
        } catch (error: any) {
            return ApiResponse.error(res, error.errors);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id as unknown as number;

            const excluirAgendamentoUseCase =
                await new ExcluirAgendamentoUseCase().execute(id);

            return ApiResponse.success(res, excluirAgendamentoUseCase);
        } catch (error: any) {
            return ApiResponse.error(res, error.errors);
        }
    }
}

export default new AgendaMedicoController();
