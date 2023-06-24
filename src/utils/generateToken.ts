import { randomBytes } from 'crypto';

export const generateToken = (): string => {
    const code = randomBytes(4).toString('hex');
    return code.toUpperCase();
};