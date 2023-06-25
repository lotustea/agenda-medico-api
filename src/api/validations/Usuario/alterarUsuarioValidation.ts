import yup from '../validations';

export const alterarUsuarioValidation = yup.object().shape({
  usuario: yup.string().label('Usuário'),
  senha: yup.string().label('Senha'),
  perfil: yup
    .string()
    .oneOf(['medico', 'secretaria', 'paciente'])

    .label('Perfil'),
  dataNascimento: yup.string().label('Data de nascimento'),
  nome: yup.string().label('Nome'),
  sobrenome: yup.string().label('Sobrenome'),
  email: yup.string().label('Email'),
  logradouro: yup.string().label('Logradouro'),
  cep: yup.string().label('CEP'),
  numero: yup.string().label('Número'),
  cidade: yup.string().label('Cidade'),
  estado: yup.string().label('Estado'),
});