import yup from '../validations';

export const alterarAgendamentoValidation = yup.object().shape({
  pacienteId: yup.number().label('ID paciente'),
  medicoId: yup.number().label('ID medico'),
  dataAgendamento: yup.date().nullable().label('Data do agendamento')
});
