import * as yup from 'yup'
import { OurForm } from './Form'

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
    .min(0, 'You cannot have a negative amount')
    .max(99, 'You cannot have more than 99 in ore'),
  phone: yup
    .string()
    .required('A phonenumber is required.')
    .max(16, 'Please enter a valid phone number'),
  card: yup.string().required('You must choose which card you used'),
  budgetpost: yup.number().required('You must choose a budgetpost'),
  purchasedate: yup.date().required(),
  description: yup.string().required('You must have a description'),
  committee: yup.number().required('You must choose a committee'),
  account: yup
    .string()
    .required('You must enter an account number')
    .max(32, 'Please enter a valid account number'),
  clearing: yup
    .string()
    .required('You must enter a clearing number')
    .max(8, 'Please enter a valid clearing number'),
  physical: yup
    .number()
    .required(
      'You need to select if the original form of the receipt is physical.',
    ),
})
