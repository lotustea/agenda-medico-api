import yup from "../validations";

export function calcularDigitoVerificador(cpf: string) {
    let soma = 0;
    let resto;
  
    if (cpf == "00000000000") return false;
  
    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
  
    resto = (soma * 10) % 11;
  
    if ((resto == 10) || (resto == 11)) {
      resto = 0;
    }
  
    if (resto != parseInt(cpf.substring(9, 10))) {
      return false;
    }
  
    soma = 0;
  
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
  
    resto = (soma * 10) % 11;
  
    if ((resto == 10) || (resto == 11)) {
      resto = 0;
    }
  
    if (resto != parseInt(cpf.substring(10, 11))) {
      return false;
    }
  
    return true;
  }
  
  export function cpfValidation(value: string | undefined) {
    const cpf = value ? value.replace(/\D/g, '') : false;
  
    if (cpf && calcularDigitoVerificador(cpf)) {
      return true;
    }
  
    return false;
  }

  export function validarCPF(){
    return yup.string()
      .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/g, 'Formato de CPF inválido')
      .test('validacao-cpf', 'CPF inválido', cpfValidation)
  }