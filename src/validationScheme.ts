import * as yup from 'yup'
import { OurForm } from './pages/Form'

// When this schema does not cover all fields in OurForm, the resolver will give an error
export const schema = yup.object<OurForm>().shape({
  name: yup.string().required('Name is a required field'),
  crowns: yup
    .number()
    .typeError('The number of crowns must be a number')
    .required('Crowns is a required field')
    .min(0, 'You cannot have a negative amount'),
  ore: yup
    .number()
    .typeError('The number of ore must be a number')
    .required('Ore is a required field')
    .min(0, 'You cannot have a negative amount'),
  phone: yup.string().required('A phonenumber is required.'),
  card: yup.string().required('You must choose which card you used'),
  budgetpost: yup.number().required('You must choose a budgetpost'),
  purchasedate: yup.date().required(),
  description: yup.string().required('You must have a description'),
  committee: yup.number().required('You must choose a committee'),
  account: yup.string().required('You must enter an account number'),
  clearing: yup.string().required('You must enter a clearing number'),
})
