import yup from './validations'

export const paginationValidation = yup.object().shape({
    page: yup.number(),
    limit: yup.number()
});
