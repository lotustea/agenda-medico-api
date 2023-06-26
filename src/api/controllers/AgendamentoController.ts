import { Request, Response } from 'express';
import { ApiResponse } from "../responses/ApiResponse";
import { paginationValidation } from "../validations/paginationValidation";
import { ListarAgendamentosUseCase } from "../../useCases/Agendamento/ListarAgendamentosUsecase";
import { AgendamentoDTO } from "../dto/AgendaMedicoDTO";
import { CadastrarAgendamentoUseCase } from "../../useCases/Agendamento/CadastrarAgendamentoUsecase";
import { AlterarAgendamentoUseCase } from "../../useCases/Agendamento/AlterarAgendamentoUsecase";
import { alterarAgendamentoValidation } from "../validations/Agendamento/alterarAgendamentoValidation";
import { cadastrarAgendamentoValidation } from "../validations/Agendamento/cadastrarAgendamentoValidation";
import { ExcluirAgendamentoUseCase } from "../../useCases/Agendamento/ExcluirAgendamentoUsecase";
import { Usuario } from "entities/Usuario";

class AgendamentoController {
    async index(req: Request, res: Response) {
        try {
            await paginationValidation.validate(req.query);
            const {
                page = 1,
                limit = 10,
                dataAgendamentoMin = null,
                dataAgendamentoMax = null,
            } = req.query;
            const listarAgendamentosUseCase = await new ListarAgendamentosUseCase().execute(
                page as number,
                limit as number,
                dataAgendamentoMin ? new Date(dataAgendamentoMin as string) : null,
                dataAgendamentoMax ? new Date(dataAgendamentoMax as string) : null
            );

            return ApiResponse.success(res, listarAgendamentosUseCase);
        } catch (error: any) {
            return ApiResponse.error(res, error.errors);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            await cadastrarAgendamentoValidation.validate(data);

            const dto = new AgendamentoDTO(data).toEntity();
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

            const dto = new AgendamentoDTO(data).toEntity();
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

export default new AgendamentoController();
