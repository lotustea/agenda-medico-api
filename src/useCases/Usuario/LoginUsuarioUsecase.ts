import bcrypt from 'bcryptjs';
import { UsuarioRepository } from '../../repositories/UsuarioRepository';
import { Usuario } from '../../entities/Usuario';
import jwt from 'jsonwebtoken';

export class LoginUsuarioUseCase {
    private usuarioRepository = new UsuarioRepository();

    async execute(usuario: string, senha: string) {
        const usuarioExistente = await this.usuarioRepository.findByUsuario(usuario);

        if (!usuarioExistente) {
            return { error: 'Usuário não encontrado' };
        }

        const senhaValida = await bcrypt.compare(senha, usuarioExistente.senha);

        if (!senhaValida) {
            return { error: 'Senha inválida' };
        }

        const token = this.generateToken(usuarioExistente);

        return { token, ...usuarioExistente };
    }

    private generateToken(usuario: Usuario) {
        const token = jwt.sign({ id: usuario.id }, process.env.APP_SECRET, {
            expiresIn: '1h',
        });
        return token;
    }
}
