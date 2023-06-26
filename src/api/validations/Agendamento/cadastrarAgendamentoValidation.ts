import yup from '../validations';

export const cadastrarAgendamentoValidation = yup.object().shape({
  pacienteId: yup.number().required().label('ID paciente'),
  medicoId: yup.number().required().label('ID medico'),
  dataAgendamento: yup.date().required().label('Data do agendamento')
});
