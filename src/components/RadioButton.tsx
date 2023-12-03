import {
  UseFormRegister,
  FieldError,
  FieldValues,
  FieldPath,
} from 'react-hook-form'
import styled from '@emotion/styled'
import { ErrorMessage, Label } from './styles'

export interface RadioButtonOption {
  value: string | number
  label: string
}

interface Props<Form extends FieldValues> {
  name: FieldPath<Form> // ensures the field name is one from the field-type
  label: string
  placeholder?: string | number
  options: RadioButtonOption[] | undefined
  error: FieldError | undefined
  register: UseFormRegister<Form>
}

export const RadioButton = <Form extends FieldValues>({
  name,
  label,
  options,
  register,
  error,
}: Props<Form>): JSX.Element => {
  const Input = styled.input`
    ${error != null && `border-color: #fa6607;`}
  `

  if (options != null) {
    return (
      <Label>
        {label}
        {options.map((item, i) => (
          <label key={i}>
            <Input type="radio" value={item.value} {...register(name)} />
            {item.label}
          </label>
        ))}
        <ErrorMessage>{error?.message}</ErrorMessage>
      </Label>
    )
  }

  return <></>
}
