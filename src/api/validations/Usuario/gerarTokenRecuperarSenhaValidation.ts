import yup from '../validations';

export const gerarTokenRecuperarSenhaValidation = yup.object().shape({
    usuario: yup.string().required().label('Usuário')
});