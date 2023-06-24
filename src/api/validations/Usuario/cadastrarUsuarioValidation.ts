import yup from '../validations'

import { validarCPF } from '../PessoaFisica/ValidarCpf';

export const cadastrarUsuarioValidation = yup.object().shape({
    usuario: yup.string().required().label('Usuário'),
    senha: yup.string().required().label('Senha'),
    perfil: yup
      .string()
      .oneOf(['medico', 'secretaria', 'paciente'])
      .required()
      .label('Perfil'),
    cpf: validarCPF().required().label('CPF'),
    dataNascimento: yup.string().required().label('Data de nascimento'),
    nome: yup.string().required().label('Nome'),
    sobrenome: yup.string().required().label('Sobrenome'),
    email: yup.string().required().label('Email'),
    logradouro: yup.string().required().label('Logradouro'),
    numero: yup.string().required().label('Número'),
    cep: yup.string().required().label('CEP'),
    cidade: yup.string().required().label('Cidade'),
    estado: yup.string().required().label('Estado'),
  });