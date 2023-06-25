import yup from '../validations';

export const recuperarSenhaValidation = yup.object().shape({
    usuario: yup.string().required().label('Usuário'),
    senha: yup.string().required().label('Senha'),
    token: yup.string().required().label('Token'),
});