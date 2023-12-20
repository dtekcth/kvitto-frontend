import {
  UseFormRegister,
  FieldError,
  FieldValues,
  FieldPath,
} from 'react-hook-form'
import { ErrorMessage, Label } from './styles'
import './TextareaField.scss'

interface Props<Form extends FieldValues> {
  name: FieldPath<Form> // ensures the field name is one from the field-type
  label: string
  placeholder?: string | number
  error: FieldError | undefined
  register: UseFormRegister<Form>
}

export const Textarea = <Form extends FieldValues>({
  name,
  label,
  register,
  error,
}: Props<Form>): JSX.Element => {
  // TODO: extract

  return (
    <div>
      <Label>
        {label}
        <textarea className="input" {...register(name)}></textarea>
        <ErrorMessage>{error?.message}</ErrorMessage>
      </Label>
    </div>
  )
}
