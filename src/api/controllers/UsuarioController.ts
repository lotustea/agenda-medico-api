import { ListarAgendamentosUsuarioUseCase } from './../../useCases/Usuario/ListarAgendamentosUsuarioUsecase';
import { AlterarUsuarioUseCase } from "./../../useCases/Usuario/AlterarUsuarioUsecase";
import { cadastrarUsuarioValidation } from "../validations/Usuario/cadastrarUsuarioValidation";
import { alterarUsuarioValidation } from "../validations/Usuario/alterarUsuarioValidation";
import { CadastrarUsuarioUseCase } from "../../useCases/Usuario/CadastrarUsuarioUsecase";
import { ApiResponse } from "../responses/ApiResponse";
import { paginationValidation } from "../validations/paginationValidation";
import { Request, Response } from "express";
import { UsuarioDTO } from "../dto/UsuarioDTO";
import { ListarUsuariosUseCase } from "../../useCases/Usuario/ListarUsuariosUsecase";
import { Usuario } from '../../entities/Usuario';
import { ExcluirAgendamentoUsuarioUseCase } from '../../useCases/Usuario/ExcluirAgendamentoUsuarioUsecase';
import { loginUsuarioValidation } from '../validations/Usuario/loginUsuarioValidation';
import { LoginUsuarioUseCase } from '../../useCases/Usuario/LoginUsuarioUsecase';

class UsuarioController {
    async index(req: Request, res: Response) {
        try {
            await paginationValidation.validate(req.query);
            const { page = 1, limit = 10, usuario = null } = req.query;
            const listarUsuariosUseCase = await new ListarUsuariosUseCase().execute(
                page as number,
                limit as number,
                usuario as string
            );

            return ApiResponse.success(res, listarUsuariosUseCase);
        } catch (error: any) {
            return ApiResponse.error(res, error.errors);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            await cadastrarUsuarioValidation.validate(data);

            const dto = new UsuarioDTO(data).toEntity();
            const cadastrarUsuarioUseCase =
                await new CadastrarUsuarioUseCase().execute(dto);

            return ApiResponse.success(res, cadastrarUsuarioUseCase);
        } catch (error: any) {
            return ApiResponse.error(res, error.errors);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const data = req.body;
            const id = req.params.id as unknown as number;
            await alterarUsuarioValidation.validate(data);

            const dto = new UsuarioDTO(data).toEntity();
            const alterarUsuarioUseCase = await new AlterarUsuarioUseCase().execute(
                id,
                dto
            );

            return ApiResponse.success(res, alterarUsuarioUseCase);
        } catch (error: any) {
            return ApiResponse.error(res, error.errors);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const data = req.body;
            await loginUsuarioValidation.validate(data);

            const loginUsuarioUsecase =
                await new LoginUsuarioUseCase().execute(data.usuario, data.senha);

            return ApiResponse.success(res, loginUsuarioUsecase);
        } catch (error: any) {
            return ApiResponse.error(res, error.errors);
        }
    }

    async listarAgendamentos(req: Request, res: Response) {
        try {
            const {
                dataAgendamentoMin = null,
                dataAgendamentoMax = null,
            } = req.query;
            const usuario = req.user as Usuario;
            const listarAgendamentosUsuarioUseCase =
                await new ListarAgendamentosUsuarioUseCase().execute(
                    usuario,
                    dataAgendamentoMin as unknown as Date,
                    dataAgendamentoMax as unknown as Date
                );

            return ApiResponse.success(res, listarAgendamentosUsuarioUseCase);
        } catch (error: any) {
            return ApiResponse.error(res, error.errors);
        }
    }

    async excluirAgendamento(req: Request, res: Response) {
        try {
            const id = req.params.id as unknown as number;
            const usuario = req.user as Usuario;
            const excluirAgendamentoUseCase =
                await new ExcluirAgendamentoUsuarioUseCase().execute(id, usuario);

            return ApiResponse.success(res, excluirAgendamentoUseCase);
        } catch (error: any) {
            return ApiResponse.error(res, error.errors);
        }
    }
}

export default new UsuarioController();
