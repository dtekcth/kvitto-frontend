import * as yup from 'yup'
import { OurForm } from './Form'

// When this schema does not cover all fields in OurForm, the resolver will give an error
export const schema = yup.object<OurForm>().shape({
  name: yup.string().required('Name is a required field'),
  cost: yup
    .number()
    .typeError('Kostnaden måste vara en siffra')
    .required('Cost is a required field')
    .min(100, 'min cost is 100')
    .max(150, 'max cost is 150'),
  phone: yup.string().required("A phonenumber is required."),
  card: yup.string().required("")
})
