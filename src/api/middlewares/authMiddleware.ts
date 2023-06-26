import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UsuarioRepository } from '../../repositories/UsuarioRepository';
import { Usuario } from '../../entities/Usuario';

interface TokenPayload {
    id: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: Usuario;
        }
    }
}

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token de acesso não fornecido' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.APP_SECRET) as TokenPayload;
        const usuarioRepository = new UsuarioRepository();
        const usuario = await usuarioRepository.findById(decoded.id);

        if (!usuario) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        req.user = usuario;

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token de acesso inválido' });
    }
}
