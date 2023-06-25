import yup from '../validations';

export const loginUsuarioValidation = yup.object().shape({
    usuario: yup.string().required().label('Usuário'),
    senha: yup.string().required().label('Senha')
});